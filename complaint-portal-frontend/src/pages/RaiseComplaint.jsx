import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../api/axios'

const CATEGORIES = [
  ['ROADS', 'roads'],
  ['WATER_SUPPLY', 'waterSupply'],
  ['ELECTRICITY', 'electricity'],
  ['SANITATION_GARBAGE', 'sanitationGarbage'],
  ['STREET_LIGHTING', 'streetLighting'],
  ['DRAINAGE_SEWAGE', 'drainageSewage'],
  ['PUBLIC_HEALTH', 'publicHealth'],
  ['PARKS_ENVIRONMENT', 'parksEnvironment'],
  ['ILLEGAL_CONSTRUCTION', 'illegalConstruction'],
  ['OTHER', 'other']
]

export default function RaiseComplaint() {

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'ROADS',
    latitude: null,
    longitude: null
  })

  const [image, setImage] = useState(null)

  const [error, setError] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const [locating, setLocating] = useState(false)

  const [locationMsg, setLocationMsg] = useState('')

  const navigate = useNavigate()

  const { t } = useTranslation()

  const onChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // =========================================================
  // GET EXACT CURRENT LOCATION
  // =========================================================

  const handleUseMyLocation = () => {

    if (!navigator.geolocation) {

      setLocationMsg(
        t('locationUnavailable')
      )

      return
    }

    setLocating(true)

    setLocationMsg(
      t('detectingLocation')
    )

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const {
          latitude,
          longitude,
          accuracy
        } = position.coords

        setForm((previous) => ({
          ...previous,
          latitude,
          longitude
        }))

        setLocationMsg(
          `${t('locationCaptured')} ${t('locationAccuracy')}: ${Math.round(accuracy)} m`
        )

        setLocating(false)
      },

      (error) => {

        console.error(
          'Location error:',
          error
        )

        setLocationMsg(
          t('locationUnavailable')
        )

        setLocating(false)
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    )
  }

  // =========================================================
  // CLEAR LOCATION
  // =========================================================

  const handleClearLocation = () => {

    setForm((previous) => ({
      ...previous,
      latitude: null,
      longitude: null
    }))

    setLocationMsg('')
  }

  // =========================================================
  // GOOGLE MAPS URL
  // =========================================================

  const getMapUrl = () => {

    if (
      form.latitude === null ||
      form.longitude === null
    ) {
      return '#'
    }

    return `https://www.google.com/maps?q=${form.latitude},${form.longitude}`
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    setSubmitting(true)

    try {

      const fd = new FormData()

      fd.append(
        'data',
        new Blob(
          [JSON.stringify(form)],
          {
            type: 'application/json'
          }
        )
      )

      if (image) {
        fd.append(
          'image',
          image
        )
      }

      await api.post(
        '/complaints',
        fd,
        {
          headers: {
            'Content-Type':
              'multipart/form-data'
          }
        }
      )

      navigate('/citizen')

    } catch (err) {

      console.error(
        'Complaint submission error:',
        err
      )

      setError(
        err.response?.data?.error ||
        t('submitComplaintError')
      )

    } finally {

      setSubmitting(false)
    }
  }

  return (
    <div className="page-shell">

      <div className="page-header">

        <div>

          <h1>
            {t('raiseComplaint')}
          </h1>

          <p>
            {t('raiseComplaintDescription')}
          </p>

        </div>

      </div>

      <div className="panel">

        <form onSubmit={handleSubmit}>

          {/* ISSUE TITLE */}

          <label
            className="field-label"
            htmlFor="title"
          >
            {t('issueInFewWords')}
          </label>

          <input
            id="title"
            name="title"
            className="field-input"
            value={form.title}
            onChange={onChange}
            placeholder={t('issueTitlePlaceholder')}
            required
          />

          {/* DEPARTMENT */}

          <label
            className="field-label"
            htmlFor="category"
          >
            {t('department')}
          </label>

          <select
            id="category"
            name="category"
            className="field-select"
            value={form.category}
            onChange={onChange}
          >

            {CATEGORIES.map(
              ([value, labelKey]) => (

                <option
                  key={value}
                  value={value}
                >
                  {t(labelKey)}
                </option>

              )
            )}

          </select>

          {/* WRITTEN LOCATION */}

          <label
            className="field-label"
            htmlFor="location"
          >
            {t('location')}
          </label>

          <input
            id="location"
            name="location"
            className="field-input"
            value={form.location}
            onChange={onChange}
            placeholder={t('locationPlaceholder')}
          />

          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--ink-faint)',
              marginTop: '-10px'
            }}
          >
            {t('locationHelp')}
          </p>

          {/* GPS LOCATION */}

          <div
            className="location-box"
          >

            <div>

              <strong>
                {t('exactLocation')}
              </strong>

              <p>
                {t('exactLocationDescription')}
              </p>

            </div>

            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap'
              }}
            >

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleUseMyLocation}
                disabled={locating}
              >

                {locating
                  ? t('detectingLocation')
                  : t('useMyLocation')
                }

              </button>

              {form.latitude !== null &&
                form.longitude !== null && (

                  <button
                    type="button"
                    className="btn btn-danger-ghost btn-sm"
                    onClick={handleClearLocation}
                  >
                    {t('clearLocation')}
                  </button>

                )}

            </div>

            {locationMsg && (

              <div
                className={
                  form.latitude !== null
                    ? 'location-success'
                    : 'location-message'
                }
              >
                {locationMsg}
              </div>

            )}

            {form.latitude !== null &&
              form.longitude !== null && (

                <div className="location-details">

                  <div>
                    <strong>
                      {t('latitude')}:
                    </strong>{' '}
                    {form.latitude.toFixed(6)}
                  </div>

                  <div>
                    <strong>
                      {t('longitude')}:
                    </strong>{' '}
                    {form.longitude.toFixed(6)}
                  </div>

                  <a
                    href={getMapUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="map-link"
                  >
                    {t('previewLocationOnMap')}
                  </a>

                </div>

              )}

          </div>

          {/* DESCRIPTION */}

          <label
            className="field-label"
            htmlFor="description"
          >
            {t('describeIssue')}
          </label>

          <textarea
            id="description"
            name="description"
            className="field-textarea"
            rows={5}
            value={form.description}
            onChange={onChange}
            required
            placeholder={t('descriptionPlaceholder')}
          />

          {/* IMAGE */}

          <label
            className="field-label"
            htmlFor="image"
          >
            {t('photoOfIssue')}
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            className="field-file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />

          {error && (
            <p className="field-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting
              ? t('submitting')
              : t('submitComplaint')
            }
          </button>

        </form>

      </div>

    </div>
  )
}