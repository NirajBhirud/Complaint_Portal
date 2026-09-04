import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
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

const NAV_BY_ROLE = {
  CITIZEN: [
    { to: '/citizen', label: 'My Complaints' },
    { to: '/citizen/raise', label: 'Raise a Complaint' }
  ],
  DEPT_OFFICER: [
    { to: '/officer', label: 'Department Queue' }
  ],
  COMMISSIONER: [
    { to: '/commissioner', label: 'Oversight Dashboard' }
  ]
}

const ROLE_LABEL = {
  CITIZEN: 'Citizen account',
  DEPT_OFFICER: 'Department Officer',
  COMMISSIONER: 'Commissioner'
}

function Rail() {
  const { user, logout } = useAuth()
  if (!user) return null
  const links = NAV_BY_ROLE[user.role] || []
  const isGov = user.role !== 'CITIZEN'

  return (
    <aside className={'rail' + (isGov ? ' rail-gov' : '')}>
      <div>
        <div className="rail-brand">Nagrik Seva</div>
        <div className="rail-tagline">{isGov ? 'Government Portal' : 'Public Grievance Portal'}</div>
      </div>
      <nav className="rail-nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end
            className={({ isActive }) => 'rail-link' + (isActive ? ' active' : '')}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="rail-user">
        <div className="rail-user-name">{user.fullName}</div>
        <div className="rail-user-role">{ROLE_LABEL[user.role] || user.role}</div>
        <button className="btn btn-ghost btn-sm btn-block rail-logout" onClick={logout}>
          Log out
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
      <div className="main-area">{children}</div>
    </div>
  )
}

function ChatbotForCitizens() {
  const { user } = useAuth()
  if (!user || user.role !== 'CITIZEN') return null
  return <ChatbotWidget />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/citizen/login" element={<CitizenLogin />} />
            <Route path="/citizen/register" element={<CitizenRegister />} />
            <Route path="/gov/login" element={<GovLogin />} />

            <Route path="/citizen" element={
              <ProtectedRoute allowedRoles={['CITIZEN']}><CitizenDashboard /></ProtectedRoute>
            } />
            <Route path="/citizen/raise" element={
              <ProtectedRoute allowedRoles={['CITIZEN']}><RaiseComplaint /></ProtectedRoute>
            } />
            <Route path="/complaints/:id" element={
              <ProtectedRoute><ComplaintDetail /></ProtectedRoute>
            } />
            <Route path="/officer" element={
              <ProtectedRoute allowedRoles={['DEPT_OFFICER']}><OfficerDashboard /></ProtectedRoute>
            } />
            <Route path="/commissioner" element={
              <ProtectedRoute allowedRoles={['COMMISSIONER']}><CommissionerDashboard /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
        <ChatbotForCitizens />
      </BrowserRouter>
    </AuthProvider>
  )
}
