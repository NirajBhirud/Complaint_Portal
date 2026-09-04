import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import StatusBadge from '../components/StatusBadge'

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/complaints/my')
      .then((res) => setComplaints(res.data))
      .finally(() => setLoading(false))
  }, [])

  const needsAction = complaints.filter((c) => c.status === 'RESOLVED_PENDING_CONFIRMATION').length

  return (
    <div className="page-shell-wide">
      <div className="page-header">
        <div>
          <h1>My complaints</h1>
          <p>
            {needsAction > 0
              ? `${needsAction} complaint${needsAction > 1 ? 's are' : ' is'} waiting on your confirmation.`
              : 'Every complaint you raise, tracked from report to repair.'}
          </p>
        </div>
        <Link to="/citizen/raise"><button className="btn btn-primary">Raise a complaint</button></Link>
      </div>

      {loading && <p>Loading your complaints…</p>}

      {!loading && complaints.length === 0 && (
        <div className="empty-state">
          <p style={{ marginBottom: 12 }}>You haven't raised any complaints yet.</p>
          <Link to="/citizen/raise"><button className="btn btn-marigold">Raise your first complaint</button></Link>
        </div>
      )}

      {!loading && complaints.length > 0 && (
        <div className="ledger">
          {complaints.map((c) => (
            <Link key={c.id} to={`/complaints/${c.id}`} className="ledger-row">
              <div>
                <div className="ledger-row-title">{c.title}</div>
                <div className="ledger-row-meta">{c.department?.name || 'Unassigned'} · Complaint #{c.id}</div>
              </div>
              <StatusBadge status={c.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
