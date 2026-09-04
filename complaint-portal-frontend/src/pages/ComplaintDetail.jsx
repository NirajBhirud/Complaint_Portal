import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'

export default function ComplaintDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [complaint, setComplaint] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [afterImage, setAfterImage] = useState(null)
  const [remarks, setRemarks] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    const [c, t] = await Promise.all([
      api.get(`/complaints/${id}`),
      api.get(`/complaints/${id}/timeline`)
    ])
    setComplaint(c.data)
    setTimeline(t.data)
  }

  useEffect(() => { load() }, [id])

  const handleConfirm = async (e) => {
    e.preventDefault()
    setError('')
    if (!afterImage) {
      setError('Please add a photo of the repaired spot before confirming.')
      return
    }
    setBusy(true)
    try {
      const fd = new FormData()
      fd.append('image', afterImage)
      fd.append('remarks', remarks)
      await api.post(`/complaints/${id}/confirm-completion`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      await load()
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't confirm completion.")
    } finally {
      setBusy(false)
    }
  }

  const handleReopen = async () => {
    const reason = prompt("What's still wrong? This sends it back to the department.")
    if (!reason) return
    setBusy(true)
    try {
      await api.post(`/complaints/${id}/reopen`, { reason })
      await load()
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't reopen this complaint.")
    } finally {
      setBusy(false)
    }
  }

  if (!complaint) return <div className="page-shell"><p>Loading complaint…</p></div>

  const isOwner = user?.userId === complaint.citizen?.id
  const awaitingConfirmation = complaint.status === 'RESOLVED_PENDING_CONFIRMATION'

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1>{complaint.title}</h1>
          <p>{complaint.department?.name} · Complaint #{complaint.id}{complaint.location ? ` · ${complaint.location}` : ''}</p>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="panel">
        <p style={{ marginBottom: complaint.beforeImageUrl || complaint.afterImageUrl ? 16 : 0 }}>{complaint.description}</p>

        {(complaint.beforeImageUrl || complaint.afterImageUrl) && (
          <div className="image-pair">
            {complaint.beforeImageUrl && (
              <figure className="image-block">
                <figcaption>Reported</figcaption>
                <img src={`http://localhost:8080${complaint.beforeImageUrl}`} alt="Condition when reported" />
              </figure>
            )}
            {complaint.afterImageUrl && (
              <figure className="image-block">
                <figcaption>Confirmed repaired</figcaption>
                <img src={`http://localhost:8080${complaint.afterImageUrl}`} alt="Condition after repair" />
              </figure>
            )}
          </div>
        )}

        {complaint.officerRemark && (
          <div className="panel-remark">
            <strong>Department note: </strong>{complaint.officerRemark}
          </div>
        )}
      </div>

      {/* the one bold moment in the app - only the owning citizen sees this, and only
          while the department is waiting on their confirmation */}
      {isOwner && awaitingConfirmation && (
        <div className="panel-action">
          <h3>The department says this is fixed</h3>
          <p>Take a photo of the repaired spot to confirm it yourself — this is the only way the complaint gets closed.</p>
          <form onSubmit={handleConfirm}>
            <input type="file" accept="image/*" className="field-file"
              onChange={(e) => setAfterImage(e.target.files[0])} />
            <textarea className="field-textarea" rows={2} placeholder="Optional remarks"
              value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            {error && <p className="field-error">{error}</p>}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-marigold" disabled={busy}>
                Confirm it's fixed
              </button>
              <button type="button" className="btn btn-danger-ghost" onClick={handleReopen} disabled={busy}>
                Not fixed — reopen
              </button>
            </div>
          </form>
        </div>
      )}

      <h3 style={{ marginTop: 30, marginBottom: 4 }}>Timeline</h3>
      <div className="timeline">
        {timeline.map((h) => (
          <div key={h.id} className="timeline-item">
            <div className="timeline-status">{h.status.replaceAll('_', ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</div>
            <div className="timeline-meta">{new Date(h.changedAt).toLocaleString()} by {h.changedByName}</div>
            {h.remarks && <p className="timeline-remarks">{h.remarks}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
