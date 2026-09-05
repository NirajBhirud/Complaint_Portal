import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../api/axios'
import StatusBadge from '../components/StatusBadge'

const TABS = ['Overview', 'Departments & Officers', 'All Complaints']

const CATEGORIES = [
  'ROADS', 'WATER_SUPPLY', 'ELECTRICITY', 'SANITATION_GARBAGE', 'STREET_LIGHTING',
  'DRAINAGE_SEWAGE', 'PUBLIC_HEALTH', 'PARKS_ENVIRONMENT', 'ILLEGAL_CONSTRUCTION', 'OTHER'
]

export default function CommissionerDashboard() {
  const { t } = useTranslation()

  const [tab, setTab] = useState('Overview')
  const [overview, setOverview] = useState(null)
  const [departments, setDepartments] = useState([])
  const [officers, setOfficers] = useState([])
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const [deptForm, setDeptForm] = useState({
    name: '',
    category: 'ROADS',
    contactEmail: ''
  })

  const [officerForm, setOfficerForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNo: '',
    departmentId: ''
  })

  const [formMsg, setFormMsg] = useState('')
  const [formErr, setFormErr] = useState('')

  const loadAll = async () => {
    setLoading(true)

    const [o, d, off, c] = await Promise.all([
      api.get('/commissioner/overview'),
      api.get('/commissioner/departments'),
      api.get('/commissioner/officers'),
      api.get('/commissioner/complaints')
    ])

    setOverview(o.data)
    setDepartments(d.data)
    setOfficers(off.data)
    setComplaints(c.data)
    setLoading(false)
  }

  useEffect(() => {
    loadAll()
  }, [])

  const submitDept = async (e) => {
    e.preventDefault()
    setFormMsg('')
    setFormErr('')

    try {
      await api.post('/commissioner/departments', deptForm)

      setDeptForm({
        name: '',
        category: 'ROADS',
        contactEmail: ''
      })

      setFormMsg(t('departmentAdded'))
      loadAll()
    } catch (err) {
      setFormErr(
        err.response?.data?.error || t('couldNotAddDepartment')
      )
    }
  }

  const submitOfficer = async (e) => {
    e.preventDefault()
    setFormMsg('')
    setFormErr('')

    if (!officerForm.departmentId) {
      setFormErr(t('pickDepartmentForOfficer'))
      return
    }

    try {
      await api.post('/commissioner/officers', officerForm)

      setOfficerForm({
        fullName: '',
        email: '',
        password: '',
        phoneNo: '',
        departmentId: ''
      })

      setFormMsg(t('officerAccountCreated'))
      loadAll()
    } catch (err) {
      setFormErr(
        err.response?.data?.error || t('couldNotCreateOfficer')
      )
    }
  }

  if (loading) {
    return (
      <div className="page-shell-wide">
        <p>{t('loadingOversightDashboard')}</p>
      </div>
    )
  }

  return (
    <div className="page-shell-wide">
      <div className="page-header">
        <div>
          <h1>{t('commissionerOverview')}</h1>
          <p>{t('commissionerOverviewDescription')}</p>
        </div>
      </div>

      <div className="tab-bar">
        {TABS.map((tabName) => (
          <button
            key={tabName}
            className={'tab-btn' + (tab === tabName ? ' active' : '')}
            onClick={() => setTab(tabName)}
          >
            {tabName === 'Overview' && t('overview')}
            {tabName === 'Departments & Officers' && t('departmentsAndOfficers')}
            {tabName === 'All Complaints' && t('allComplaints')}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div>
          <div className="stat-row">
            <div className="stat-block">
              <div className="stat-num">{overview.totalComplaints}</div>
              <div className="stat-label">{t('totalComplaints')}</div>
            </div>

            <div className="stat-block">
              <div className="stat-num">{overview.totalDepartments}</div>
              <div className="stat-label">{t('departments')}</div>
            </div>

            <div className="stat-block">
              <div className="stat-num">{overview.totalOfficers}</div>
              <div className="stat-label">{t('officers')}</div>
            </div>
          </div>

          <h3 style={{ marginTop: 26 }}>{t('byStatus')}</h3>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 10
            }}
          >
            {Object.entries(overview.byStatus).map(([status, count]) => (
              <div
                key={status}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7
                }}
              >
                <StatusBadge status={status} />

                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--ink-faint)'
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 22 }}>{t('byDepartment')}</h3>

          <div className="ledger">
            {Object.entries(overview.byDepartment).map(([name, count]) => (
              <div key={name} className="ledger-row">
                <div
                  className="ledger-row-title"
                  style={{ fontWeight: 500 }}
                >
                  {name}
                </div>

                <div className="ledger-row-meta">
                  {count}{' '}
                  {count === 1
                    ? t('complaint')
                    : t('complaints')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Departments & Officers' && (
        <div>
          {formMsg && (
            <p
              style={{
                color: 'var(--success)',
                fontSize: '0.88rem'
              }}
            >
              {formMsg}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              gap: 20,
              flexWrap: 'wrap',
              marginBottom: 26
            }}
          >
            <div
              className="panel"
              style={{ flex: '1 1 280px' }}
            >
              <h3>{t('addDepartment')}</h3>

              <form onSubmit={submitDept}>
                <label className="field-label">
                  {t('name')}
                </label>

                <input
                  className="field-input"
                  required
                  value={deptForm.name}
                  onChange={(e) =>
                    setDeptForm({
                      ...deptForm,
                      name: e.target.value
                    })
                  }
                  placeholder={t('departmentNamePlaceholder')}
                />

                <label className="field-label">
                  {t('category')}
                </label>

                <select
                  className="field-select"
                  value={deptForm.category}
                  onChange={(e) =>
                    setDeptForm({
                      ...deptForm,
                      category: e.target.value
                    })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c === 'ROADS' && t('roads')}
                      {c === 'WATER_SUPPLY' && t('waterSupply')}
                      {c === 'ELECTRICITY' && t('electricity')}
                      {c === 'SANITATION_GARBAGE' &&
                        t('sanitationGarbage')}
                      {c === 'STREET_LIGHTING' &&
                        t('streetLighting')}
                      {c === 'DRAINAGE_SEWAGE' &&
                        t('drainageSewage')}
                      {c === 'PUBLIC_HEALTH' &&
                        t('publicHealth')}
                      {c === 'PARKS_ENVIRONMENT' &&
                        t('parksEnvironment')}
                      {c === 'ILLEGAL_CONSTRUCTION' &&
                        t('illegalConstruction')}
                      {c === 'OTHER' && t('other')}
                    </option>
                  ))}
                </select>

                <label className="field-label">
                  {t('contactEmail')}
                </label>

                <input
                  className="field-input"
                  type="email"
                  value={deptForm.contactEmail}
                  onChange={(e) =>
                    setDeptForm({
                      ...deptForm,
                      contactEmail: e.target.value
                    })
                  }
                />

                {formErr && (
                  <p className="field-error">
                    {formErr}
                  </p>
                )}

                <button
                  className="btn btn-primary btn-sm"
                  type="submit"
                >
                  {t('addDepartment')}
                </button>
              </form>
            </div>

            <div
              className="panel"
              style={{ flex: '1 1 280px' }}
            >
              <h3>{t('provisionOfficerAccount')}</h3>

              <form onSubmit={submitOfficer}>
                <label className="field-label">
                  {t('fullName')}
                </label>

                <input
                  className="field-input"
                  required
                  value={officerForm.fullName}
                  onChange={(e) =>
                    setOfficerForm({
                      ...officerForm,
                      fullName: e.target.value
                    })
                  }
                />

                <label className="field-label">
                  {t('email')}
                </label>

                <input
                  className="field-input"
                  type="email"
                  required
                  value={officerForm.email}
                  onChange={(e) =>
                    setOfficerForm({
                      ...officerForm,
                      email: e.target.value
                    })
                  }
                />

                <label className="field-label">
                  {t('temporaryPassword')}
                </label>

                <input
                  className="field-input"
                  type="text"
                  required
                  value={officerForm.password}
                  onChange={(e) =>
                    setOfficerForm({
                      ...officerForm,
                      password: e.target.value
                    })
                  }
                />

                <label className="field-label">
                  {t('department')}
                </label>

                <select
                  className="field-select"
                  value={officerForm.departmentId}
                  onChange={(e) =>
                    setOfficerForm({
                      ...officerForm,
                      departmentId: e.target.value
                    })
                  }
                >
                  <option value="">
                    {t('selectDepartment')}
                  </option>

                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>

                {formErr && (
                  <p className="field-error">
                    {formErr}
                  </p>
                )}

                <button
                  className="btn btn-primary btn-sm"
                  type="submit"
                >
                  {t('createOfficer')}
                </button>
              </form>
            </div>
          </div>

          <h3>
            {t('departments')} ({departments.length})
          </h3>

          <div
            className="ledger"
            style={{ marginBottom: 24 }}
          >
            {departments.map((d) => (
              <div key={d.id} className="ledger-row">
                <div>
                  <div
                    className="ledger-row-title"
                    style={{ fontWeight: 500 }}
                  >
                    {d.name}
                  </div>

                  <div className="ledger-row-meta">
                    {d.contactEmail}
                  </div>
                </div>

                <span
                  className="status-tag"
                  style={{
                    background: '#E8F0F6',
                    color: 'var(--progress)'
                  }}
                >
                  {d.category === 'ROADS' && t('roads')}
                  {d.category === 'WATER_SUPPLY' &&
                    t('waterSupply')}
                  {d.category === 'ELECTRICITY' &&
                    t('electricity')}
                  {d.category === 'SANITATION_GARBAGE' &&
                    t('sanitationGarbage')}
                  {d.category === 'STREET_LIGHTING' &&
                    t('streetLighting')}
                  {d.category === 'DRAINAGE_SEWAGE' &&
                    t('drainageSewage')}
                  {d.category === 'PUBLIC_HEALTH' &&
                    t('publicHealth')}
                  {d.category === 'PARKS_ENVIRONMENT' &&
                    t('parksEnvironment')}
                  {d.category === 'ILLEGAL_CONSTRUCTION' &&
                    t('illegalConstruction')}
                  {d.category === 'OTHER' && t('other')}
                </span>
              </div>
            ))}
          </div>

          <h3>
            {t('officers')} ({officers.length})
          </h3>

          <div className="ledger">
            {officers.map((o) => (
              <div key={o.id} className="ledger-row">
                <div>
                  <div
                    className="ledger-row-title"
                    style={{ fontWeight: 500 }}
                  >
                    {o.fullName}
                  </div>

                  <div className="ledger-row-meta">
                    {o.email}
                  </div>
                </div>

                <div className="ledger-row-meta">
                  {o.department?.name || '—'}
                </div>
              </div>
            ))}

            {officers.length === 0 && (
              <p style={{ padding: '12px 4px' }}>
                {t('noOfficerAccounts')}
              </p>
            )}
          </div>
        </div>
      )}

      {tab === 'All Complaints' && (
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
                  {c.department?.name || t('unassigned')} ·{' '}
                  {t('complaintNumber')} #{c.id}
                </div>
              </div>

              <StatusBadge status={c.status} />
            </Link>
          ))}

          {complaints.length === 0 && (
            <p style={{ padding: '12px 4px' }}>
              {t('noComplaintsInSystem')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}