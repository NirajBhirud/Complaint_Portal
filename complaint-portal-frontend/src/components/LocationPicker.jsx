import React, { useEffect, useMemo, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/*
 * Default location: India
 * The map will move to the user's selected/current location
 * as soon as one is available.
 */
const DEFAULT_CENTER = [20.5937, 78.9629]
const DEFAULT_ZOOM = 5
const SELECTED_ZOOM = 17

/*
 * Custom marker icon.
 *
 * Using a DivIcon avoids Leaflet's default marker-image problem
 * that can sometimes happen with Vite builds.
 */
const locationIcon = L.divIcon({
  className: '',
  html: `
    <div
      style="
        font-size: 34px;
        line-height: 34px;
        width: 34px;
        height: 34px;
        text-align: center;
        transform: translate(-2px, -2px);
        filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));
      "
    >
      📍
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 32],
  popupAnchor: [0, -32]
})

/*
 * Handles clicks on the map.
 */
function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng

      onSelect({
        latitude: lat,
        longitude: lng,
        accuracy: null
      })
    }
  })

  return null
}

/*
 * Moves the map whenever the selected location changes.
 */
function MapController({ location }) {
  const map = useMap()

  useEffect(() => {
    if (!location) {
      return
    }

    map.flyTo(
      [location.latitude, location.longitude],
      SELECTED_ZOOM,
      {
        duration: 1
      }
    )
  }, [location, map])

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
 *   Called whenever the user selects/moves a location.
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

  const [selectedLocation, setSelectedLocation] =
    useState(initialLocation)

  const [mapOpen, setMapOpen] = useState(false)

  const [detecting, setDetecting] = useState(false)

  const [message, setMessage] = useState('')

  const [locationConfirmed, setLocationConfirmed] =
    useState(Boolean(initialLocation))

  /*
   * If the parent receives a previously saved location,
   * keep the picker synchronized with it.
   */
  useEffect(() => {
    if (
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined
    ) {
      const updatedLocation = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        accuracy: null
      }

      setSelectedLocation(updatedLocation)
      setLocationConfirmed(true)
    }
  }, [latitude, longitude])

  /*
   * Select a location from:
   * - map click
   * - current GPS location
   * - marker drag
   */
  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setLocationConfirmed(false)
    setMessage('')

    if (onLocationChange) {
      onLocationChange(location)
    }
  }

  /*
   * Get the user's current location using
   * the browser's Geolocation API.
   */
  const handleUseMyLocation = () => {
    setMessage('')

    if (!navigator.geolocation) {
      setMessage(
        'Geolocation is not supported by this browser.'
      )
      return
    }

    setDetecting(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }

        setSelectedLocation(location)
        setLocationConfirmed(false)
        setDetecting(false)
        setMapOpen(true)

        setMessage(
          'Your current location was detected. Please confirm it before submitting.'
        )

        if (onLocationChange) {
          onLocationChange(location)
        }
      },
      (error) => {
        setDetecting(false)

        let errorMessage =
          'Unable to access your location. Please allow location permission and try again.'

        if (error.code === error.PERMISSION_DENIED) {
          errorMessage =
            'Location permission was denied. Please allow location access in your browser settings and try again.'
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage =
            'Your current location is unavailable. Please try again or pick the location on the map.'
        } else if (error.code === error.TIMEOUT) {
          errorMessage =
            'Location detection timed out. Please try again or pick the location on the map.'
        }

        setMessage(errorMessage)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    )
  }

  /*
   * Open the interactive map.
   */
  const handlePickOnMap = () => {
    setMapOpen(true)
    setMessage('')
  }

  /*
   * Clear selected coordinates.
   */
  const handleClearLocation = () => {
    setSelectedLocation(null)
    setLocationConfirmed(false)
    setMessage('')

    if (onLocationChange) {
      onLocationChange({
        latitude: null,
        longitude: null,
        accuracy: null
      })
    }
  }

  /*
   * Confirm the selected location.
   */
  const handleConfirmLocation = () => {
    if (!selectedLocation) {
      setMessage(
        'Please select a location on the map or use your current location first.'
      )
      return
    }

    setLocationConfirmed(true)

    setMessage(
      'Location confirmed successfully.'
    )

    if (onConfirm) {
      onConfirm(selectedLocation)
    }

    if (onLocationChange) {
      onLocationChange(selectedLocation)
    }
  }

  const mapCenter = selectedLocation
    ? [
        selectedLocation.latitude,
        selectedLocation.longitude
      ]
    : DEFAULT_CENTER

  return (
    <div className="location-picker">
      {/* Location options */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '14px'
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUseMyLocation}
          disabled={detecting}
        >
          {detecting
            ? '📍 Detecting location...'
            : '📍 Use My Current Location'}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handlePickOnMap}
        >
          🗺️ Pick Location on Map
        </button>

        {selectedLocation && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClearLocation}
          >
            ✕ Clear Location
          </button>
        )}
      </div>

      {/* Help text */}
      <div
        style={{
          padding: '12px 14px',
          marginBottom: '14px',
          borderRadius: '10px',
          background: '#f5f7fa',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
      >
        <strong>📍 Exact location</strong>
        <br />
        You can use your current GPS location or pick the
        exact point on the map. You can also drag the pin to
        adjust the location.
      </div>

      {/* Map */}
      {mapOpen && (
        <div
          style={{
            marginBottom: '16px'
          }}
        >
          <div
            style={{
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Click anywhere on the map to place the complaint
            location.
          </div>

          <div
            style={{
              height: '360px',
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #d9dee7'
            }}
          >
            <MapContainer
              center={mapCenter}
              zoom={
                selectedLocation
                  ? SELECTED_ZOOM
                  : DEFAULT_ZOOM
              }
              scrollWheelZoom={true}
              style={{
                height: '100%',
                width: '100%'
              }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapClickHandler
                onSelect={handleLocationSelect}
              />

              <MapController
                location={selectedLocation}
              />

              {selectedLocation && (
                <Marker
                  position={[
                    selectedLocation.latitude,
                    selectedLocation.longitude
                  ]}
                  icon={locationIcon}
                  draggable={true}
                  eventHandlers={{
                    dragend: (event) => {
                      const marker =
                        event.target

                      const position =
                        marker.getLatLng()

                      handleLocationSelect({
                        latitude: position.lat,
                        longitude: position.lng,
                        accuracy:
                          selectedLocation.accuracy
                      })
                    }
                  }}
                >
                  <Popup>
                    <strong>
                      Complaint Location
                    </strong>
                    <br />
                    Drag this pin to adjust the exact
                    location.
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      )}

      {/* Selected location information */}
      {selectedLocation && (
        <div
          style={{
            padding: '14px',
            marginBottom: '14px',
            borderRadius: '10px',
            border: '1px solid #d9dee7',
            background: locationConfirmed
              ? '#f0fdf4'
              : '#f8fafc'
          }}
        >
          <div
            style={{
              fontWeight: '700',
              marginBottom: '8px'
            }}
          >
            {locationConfirmed
              ? '✅ Location Confirmed'
              : '📍 Location Selected'}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <div>
              <strong>Latitude:</strong>{' '}
              {selectedLocation.latitude.toFixed(6)}
            </div>

            <div>
              <strong>Longitude:</strong>{' '}
              {selectedLocation.longitude.toFixed(6)}
            </div>

            {selectedLocation.accuracy !== null &&
              selectedLocation.accuracy !== undefined && (
                <div>
                  <strong>Accuracy:</strong>{' '}
                  {Math.round(
                    selectedLocation.accuracy
                  )}
                  {' '}meters
                </div>
              )}
          </div>
        </div>
      )}

      {/* Status message */}
      {message && (
        <div
          style={{
            padding: '10px 12px',
            marginBottom: '14px',
            borderRadius: '8px',
            background: '#f8fafc',
            fontSize: '14px',
            lineHeight: '1.5'
          }}
        >
          {message}
        </div>
      )}

      {/* Confirm button */}
      {selectedLocation && !locationConfirmed && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleConfirmLocation}
        >
          ✅ Confirm Location
        </button>
      )}
    </div>
  )
}