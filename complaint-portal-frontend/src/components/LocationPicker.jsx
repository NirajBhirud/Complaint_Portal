// FULL FILE — replace components/LocationPicker.jsx entirely with this
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  useMapEvents
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

/*
 * Default location: India
 * The map will move to the user's selected/current location
 * as soon as one is available.
 */
const DEFAULT_CENTER = [20.5937, 78.9629]
const DEFAULT_ZOOM = 5
const SELECTED_ZOOM = 17
const SEARCH_ZOOM = 15

// free, no-API-key geocoding via OpenStreetMap's Nominatim service.
// its usage policy asks for reasonable request volume (~1/sec) - the debounce
// below keeps us well within that for a form like this
const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search'
const SEARCH_DEBOUNCE_MS = 600

/*
 * Search box for finding a place by name/address, using OpenStreetMap's
 * free Nominatim geocoder. Debounced so it doesn't fire on every keystroke.
 */
function LocationSearchBox({ onResultSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchError, setSearchError] = useState('')
  const debounceRef = useRef(null)

  const runSearch = async (text) => {
    if (!text || text.trim().length < 3) {
      setResults([])
      setSearching(false)
      return
    }

    setSearching(true)
    setSearchError('')

    try {
      const url = `${NOMINATIM_SEARCH_URL}?format=json&q=${encodeURIComponent(text)}&limit=5&countrycodes=in`
      const res = await fetch(url, {
        headers: { Accept: 'application/json' }
      })

      if (!res.ok) throw new Error('search request failed')

      const data = await res.json()
      setResults(data)
      setShowResults(true)
    } catch (err) {
      console.error('Location search error:', err)
      setSearchError("Couldn't search right now. Try again in a moment.")
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const onChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      runSearch(value)
    }, SEARCH_DEBOUNCE_MS)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (debounceRef.current) clearTimeout(debounceRef.current)
      runSearch(query)
    }
  }

  const handlePick = (result) => {
    setQuery(result.display_name)
    setShowResults(false)
    setResults([])

    onResultSelect({
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon)
    })
  }

  return (
    <div className="location-search">
      <div className="location-search-input-row">
        <span className="location-search-icon">🔍</span>
        <input
          type="text"
          className="location-search-input"
          placeholder="Search for a place, road, or landmark…"
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => results.length > 0 && setShowResults(true)}
        />
        {searching && <span className="location-search-spinner">…</span>}
      </div>

      {showResults && (
        <div className="location-search-results">
          {results.length === 0 && !searching && (
            <div className="location-search-empty">No matching places found.</div>
          )}

          {results.map((r) => (
            <button
              type="button"
              key={r.place_id}
              className="location-search-result"
              onClick={() => handlePick(r)}
            >
              {r.display_name}
            </button>
          ))}
        </div>
      )}

      {searchError && (
        <div className="location-search-empty">{searchError}</div>
      )}
    </div>
  )
}

/*
 * Tracks the Leaflet map's own center point as the user drags/pans it.
 * This is the whole trick behind the "center-fixed pin" pattern: the pin
 * never moves in screen-space, the MAP moves underneath it, and whatever
 * ends up under the pin when movement stops is the selected point.
 */
function CenterTracker({ onDragStart, onLiveMove, onSettle }) {
  useMapEvents({
    movestart() {
      onDragStart()
    },
    move(e) {
      const c = e.target.getCenter()
      onLiveMove(c.lat, c.lng)
    },
    moveend(e) {
      const c = e.target.getCenter()
      onSettle(c.lat, c.lng)
    }
  })

  return null
}

/*
 * Main LocationPicker component.
 *
 * Props:
 *
 * latitude
 * longitude
 *   Previously saved coordinates, if available.
 *
 * onLocationChange
 *   Called whenever the user settles on a location (drag ends, GPS locks,
 *   or a search result is picked).
 *
 * onConfirm
 *   Called when the user confirms the selected location.
 */
export default function LocationPicker({
  latitude = null,
  longitude = null,
  onLocationChange,
  onConfirm
}) {
  const initialLocation = useMemo(() => {
    if (
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined
    ) {
      return {
        latitude: Number(latitude),
        longitude: Number(longitude),
        accuracy: null
      }
    }

    return null
  }, [latitude, longitude])

  const [selectedLocation, setSelectedLocation] = useState(initialLocation)
  const [mapOpen, setMapOpen] = useState(false)
  const [detecting, setDetecting] = useState(false)
  const [message, setMessage] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [liveCenter, setLiveCenter] = useState(initialLocation)
  const [locationConfirmed, setLocationConfirmed] = useState(Boolean(initialLocation))

  const mapRef = useRef(null)
  // true while we're waiting for a programmatic flyTo (GPS/search) to finish
  // and land in moveend - drag commits are always "pending" the moment they start
  const pendingCommitRef = useRef(false)
  // carries GPS accuracy across the flyTo -> moveend gap; null for anything
  // that isn't a fresh GPS fix (manual drag, search pick)
  const pendingAccuracyRef = useRef(null)
  const [pendingFlyTarget, setPendingFlyTarget] = useState(null)

  /*
   * If the parent hands us a previously saved location, keep the
   * picker synchronized with it.
   */
  useEffect(() => {
    if (
      latitude !== null && latitude !== undefined &&
      longitude !== null && longitude !== undefined
    ) {
      const loc = { latitude: Number(latitude), longitude: Number(longitude), accuracy: null }
      setSelectedLocation(loc)
      setLiveCenter(loc)
      setLocationConfirmed(true)
    }
  }, [latitude, longitude])

  // fires a flyTo once the map is actually mounted, even if mapOpen and the
  // fly request land in the same render (map opening for the first time)
  useEffect(() => {
    if (pendingFlyTarget && mapRef.current) {
      mapRef.current.flyTo(
        [pendingFlyTarget.lat, pendingFlyTarget.lng],
        pendingFlyTarget.zoom,
        { duration: 1 }
      )
      setPendingFlyTarget(null)
    }
  }, [pendingFlyTarget, mapOpen])

  const commitLocation = (lat, lng) => {
    const loc = { latitude: lat, longitude: lng, accuracy: pendingAccuracyRef.current }
    pendingAccuracyRef.current = null

    setSelectedLocation(loc)
    setLiveCenter(loc)
    setLocationConfirmed(false)
    setMessage('')

    if (onLocationChange) onLocationChange(loc)
  }

  const handleDragStart = () => {
    setIsDragging(true)
    pendingCommitRef.current = true
    pendingAccuracyRef.current = null // a fresh manual drag always clears any GPS accuracy tag
  }

  const handleLiveMove = (lat, lng) => {
    setLiveCenter({ latitude: lat, longitude: lng, accuracy: null })
  }

  const handleSettle = (lat, lng) => {
    setIsDragging(false)
    if (!pendingCommitRef.current) return // ignore the map's own initial mount settle
    pendingCommitRef.current = false
    commitLocation(lat, lng)
  }

  // flies the map to a target; the actual commit happens later, in
  // handleSettle, once the flyTo animation's moveend fires
  const flyAndCommit = (lat, lng, zoom) => {
    pendingCommitRef.current = true
    setMapOpen(true)
    setPendingFlyTarget({ lat, lng, zoom })
  }

  const handleSearchResultSelect = (loc) => {
    pendingAccuracyRef.current = null
    flyAndCommit(loc.latitude, loc.longitude, SEARCH_ZOOM)
  }

  const handleUseMyLocation = () => {
    setMessage('')

    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by this browser.')
      return
    }

    setDetecting(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDetecting(false)
        pendingAccuracyRef.current = position.coords.accuracy
        flyAndCommit(position.coords.latitude, position.coords.longitude, SELECTED_ZOOM)
        setMessage('Your current location was detected. Drag the map to fine-tune the pin, then confirm.')
      },
      (error) => {
        setDetecting(false)

        let errorMessage = 'Unable to access your location. Please allow location permission and try again.'
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location permission was denied. Please allow location access in your browser settings and try again.'
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Your current location is unavailable. Please try again or pick the location on the map.'
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Location detection timed out. Please try again or pick the location on the map.'
        }
        setMessage(errorMessage)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )
  }

  const handlePickOnMap = () => {
    setMapOpen(true)
    setMessage('')
  }

  const handleClearLocation = () => {
    setSelectedLocation(null)
    setLiveCenter(null)
    setLocationConfirmed(false)
    setMessage('')
    if (onLocationChange) onLocationChange({ latitude: null, longitude: null, accuracy: null })
  }

  const handleConfirmLocation = () => {
    if (!selectedLocation) {
      setMessage('Drag the map so the pin sits on the right spot first.')
      return
    }
    setLocationConfirmed(true)
    setMessage('Location confirmed successfully.')
    if (onConfirm) onConfirm(selectedLocation)
    if (onLocationChange) onLocationChange(selectedLocation)
  }

  const mapCenter = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : DEFAULT_CENTER

  return (
    <div className="location-picker">
      {/* Location options */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
        <button type="button" className="btn btn-primary" onClick={handleUseMyLocation} disabled={detecting}>
          {detecting ? '📍 Detecting location...' : '📍 Use My Current Location'}
        </button>

        <button type="button" className="btn btn-secondary" onClick={handlePickOnMap}>
          🗺️ Pick Location on Map
        </button>

        {selectedLocation && (
          <button type="button" className="btn btn-secondary" onClick={handleClearLocation}>
            ✕ Clear Location
          </button>
        )}
      </div>

      {/* Help text */}
      <div style={{ padding: '12px 14px', marginBottom: '14px', borderRadius: '10px', background: '#f5f7fa', fontSize: '14px', lineHeight: '1.5' }}>
        <strong>📍 Exact location</strong>
        <br />
        Search for a place, use your current GPS location, or just drag the map below — the
        pin stays fixed in the center and whatever's under it when you let go is the spot
        that gets saved. Handy when you're reporting an issue somewhere you aren't right now.
      </div>

      {/* Map */}
      {mapOpen && (
        <div style={{ marginBottom: '16px' }}>
          <LocationSearchBox onResultSelect={handleSearchResultSelect} />

          <div style={{ margin: '10px 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
            {isDragging ? 'Release to drop the pin here…' : 'Drag the map to position the pin exactly where the issue is.'}
          </div>

          <div className="map-pin-frame">
            <MapContainer
              ref={mapRef}
              center={mapCenter}
              zoom={selectedLocation ? SELECTED_ZOOM : DEFAULT_ZOOM}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <CenterTracker
                onDragStart={handleDragStart}
                onLiveMove={handleLiveMove}
                onSettle={handleSettle}
              />
            </MapContainer>

            {/* the pin itself never moves on screen - only the map underneath it does */}
            <div className={'map-pin-overlay' + (isDragging ? ' dragging' : '')}>
              📍
              <div className="map-pin-shadow-dot" />
            </div>

            {liveCenter && (
              <div className="map-pin-coords-badge">
                {liveCenter.latitude.toFixed(5)}, {liveCenter.longitude.toFixed(5)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected location information */}
      {selectedLocation && (
        <div style={{ padding: '14px', marginBottom: '14px', borderRadius: '10px', border: '1px solid #d9dee7', background: locationConfirmed ? '#f0fdf4' : '#f8fafc' }}>
          <div style={{ fontWeight: '700', marginBottom: '8px' }}>
            {locationConfirmed ? '✅ Location Confirmed' : '📍 Location Selected'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '14px' }}>
            <div><strong>Latitude:</strong> {selectedLocation.latitude.toFixed(6)}</div>
            <div><strong>Longitude:</strong> {selectedLocation.longitude.toFixed(6)}</div>
            {selectedLocation.accuracy !== null && selectedLocation.accuracy !== undefined && (
              <div><strong>Accuracy:</strong> {Math.round(selectedLocation.accuracy)} meters</div>
            )}
          </div>
        </div>
      )}

      {/* Status message */}
      {message && (
        <div style={{ padding: '10px 12px', marginBottom: '14px', borderRadius: '8px', background: '#f8fafc', fontSize: '14px', lineHeight: '1.5' }}>
          {message}
        </div>
      )}

      {/* Confirm button */}
      {selectedLocation && !locationConfirmed && (
        <button type="button" className="btn btn-primary" onClick={handleConfirmLocation}>
          ✅ Confirm Location
        </button>
      )}
    </div>
  )
}