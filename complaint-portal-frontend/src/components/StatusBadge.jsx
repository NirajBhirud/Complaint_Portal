import { useTranslation } from 'react-i18next'

const STATUS_STYLES = {
  PENDING: {
    dot: '#8892A0',
    bg: '#EEEFEA',
    color: '#4B5768',
    labelKey: 'statusPending'
  },

  ASSIGNED: {
    dot: '#2C5F8A',
    bg: '#E8F0F6',
    color: '#2C5F8A',
    labelKey: 'statusAssigned'
  },

  IN_PROGRESS: {
    dot: '#2C5F8A',
    bg: '#E8F0F6',
    color: '#2C5F8A',
    labelKey: 'statusInProgress'
  },

  RESOLVED_PENDING_CONFIRMATION: {
    dot: '#C1852B',
    bg: '#FBF0DE',
    color: '#8A5F17',
    labelKey: 'statusAwaitingConfirmation'
  },

  COMPLETED: {
    dot: '#2F6F4E',
    bg: '#E7F1EB',
    color: '#2F6F4E',
    labelKey: 'statusCompleted'
  },

  REOPENED: {
    dot: '#A63D2F',
    bg: '#FBEAE7',
    color: '#A63D2F',
    labelKey: 'statusReopened'
  }
}

export default function StatusBadge({ status }) {
  const { t } = useTranslation()

  const s = STATUS_STYLES[status]

  const label = s
    ? t(s.labelKey)
    : status

  const styles = s || {
    dot: '#8892A0',
    bg: '#EEEFEA',
    color: '#4B5768'
  }

  return (
    <span
      className="status-tag"
      style={{
        background: styles.bg,
        color: styles.color
      }}
    >
      <span
        className="status-dot"
        style={{
          background: styles.dot
        }}
      />

      {label}
    </span>
  )
}