import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DEPT_CHIPS = [
  'Roads', 'Water Supply', 'Electricity', 'Sanitation & Garbage',
  'Street Lighting', 'Drainage & Sewage', 'Public Health', 'Parks & Environment'
]

const STEPS = [
  { n: '01', title: 'Report the issue', text: "Describe what's wrong, add a photo, and it's automatically routed to the right department." },
  { n: '02', title: 'Track it openly', text: 'Follow every status change in real time — pending, assigned, in progress, resolved.' },
  { n: '03', title: 'Confirm it yourself', text: "When the department says it's fixed, you have the final word — upload a photo and close it yourself." }
]

export default function Landing() {
  const { user } = useAuth()

  if (user) {
    if (user.role === 'CITIZEN') return <Navigate to="/citizen" replace />
    if (user.role === 'DEPT_OFFICER') return <Navigate to="/officer" replace />
    if (user.role === 'COMMISSIONER') return <Navigate to="/commissioner" replace />
  }

  return (
    <div className="site">
      <header className="site-header">
        <div className="site-header-brand">Nagrik Seva</div>
        <nav className="site-header-actions">
          <Link to="/gov/login" className="site-header-link">Government login</Link>
          <Link to="/citizen/login"><button className="btn btn-ghost btn-sm">Log in</button></Link>
          <Link to="/citizen/register"><button className="btn btn-marigold btn-sm">Report an issue</button></Link>
        </nav>
      </header>

      <section className="hero">
        <h1 className="hero-title">Report it. Track it. Confirm it fixed.</h1>
        <p className="hero-sub">
          Nagrik Seva connects residents directly with their local government departments —
          every complaint routed, tracked, and closed only when you say it's actually resolved.
        </p>
        <div className="hero-actions">
          <Link to="/citizen/register"><button className="btn btn-marigold">Report an issue</button></Link>
          <Link to="/citizen/login"><button className="btn btn-ghost">Track an existing complaint</button></Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How it works</h2>
        <div className="how-steps">
          {STEPS.map((s) => (
            <div key={s.n} className="how-step">
              <div className="how-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <h2 className="section-title">Every department, one portal</h2>
        <p className="section-sub">Complaints are automatically routed based on the category you choose.</p>
        <div className="dept-chips">
          {DEPT_CHIPS.map((d) => <span key={d} className="dept-chip">{d}</span>)}
        </div>
      </section>

      <section className="gov-callout">
        <div>
          <h2>Work for a department?</h2>
          <p>Officers and commissioners sign in through a dedicated government portal — accounts are provisioned by your office, not self-registered.</p>
        </div>
        <Link to="/gov/login"><button className="btn btn-primary">Government login</button></Link>
      </section>

      <footer className="site-footer">
        <span>Nagrik Seva — Public Grievance Portal</span>
        <span>Built for residents and the departments that serve them.</span>
      </footer>
    </div>
  )
}