import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CitizenRegister() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phoneNo: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(form)
      navigate('/citizen')
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create your account. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <Link to="/" className="auth-back">← Back</Link>
        <div className="auth-brand">Nagrik Seva · Resident account</div>
        <h2>Create your account</h2>
        <p style={{ marginBottom: 22 }}>Set up citizen access to report civic issues.</p>
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="fullName">Full name</label>
          <input id="fullName" name="fullName" className="field-input" value={form.fullName} onChange={onChange} required autoFocus />

          <label className="field-label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="field-input" value={form.email} onChange={onChange} required />

          <label className="field-label" htmlFor="phoneNo">Phone number</label>
          <input id="phoneNo" name="phoneNo" className="field-input" value={form.phoneNo} onChange={onChange} />

          <label className="field-label" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="field-input" value={form.password} onChange={onChange} required />

          {error && <p className="field-error">{error}</p>}

          <button type="submit" className="btn btn-marigold btn-block" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="auth-foot">Already registered? <Link to="/citizen/login">Log in</Link></p>
      </div>
    </div>
  )
}
