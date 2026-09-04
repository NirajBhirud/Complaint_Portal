import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function GovLogin() {
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
      if (user.role === 'DEPT_OFFICER') navigate('/officer')
      else if (user.role === 'COMMISSIONER') navigate('/commissioner')
      else {
        setError('This login is for government staff accounts. Use the resident login instead.')
      }
    } catch (err) {
      setError(err.response?.data?.error || "That email and password don't match our records.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-screen auth-screen-gov">
      <div className="auth-card">
        <Link to="/" className="auth-back">← Back</Link>
        <div className="auth-seal">GOV</div>
        <div className="auth-brand">Nagrik Seva · Government Portal</div>
        <h2>Staff sign in</h2>
        <p style={{ marginBottom: 22 }}>For department officers and commissioner accounts.</p>
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="email">Official email</label>
          <input id="email" className="field-input" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required autoFocus />

          <label className="field-label" htmlFor="password">Password</label>
          <input id="password" className="field-input" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />

          {error && <p className="field-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-foot">Don't have an account? Contact your commissioner's office — staff accounts aren't self-registered.</p>
      </div>
    </div>
  )
}
