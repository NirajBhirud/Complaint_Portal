import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../api/axios'
import StatusBadge from '../components/StatusBadge'

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const { t } = useTranslation()

  useEffect(() => {
    api.get('/complaints/my')
      .then((res) => setComplaints(res.data))
      .finally(() => setLoading(false))
  }, [])

  const needsAction = complaints.filter(
    (c) => c.status === 'RESOLVED_PENDING_CONFIRMATION'
  ).length

  return (
    <div className="page-shell-wide">

      <div className="page-header">

        <div>

          <h1>
            {t('myComplaints')}
          </h1>

          <p>
            {needsAction > 0
              ? t('complaintsWaitingConfirmation', {
                  count: needsAction
                })
              : t('complaintsTrackedDescription')}
          </p>

        </div>

        <Link to="/citizen/raise">
          <button className="btn btn-primary">
            {t('raiseComplaint')}
          </button>
        </Link>

      </div>


      {loading && (
        <p>
          {t('loadingComplaints')}
        </p>
      )}


      {!loading && complaints.length === 0 && (
        <div className="empty-state">

          <p style={{ marginBottom: 12 }}>
            {t('noComplaints')}
          </p>

          <Link to="/citizen/raise">
            <button className="btn btn-marigold">
              {t('raiseFirstComplaint')}
            </button>
          </Link>

        </div>
      )}


      {!loading && complaints.length > 0 && (
        <div className="ledger">

          {complaints.map((c) => (
            <Link
              key={c.id}
              to={`/complaints/${c.id}`}
              className="ledger-row"
            >

              <div>

                <div className="ledger-row-title">
                  {c.title}
                </div>

                <div className="ledger-row-meta">
                  {c.department?.name || t('unassigned')}
                  {' · '}
                  {t('complaintNumber')} #{c.id}
                </div>

              </div>

              <StatusBadge status={c.status} />

            </Link>
          ))}

        </div>
      )}

    </div>
  )
}