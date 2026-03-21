import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { clearAdminToken, getAdminToken, getAdminUsers } from '../lib/adminApi'
import './Admin.css'

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleString()
}

const escapeCsv = (value) => {
  const stringValue = String(value ?? '')
  return `"${stringValue.replace(/"/g, '""')}"`
}

const downloadFile = (filename, blob) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const token = getAdminToken()

  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await getAdminUsers()
        setUsers(response.users || [])
        setTotalUsers(Number(response.totalUsers || 0))
      } catch (err) {
        setError(err.message || 'Failed to load users.')
        if (String(err.message || '').toLowerCase().includes('unauthorized')) {
          clearAdminToken()
          navigate('/admin-login', { replace: true })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return users

    return users.filter((user) => {
      const haystack = [user.name, user.email, user.phone].join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }, [users, search])

  const handleLogout = () => {
    clearAdminToken()
    navigate('/admin-login', { replace: true })
  }

  const exportCsv = () => {
    const rows = [
      ['S. No.', 'Name', 'First Name', 'Last Name', 'Email', 'Phone', 'Purchases', 'Registered At'],
      ...filteredUsers.map((user) => [
        user.serial,
        user.name,
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.purchaseCount,
        formatDate(user.createdAt),
      ]),
    ]

    const csv = rows.map((row) => row.map((item) => escapeCsv(item)).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    downloadFile(`registered-users-${Date.now()}.csv`, blob)
  }

  const exportExcel = () => {
    const tableRows = filteredUsers
      .map(
        (user) => `
          <tr>
            <td>${user.serial}</td>
            <td>${user.name || ''}</td>
            <td>${user.firstName || ''}</td>
            <td>${user.lastName || ''}</td>
            <td>${user.email || ''}</td>
            <td>${user.phone || ''}</td>
            <td>${user.purchaseCount || 0}</td>
            <td>${formatDate(user.createdAt)}</td>
          </tr>
        `,
      )
      .join('')

    const html = `
      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Purchases</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    `

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' })
    downloadFile(`registered-users-${Date.now()}.xls`, blob)
  }

  if (!token) {
    return <Navigate to="/admin-login" replace />
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-topbar">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Manage all registered parents/users and download reports.</p>
          </div>
          <button type="button" className="admin-btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="admin-summary-card">
          <div className="admin-summary-item">
            <span className="admin-summary-label">Total Registered Users</span>
            <strong className="admin-summary-value">{totalUsers}</strong>
          </div>
          <div className="admin-summary-item">
            <span className="admin-summary-label">Showing</span>
            <strong className="admin-summary-value">{filteredUsers.length}</strong>
          </div>
        </section>

        <section className="admin-table-card">
          <div className="admin-table-toolbar">
            <input
              className="admin-search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, phone, email"
            />
            <div className="admin-export-actions">
              <button type="button" className="admin-btn-ghost" onClick={exportCsv}>
                Export CSV
              </button>
              <button type="button" className="admin-btn-primary" onClick={exportExcel}>
                Export Excel
              </button>
            </div>
          </div>

          {loading ? <p className="admin-message">Loading users...</p> : null}
          {error ? <p className="admin-error">{error}</p> : null}

          {!loading && !error ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Purchases</th>
                    <th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.serial}</td>
                      <td>{user.name || '-'}</td>
                      <td>{user.email || '-'}</td>
                      <td>{user.phone || '-'}</td>
                      <td>{user.purchaseCount || 0}</td>
                      <td>{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 ? <p className="admin-message">No users found.</p> : null}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}

export default AdminDashboard
