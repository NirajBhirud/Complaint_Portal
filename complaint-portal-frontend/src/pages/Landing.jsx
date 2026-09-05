import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LanguageSelector from '../components/LanguageSelector'
import { useTranslation } from 'react-i18next'

const DEPT_CHIPS = [
  { key: 'roads' },
  { key: 'waterSupply' },
  { key: 'electricity' },
  { key: 'sanitationGarbage' },
  { key: 'streetLighting' },
  { key: 'drainageSewage' },
  { key: 'publicHealth' },
  { key: 'parksEnvironment' }
]

const STEPS = [
  {
    n: '01',
    titleKey: 'reportTheIssue',
    textKey: 'reportIssueDescription'
  },
  {
    n: '02',
    titleKey: 'trackItOpenly',
    textKey: 'trackItOpenlyDescription'
  },
  {
    n: '03',
    titleKey: 'confirmItYourself',
    textKey: 'confirmItYourselfDescription'
  }
]

export default function Landing() {
  const { user } = useAuth()
  const { t } = useTranslation()

  if (user) {
    if (user.role === 'CITIZEN') {
      return <Navigate to="/citizen" replace />
    }

    if (user.role === 'DEPT_OFFICER') {
      return <Navigate to="/officer" replace />
    }

    if (user.role === 'COMMISSIONER') {
      return <Navigate to="/commissioner" replace />
    }
  }

  return (
    <div className="site">

      {/* Header */}
      <header className="site-header">

        <div className="site-header-brand">
          Nagrik Seva
        </div>

        <nav className="site-header-actions">

          <LanguageSelector />

          <Link
            to="/gov/login"
            className="site-header-link"
          >
            {t('governmentLogin')}
          </Link>

          <Link to="/citizen/login">
            <button className="btn btn-ghost btn-sm">
              {t('login')}
            </button>
          </Link>

          <Link to="/citizen/register">
            <button className="btn btn-marigold btn-sm">
              {t('reportIssue')}
            </button>
          </Link>

        </nav>
      </header>


      {/* Hero Section */}
      <section className="hero">

        <h1 className="hero-title">
          {t('heroTitle')}
        </h1>

        <p className="hero-sub">
          {t('heroDescription')}
        </p>

        <div className="hero-actions">

          <Link to="/citizen/register">
            <button className="btn btn-marigold">
              {t('reportIssue')}
            </button>
          </Link>

          <Link to="/citizen/login">
            <button className="btn btn-ghost">
              {t('trackExistingComplaint')}
            </button>
          </Link>

        </div>

      </section>


      {/* How It Works */}
      <section className="section">

        <h2 className="section-title">
          {t('howItWorks')}
        </h2>

        <div className="how-steps">

          {STEPS.map((s) => (
            <div
              key={s.n}
              className="how-step"
            >

              <div className="how-step-num">
                {s.n}
              </div>

              <h3>
                {t(s.titleKey)}
              </h3>

              <p>
                {t(s.textKey)}
              </p>

            </div>
          ))}

        </div>

      </section>


      {/* Departments */}
      <section className="section section-muted">

        <h2 className="section-title">
          {t('everyDepartmentOnePortal')}
        </h2>

        <p className="section-sub">
          {t('complaintsAutomaticallyRouted')}
        </p>

        <div className="dept-chips">

          {DEPT_CHIPS.map((d) => (
            <span
              key={d.key}
              className="dept-chip"
            >
              {t(d.key)}
            </span>
          ))}

        </div>

      </section>


      {/* Government Callout */}
      <section className="gov-callout">

        <div>

          <h2>
            {t('workForDepartment')}
          </h2>

          <p>
            {t('governmentPortalDescription')}
          </p>

        </div>

        <Link to="/gov/login">
          <button className="btn btn-primary">
            {t('governmentLogin')}
          </button>
        </Link>

      </section>


      {/* Footer */}
      <footer className="site-footer">

        <span>
          Nagrik Seva — {t('publicGrievancePortal')}
        </span>

        <span>
          {t('footerDescription')}
        </span>

      </footer>

    </div>
  )
}