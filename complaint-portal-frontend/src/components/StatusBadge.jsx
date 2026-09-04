const STATUS_STYLES = {
  PENDING: { dot: '#8892A0', bg: '#EEEFEA', color: '#4B5768', label: 'Pending' },
  ASSIGNED: { dot: '#2C5F8A', bg: '#E8F0F6', color: '#2C5F8A', label: 'Assigned' },
  IN_PROGRESS: { dot: '#2C5F8A', bg: '#E8F0F6', color: '#2C5F8A', label: 'In progress' },
  RESOLVED_PENDING_CONFIRMATION: { dot: '#C1852B', bg: '#FBF0DE', color: '#8A5F17', label: 'Awaiting your confirmation' },
  COMPLETED: { dot: '#2F6F4E', bg: '#E7F1EB', color: '#2F6F4E', label: 'Completed' },
  REOPENED: { dot: '#A63D2F', bg: '#FBEAE7', color: '#A63D2F', label: 'Reopened' }
}

export default function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { dot: '#8892A0', bg: '#EEEFEA', color: '#4B5768', label: status }
  return (
    <span className="status-tag" style={{ background: s.bg, color: s.color }}>
      <span className="status-dot" style={{ background: s.dot }} />
      {s.label}
    </span>
  )
}
