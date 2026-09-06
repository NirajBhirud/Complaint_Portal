import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api/axios'
import StatusBadge from '../components/StatusBadge'

const OFFICER_ALLOWED_STATUSES = [
  ['ASSIGNED', 'assignToSelf'],
  ['IN_PROGRESS', 'markInProgress'],
  ['RESOLVED_PENDING_CONFIRMATION', 'markResolved']
]

export default function OfficerDashboard() {

  const { t } = useTranslation()

  const [complaints, setComplaints] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [remarksById, setRemarksById] =
    useState({})

  const [busyId, setBusyId] =
    useState(null)

  const load = () => {

    setLoading(true)

    api.get(
      '/complaints/officer/dept'
    )
      .then((res) => {

        setComplaints(res.data)

      })
      .catch((err) => {

        console.error(
          'Could not load officer queue:',
          err
        )

      })
      .finally(() => {

        setLoading(false)

      })
  }

  useEffect(() => {

    load()

  }, [])

  const updateStatus = async (
    complaintId,
    newStatus
  ) => {

    setBusyId(complaintId)

    try {

      await api.patch(
        `/complaints/${complaintId}/status`,
        {
          newStatus,
          remarks:
            remarksById[complaintId] || ''
        }
      )

      load()

    } catch (err) {

      alert(
        err.response?.data?.error ||
        t('updateFailed')
      )

    } finally {

      setBusyId(null)
    }
  }

  const openLocation = (
    latitude,
    longitude
  ) => {

    if (
      latitude === null ||
      latitude === undefined ||
      longitude === null ||
      longitude === undefined
    ) {
      return
    }

    const url =
      `https://www.google.com/maps?q=${latitude},${longitude}`

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="page-shell-wide">

      <div className="page-header">

        <div>

          <h1>
            {t('departmentQueue')}
          </h1>

          <p>
            {t('departmentQueueDescription')}
          </p>

        </div>

      </div>

      {loading && (

        <p>
          {t('loadingQueue')}
        </p>

      )}

      {!loading &&
        complaints.length === 0 && (

          <div className="empty-state">

            {t('noComplaintsInDepartment')}

          </div>

        )}

      {complaints.map((c) => {

        const hasLocation =
          c.latitude !== null &&
          c.latitude !== undefined &&
          c.longitude !== null &&
          c.longitude !== undefined

        return (

          <div
            key={c.id}
            className="panel"
          >

            {/* HEADER */}

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems:
                  'flex-start',
                gap: 12,
                marginBottom: 8
              }}
            >

              <div>

                <h3
                  style={{
                    marginBottom: 2
                  }}
                >
                  {c.title}
                </h3>

                <div className="ledger-row-meta">

                  {t('complaintNumber')}
                  {' #'}
                  {c.id}

                </div>

              </div>

              <StatusBadge
                status={c.status}
              />

            </div>

            {/* DESCRIPTION */}

            <p>
              {c.description}
            </p>

            {/* LOCATION */}

            <div className="officer-location-card">

              <div>

                <div className="officer-location-title">
                  📍 {t('locationInformation')}
                </div>

                {c.location && (

                  <div className="officer-address">

                    <strong>
                      {t('address')}:
                    </strong>{' '}

                    {c.location}

                  </div>

                )}

                {hasLocation ? (

                  <div
                    className="officer-coordinates"
                  >

                    <div>

                      <strong>
                        {t('latitude')}:
                      </strong>{' '}

                      {c.latitude.toFixed(6)}

                    </div>

                    <div>

                      <strong>
                        {t('longitude')}:
                      </strong>{' '}

                      {c.longitude.toFixed(6)}

                    </div>

                  </div>

                ) : (

                  <div className="location-message">

                    {t('noGpsLocation')}

                  </div>

                )}

              </div>

              {hasLocation && (

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    openLocation(
                      c.latitude,
                      c.longitude
                    )
                  }
                >
                  {t('openExactLocation')}
                </button>

              )}

            </div>

            {/* BEFORE PHOTO */}

            {c.beforeImageUrl && (

              <figure
                className="image-block"
                style={{
                  marginBottom: 14
                }}
              >

                <figcaption>
                  {t('reported')}
                </figcaption>

                <img
                  src={`http://localhost:8080${c.beforeImageUrl}`}
                  alt={t('reportedConditionAlt')}
                />

              </figure>

            )}

            {/* STATUS ACTIONS */}

            {c.status !== 'COMPLETED' && (

              <div
                style={{
                  borderTop:
                    '1px solid var(--line)',
                  paddingTop: 14,
                  marginTop: 4
                }}
              >

                <textarea
                  className="field-textarea"
                  placeholder={t('officerRemarkPlaceholder')}
                  rows={2}
                  value={
                    remarksById[c.id] || ''
                  }
                  onChange={(e) =>
                    setRemarksById({
                      ...remarksById,
                      [c.id]:
                        e.target.value
                    })
                  }
                />

                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    marginBottom: 10
                  }}
                >

                  {OFFICER_ALLOWED_STATUSES.map(
                    ([status, labelKey]) => (

                      <button
                        key={status}
                        className="btn btn-ghost btn-sm"
                        disabled={
                          busyId === c.id ||
                          c.status === status
                        }
                        onClick={() =>
                          updateStatus(
                            c.id,
                            status
                          )
                        }
                      >
                        {t(labelKey)}
                      </button>

                    )
                  )}

                </div>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color:
                      'var(--ink-faint)',
                    margin: 0
                  }}
                >
                  {t('citizenMustConfirm')}
                </p>

              </div>

            )}

          </div>

        )
      })}

    </div>
  )
}