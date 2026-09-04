import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const CATEGORIES = [
  ['ROADS', 'Roads'],
  ['WATER_SUPPLY', 'Water supply'],
  ['ELECTRICITY', 'Electricity'],
  ['SANITATION_GARBAGE', 'Sanitation & garbage'],
  ['STREET_LIGHTING', 'Street lighting'],
  ['DRAINAGE_SEWAGE', 'Drainage & sewage'],
  ['PUBLIC_HEALTH', 'Public health'],
  ['PARKS_ENVIRONMENT', 'Parks & environment'],
  ['ILLEGAL_CONSTRUCTION', 'Illegal construction'],
  ['OTHER', 'Other']
]

export default function RaiseComplaint() {
  const [form, setForm] = useState({ title: '', description: '', location: '', category: 'ROADS' })
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('data', new Blob([JSON.stringify(form)], { type: 'application/json' }))
      if (image) fd.append('image', image)

      await api.post('/complaints', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate('/citizen')
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't submit your complaint. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1>Raise a complaint</h1>
          <p>It gets routed straight to the right department based on the category you pick.</p>
        </div>
      </div>

      <div className="panel">
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="title">What's the issue, in a few words</label>
          <input id="title" name="title" className="field-input" value={form.title} onChange={onChange}
            placeholder="e.g. Large pothole on main road" required />

          <label className="field-label" htmlFor="category">Department</label>
          <select id="category" name="category" className="field-select" value={form.category} onChange={onChange}>
            {CATEGORIES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>

          <label className="field-label" htmlFor="location">Location</label>
          <input id="location" name="location" className="field-input" value={form.location} onChange={onChange}
            placeholder="e.g. Near Shivaji Chowk, Ward 5" />

          <label className="field-label" htmlFor="description">Describe what's happening</label>
          <textarea id="description" name="description" className="field-textarea" rows={4}
            value={form.description} onChange={onChange} required
            placeholder="The more detail you give, the faster the department can act on it." />

          <label className="field-label" htmlFor="image">Photo of the issue</label>
          <input id="image" type="file" accept="image/*" className="field-file"
            onChange={(e) => setImage(e.target.files[0])} />

          {error && <p className="field-error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit complaint'}
          </button>
        </form>
      </div>
    </div>
  )
}
