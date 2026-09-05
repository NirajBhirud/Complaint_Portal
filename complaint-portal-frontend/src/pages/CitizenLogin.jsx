import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function CitizenLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const user = await login(email, password)

      if (user.role !== 'CITIZEN') {
        setError(t('residentLoginOnly'))
        return
      }

      navigate('/citizen')
    } catch (err) {
      setError(
        err.response?.data?.error || t('loginError')
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">

        <Link to="/" className="auth-back">
          ← {t('back')}
        </Link>

        <div className="auth-brand">
          Nagrik Seva · {t('residentLogin')}
        </div>

        <h2>
          {t('login')}
        </h2>

        <p style={{ marginBottom: 22 }}>
          {t('loginDescription')}
        </p>

        <form onSubmit={handleSubmit}>

          <label
            className="field-label"
            htmlFor="email"
          >
            {t('email')}
          </label>

          <input
            id="email"
            className="field-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <label
            className="field-label"
            htmlFor="password"
          >
            {t('password')}
          </label>

          <input
            id="password"
            className="field-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="field-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-marigold btn-block"
            disabled={submitting}
          >
            {submitting
              ? t('loggingIn')
              : t('login')}
          </button>

        </form>

        <p className="auth-foot">
          {t('newHere')}{' '}
          <Link to="/citizen/register">
            {t('createAccount')}
          </Link>
        </p>

      </div>
    </div>
  )
}