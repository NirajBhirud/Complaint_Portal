import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../api/axios'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'

export default function ComplaintDetail() {

  const { t, i18n } = useTranslation()

  const { id } = useParams()

  const { user } = useAuth()

  const [complaint, setComplaint] = useState(null)

  const [timeline, setTimeline] = useState([])

  const [afterImage, setAfterImage] = useState(null)

  const [remarks, setRemarks] = useState('')

  const [busy, setBusy] = useState(false)

  const [error, setError] = useState('')

  const load = async () => {

    try {

      const [complaintResponse, timelineResponse] =
        await Promise.all([
          api.get(`/complaints/${id}`),
          api.get(`/complaints/${id}/timeline`)
        ])

      setComplaint(
        complaintResponse.data
      )

      setTimeline(
        timelineResponse.data
      )

    } catch (err) {

      console.error(
        'Could not load complaint:',
        err
      )
    }
  }

  useEffect(() => {
    load()
  }, [id])

  // =========================================================
  // CONFIRM COMPLETION
  // =========================================================

  const handleConfirm = async (e) => {

    e.preventDefault()

    setError('')

    if (!afterImage) {

      setError(
        t('confirmationPhotoRequired')
      )

      return
    }

    setBusy(true)

    try {

      const fd = new FormData()

      fd.append(
        'image',
        afterImage
      )

      fd.append(
        'remarks',
        remarks
      )

      await api.post(
        `/complaints/${id}/confirm-completion`,
        fd,
        {
          headers: {
            'Content-Type':
              'multipart/form-data'
          }
        }
      )

      setAfterImage(null)

      setRemarks('')

      await load()

    } catch (err) {

      setError(
        err.response?.data?.error ||
        t('couldNotConfirmCompletion')
      )

    } finally {

      setBusy(false)
    }
  }

  // =========================================================
  // REOPEN
  // =========================================================

  const handleReopen = async () => {

    const reason = window.prompt(
      t('reopenReasonPrompt')
    )

    if (!reason) {
      return
    }

    setBusy(true)

    try {

      await api.post(
        `/complaints/${id}/reopen`,
        { reason }
      )

      await load()

    } catch (err) {

      setError(
        err.response?.data?.error ||
        t('couldNotReopenComplaint')
      )

    } finally {

      setBusy(false)
    }
  }

  if (!complaint) {

    return (
      <div className="page-shell">
        <p>
          {t('loadingComplaint')}
        </p>
      </div>
    )
  }

  const isOwner =
    user?.userId === complaint.citizen?.id

  const awaitingConfirmation =
    complaint.status ===
    'RESOLVED_PENDING_CONFIRMATION'

  const hasCoordinates =
    complaint.latitude !== null &&
    complaint.latitude !== undefined &&
    complaint.longitude !== null &&
    complaint.longitude !== undefined

  const mapUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`
    : null

  const getTimelineStatus = (status) => {

    const statusKeyMap = {

      PENDING: 'statusPending',

      ASSIGNED: 'statusAssigned',

      IN_PROGRESS: 'statusInProgress',

      RESOLVED_PENDING_CONFIRMATION:
        'statusAwaitingConfirmation',

      COMPLETED: 'statusCompleted',

      REOPENED: 'statusReopened'
    }

    return t(
      statusKeyMap[status] || status
    )
  }

  return (
    <div className="page-shell">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>
            {complaint.title}
          </h1>

          <p>

            {complaint.department?.name}

            {' · '}

            {t('complaintNumber')}
            {' #'}
            {complaint.id}

          </p>

        </div>

        <StatusBadge
          status={complaint.status}
        />

      </div>

      {/* LOCATION */}

      <div className="panel">

        <h3>
          {t('locationInformation')}
        </h3>

        {complaint.location && (

          <p>
            <strong>
              {t('address')}:
            </strong>{' '}
            {complaint.location}
          </p>

        )}

        {hasCoordinates ? (

          <div className="location-details">

            <div>
              <strong>
                {t('latitude')}:
              </strong>{' '}
              {complaint.latitude.toFixed(6)}
            </div>

            <div>
              <strong>
                {t('longitude')}:
              </strong>{' '}
              {complaint.longitude.toFixed(6)}
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm map-button"
            >
              {t('viewOnMap')}
            </a>

          </div>

        ) : (

          <p>
            {t('noGpsLocation')}
          </p>

        )}

      </div>

      {/* DESCRIPTION + PHOTOS */}

      <div className="panel">

        <p
          style={{
            marginBottom:
              complaint.beforeImageUrl ||
              complaint.afterImageUrl
                ? 16
                : 0
          }}
        >
          {complaint.description}
        </p>

        {(complaint.beforeImageUrl ||
          complaint.afterImageUrl) && (

          <div className="image-pair">

            {complaint.beforeImageUrl && (

              <figure className="image-block">

                <figcaption>
                  {t('reported')}
                </figcaption>

                <img
                  src={`http://localhost:8080${complaint.beforeImageUrl}`}
                  alt={t('reportedConditionAlt')}
                />

              </figure>

            )}

            {complaint.afterImageUrl && (

              <figure className="image-block">

                <figcaption>
                  {t('confirmedRepaired')}
                </figcaption>

                <img
                  src={`http://localhost:8080${complaint.afterImageUrl}`}
                  alt={t('repairedConditionAlt')}
                />

              </figure>

            )}

          </div>

        )}

        {complaint.officerRemark && (

          <div className="panel-remark">

            <strong>
              {t('departmentNote')}{' '}
            </strong>

            {complaint.officerRemark}

          </div>

        )}

      </div>

      {/* CITIZEN CONFIRMATION */}

      {isOwner &&
        awaitingConfirmation && (

          <div className="panel-action">

            <h3>
              {t('departmentSaysFixed')}
            </h3>

            <p>
              {t('confirmRepairDescription')}
            </p>

            <form
              onSubmit={handleConfirm}
            >

              <input
                type="file"
                accept="image/*"
                className="field-file"
                onChange={(e) =>
                  setAfterImage(
                    e.target.files[0]
                  )
                }
              />

              <textarea
                className="field-textarea"
                rows={2}
                placeholder={t('optionalRemarks')}
                value={remarks}
                onChange={(e) =>
                  setRemarks(
                    e.target.value
                  )
                }
              />

              {error && (

                <p className="field-error">
                  {error}
                </p>

              )}

              <div
                style={{
                  display: 'flex',
                  gap: 10
                }}
              >

                <button
                  type="submit"
                  className="btn btn-marigold"
                  disabled={busy}
                >
                  {t('confirmFixed')}
                </button>

                <button
                  type="button"
                  className="btn btn-danger-ghost"
                  onClick={handleReopen}
                  disabled={busy}
                >
                  {t('notFixedReopen')}
                </button>

              </div>

            </form>

          </div>
        )}

      {/* TIMELINE */}

      <h3
        style={{
          marginTop: 30,
          marginBottom: 4
        }}
      >
        {t('timeline')}
      </h3>

      <div className="timeline">

        {timeline.map((h) => (

          <div
            key={h.id}
            className="timeline-item"
          >

            <div className="timeline-status">

              {getTimelineStatus(
                h.status
              )}

            </div>

            <div className="timeline-meta">

              {new Date(
                h.changedAt
              ).toLocaleString(
                i18n.language === 'mr'
                  ? 'mr-IN'
                  : i18n.language === 'hi'
                    ? 'hi-IN'
                    : 'en-IN'
              )}

              {' '}

              {t('changedBy')}

              {' '}

              {h.changedByName}

            </div>

            {h.remarks && (

              <p className="timeline-remarks">
                {h.remarks}
              </p>

            )}

          </div>

        ))}

      </div>

    </div>
  )
}