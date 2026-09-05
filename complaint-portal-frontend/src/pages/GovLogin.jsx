import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function GovLogin() {
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

      if (user.role === 'DEPT_OFFICER') {
        navigate('/officer')
      } else if (user.role === 'COMMISSIONER') {
        navigate('/commissioner')
      } else {
        setError(t('governmentLoginOnly'))
      }
    } catch (err) {
      setError(
        err.response?.data?.error || t('loginError')
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-screen auth-screen-gov">
      <div className="auth-card">

        <Link to="/" className="auth-back">
          ← {t('back')}
        </Link>

        <div className="auth-seal">
          GOV
        </div>

        <div className="auth-brand">
          Nagrik Seva · {t('governmentPortal')}
        </div>

        <h2>
          {t('staffSignIn')}
        </h2>

        <p style={{ marginBottom: 22 }}>
          {t('staffSignInDescription')}
        </p>

        <form onSubmit={handleSubmit}>

          <label
            className="field-label"
            htmlFor="email"
          >
            {t('officialEmail')}
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
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting
              ? t('signingIn')
              : t('signIn')}
          </button>

        </form>

        <p className="auth-foot">
          {t('noGovernmentAccount')}
        </p>

      </div>
    </div>
  )
}