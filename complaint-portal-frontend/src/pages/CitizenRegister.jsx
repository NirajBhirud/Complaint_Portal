import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function CitizenRegister() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNo: ''
  })

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await register(form)
      navigate('/citizen')
    } catch (err) {
      setError(
        err.response?.data?.error ||
        t('registerError')
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
          Nagrik Seva · {t('residentAccount')}
        </div>

        <h2>
          {t('createAccount')}
        </h2>

        <p style={{ marginBottom: 22 }}>
          {t('registerDescription')}
        </p>

        <form onSubmit={handleSubmit}>

          <label
            className="field-label"
            htmlFor="fullName"
          >
            {t('fullName')}
          </label>

          <input
            id="fullName"
            name="fullName"
            className="field-input"
            value={form.fullName}
            onChange={onChange}
            required
            autoFocus
          />

          <label
            className="field-label"
            htmlFor="email"
          >
            {t('email')}
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className="field-input"
            value={form.email}
            onChange={onChange}
            required
          />

          <label
            className="field-label"
            htmlFor="phoneNo"
          >
            {t('phoneNumber')}
          </label>

          <input
            id="phoneNo"
            name="phoneNo"
            className="field-input"
            value={form.phoneNo}
            onChange={onChange}
          />

          <label
            className="field-label"
            htmlFor="password"
          >
            {t('password')}
          </label>

          <input
            id="password"
            name="password"
            type="password"
            className="field-input"
            value={form.password}
            onChange={onChange}
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
              ? t('creatingAccount')
              : t('createAccount')}
          </button>

        </form>

        <p className="auth-foot">
          {t('alreadyRegistered')}{' '}
          <Link to="/citizen/login">
            {t('login')}
          </Link>
        </p>

      </div>
    </div>
  )
}