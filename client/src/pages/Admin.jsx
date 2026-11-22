import { useState } from 'react'
import CrudManager from '../components/CrudManager'

const contactFields = [
  { name: 'firstname', label: 'First name', required: true },
  { name: 'lastname', label: 'Last name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'message', label: 'Message', type: 'textarea' }
]
const userFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'role', label: 'Role', type: 'select', options: ['user', 'admin'], required: true },
  { name: 'password', label: 'Password (leave blank to keep)', type: 'password', required: true }
]

// Admin dashboard: manage contact messages and users.
export default function Admin() {
  const [tab, setTab] = useState('contacts')
  return (
    <section>
      <h1>Admin dashboard</h1>
      <div className="row">
        <button className={`btn ${tab === 'contacts' ? '' : 'ghost'}`} onClick={() => setTab('contacts')}>Contact messages</button>
        <button className={`btn ${tab === 'users' ? '' : 'ghost'}`} onClick={() => setTab('users')}>Users</button>
      </div>
      {tab === 'contacts' ? (
        <CrudManager key="contacts" resource="contacts" fields={contactFields} canEdit emptyText="No messages yet."
          renderItem={(c) => (<><h3>{c.firstname} {c.lastname}</h3><small>{c.email} {c.phone && `· ${c.phone}`}</small><p>{c.message}</p></>)} />
      ) : (
        <CrudManager key="users" resource="users" fields={userFields} canEdit emptyText="No users."
          renderItem={(u) => (<><h3>{u.name}</h3><small>{u.email} · {u.role}</small></>)} />
      )}
    </section>
  )
}
