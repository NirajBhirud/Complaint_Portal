// FULL FILE — replace pages/RaiseComplaint.jsx entirely with this
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../api/axios'
import LocationPicker from '../components/LocationPicker'

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

  const navigate = useNavigate()

  const { t } = useTranslation()

  const onChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // =========================================================
  // LOCATION PICKER CALLBACK
  // handles GPS, map click/drag, and search-box selections -
  // all three funnel through LocationPicker's onLocationChange
  // =========================================================

  const handleLocationChange = (loc) => {
    setForm((previous) => ({
      ...previous,
      latitude: loc.latitude,
      longitude: loc.longitude
    }))
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

          {/* EXACT LOCATION - GPS, map pick/search, or drag-to-adjust */}

          <LocationPicker
            latitude={form.latitude}
            longitude={form.longitude}
            onLocationChange={handleLocationChange}
          />

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