import { useEffect, useState } from 'react'
import api from '../api/axios'
import StatusBadge from '../components/StatusBadge'

const OFFICER_ALLOWED_STATUSES = [
  ['ASSIGNED', 'Assign to self'],
  ['IN_PROGRESS', 'Mark in progress'],
  ['RESOLVED_PENDING_CONFIRMATION', 'Mark resolved']
]

export default function OfficerDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [remarksById, setRemarksById] = useState({})
  const [busyId, setBusyId] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/complaints/officer/dept').then((res) => setComplaints(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (complaintId, newStatus) => {
    setBusyId(complaintId)
    try {
      await api.patch(`/complaints/${complaintId}/status`, { newStatus, remarks: remarksById[complaintId] || '' })
      load()
    } catch (err) {
      alert(err.response?.data?.error || 'Update failed')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="page-shell-wide">
      <div className="page-header">
        <div>
          <h1>Department queue</h1>
          <p>Complaints routed to your department, oldest first.</p>
        </div>
      </div>

      {loading && <p>Loading queue…</p>}
      {!loading && complaints.length === 0 && (
        <div className="empty-state">No complaints in your department right now.</div>
      )}

      {complaints.map((c) => (
        <div key={c.id} className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
            <div>
              <h3 style={{ marginBottom: 2 }}>{c.title}</h3>
              <div className="ledger-row-meta">Complaint #{c.id}{c.location ? ` · ${c.location}` : ''}</div>
            </div>
            <StatusBadge status={c.status} />
          </div>
          <p>{c.description}</p>

          {c.beforeImageUrl && (
            <figure className="image-block" style={{ marginBottom: 14 }}>
              <figcaption>Reported condition</figcaption>
              <img src={`http://localhost:8080${c.beforeImageUrl}`} alt="Reported issue" />
            </figure>
          )}

          {c.status !== 'COMPLETED' && (
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14, marginTop: 4 }}>
              <textarea
                className="field-textarea"
                placeholder="Add a remark for this update…"
                rows={2}
                value={remarksById[c.id] || ''}
                onChange={(e) => setRemarksById({ ...remarksById, [c.id]: e.target.value })}
              />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {OFFICER_ALLOWED_STATUSES.map(([status, label]) => (
                  <button key={status} className="btn btn-ghost btn-sm"
                    disabled={busyId === c.id || c.status === status}
                    onClick={() => updateStatus(c.id, status)}>
                    {label}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-faint)', margin: 0 }}>
                Only the citizen can mark this complete, once they've confirmed the repair with a photo.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
