import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useTranslation } from 'react-i18next'

import ProtectedRoute from './components/ProtectedRoute'
import ChatbotWidget from './components/ChatbotWidget'
import Landing from './pages/Landing'
import CitizenLogin from './pages/CitizenLogin'
import CitizenRegister from './pages/CitizenRegister'
import GovLogin from './pages/GovLogin'
import CitizenDashboard from './pages/CitizenDashboard'
import RaiseComplaint from './pages/RaiseComplaint'
import ComplaintDetail from './pages/ComplaintDetail'
import OfficerDashboard from './pages/OfficerDashboard'
import CommissionerDashboard from './pages/CommissionerDashboard'
import LanguageSelector from './components/LanguageSelector'

const NAV_BY_ROLE = {
  CITIZEN: [
    { to: '/citizen', labelKey: 'myComplaints' },
    { to: '/citizen/raise', labelKey: 'raiseComplaint' }
  ],
  DEPT_OFFICER: [
    { to: '/officer', labelKey: 'departmentQueue' }
  ],
  COMMISSIONER: [
    { to: '/commissioner', labelKey: 'oversightDashboard' }
  ]
}

const ROLE_LABEL = {
  CITIZEN: 'citizenAccount',
  DEPT_OFFICER: 'departmentOfficer',
  COMMISSIONER: 'commissioner'
}

function Rail() {
  const { user, logout } = useAuth()
  const { t } = useTranslation()

  if (!user) return null

  const links = NAV_BY_ROLE[user.role] || []
  const isGov = user.role !== 'CITIZEN'

  return (
    <aside className={'rail' + (isGov ? ' rail-gov' : '')}>

      <div>
        <div className="rail-brand">
          Nagrik Seva
        </div>

        <div className="rail-tagline">
          {isGov
            ? t('governmentPortal')
            : t('publicGrievancePortal')}
        </div>
      </div>

      <LanguageSelector />

      <nav className="rail-nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            className={({ isActive }) =>
              'rail-link' + (isActive ? ' active' : '')
            }
          >
            {t(l.labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="rail-user">

        <div className="rail-user-name">
          {user.fullName}
        </div>

        <div className="rail-user-role">
          {t(ROLE_LABEL[user.role]) || user.role}
        </div>

        <button
          className="btn btn-ghost btn-sm btn-block rail-logout"
          onClick={logout}
        >
          {t('logout')}
        </button>

      </div>

    </aside>
  )
}

function Shell({ children }) {
  const { user } = useAuth()

  if (!user) return children

  return (
    <div className="app-shell">
      <Rail />
      <div className="main-area">
        {children}
      </div>
    </div>
  )
}

function ChatbotForCitizens() {
  return <ChatbotWidget />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Shell>
          <Routes>

            <Route
              path="/"
              element={<Landing />}
            />

            <Route
              path="/citizen/login"
              element={<CitizenLogin />}
            />

            <Route
              path="/citizen/register"
              element={<CitizenRegister />}
            />

            <Route
              path="/gov/login"
              element={<GovLogin />}
            />

            <Route
              path="/citizen"
              element={
                <ProtectedRoute allowedRoles={['CITIZEN']}>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/citizen/raise"
              element={
                <ProtectedRoute allowedRoles={['CITIZEN']}>
                  <RaiseComplaint />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints/:id"
              element={
                <ProtectedRoute>
                  <ComplaintDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/officer"
              element={
                <ProtectedRoute allowedRoles={['DEPT_OFFICER']}>
                  <OfficerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/commissioner"
              element={
                <ProtectedRoute allowedRoles={['COMMISSIONER']}>
                  <CommissionerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </Shell>

        <ChatbotForCitizens />

      </BrowserRouter>
    </AuthProvider>
  )
}