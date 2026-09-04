import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CitizenLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const user = await login(email, password)
      if (user.role !== 'CITIZEN') {
        setError('This is the resident login. Use the government login page for staff accounts.')
        return
      }
      navigate('/citizen')
    } catch (err) {
      setError(err.response?.data?.error || "That email and password don't match our records.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <Link to="/" className="auth-back">← Back</Link>
        <div className="auth-brand">Nagrik Seva · Resident login</div>
        <h2>Log in</h2>
        <p style={{ marginBottom: 22 }}>Track your complaints and raise new ones.</p>
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="email">Email</label>
          <input id="email" className="field-input" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required autoFocus />

          <label className="field-label" htmlFor="password">Password</label>
          <input id="password" className="field-input" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />

          {error && <p className="field-error">{error}</p>}

          <button type="submit" className="btn btn-marigold btn-block" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="auth-foot">New here? <Link to="/citizen/register">Create an account</Link></p>
      </div>
    </div>
  )
}
