import { useEffect, useState } from 'react'
import { api } from '../api'

const toDateInput = (value) => (value ? String(value).slice(0, 10) : '')

// Generic list + form for one API resource. Anyone can view; when canEdit is
// true (admin) the add / edit / delete controls appear. Form values live in
// React state (state management requirement).
export default function CrudManager({ resource, fields, canEdit, renderItem, emptyText }) {
  const blank = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setItems(await api.get(`/api/${resource}`))
      setError('')
    } catch (err) { setError(err.message) }
    setLoading(false)
  }
  useEffect(() => { load() }, [resource])

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const reset = () => { setForm(blank); setEditingId(null) }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const payload = { ...form }
      if (editingId && !payload.password) delete payload.password // keep old password when blank
      editingId ? await api.put(`/api/${resource}/${editingId}`, payload) : await api.post(`/api/${resource}`, payload)
      reset()
      await load()
    } catch (err) { setError(err.message) }
  }

  const startEdit = (item) => {
    setEditingId(item._id)
    setForm(Object.fromEntries(fields.map((f) => [f.name, f.type === 'date' ? toDateInput(item[f.name]) : f.type === 'password' ? '' : item[f.name] ?? ''])))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (item) => {
    if (!window.confirm('Delete this entry?')) return
    try { await api.del(`/api/${resource}/${item._id}`); await load() } catch (err) { setError(err.message) }
  }

  return (
    <div>
      {error && <p className="notice error">{error}</p>}

      {canEdit && (
        <form className="card form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit entry' : 'Add new entry'}</h3>
          <div className="grid">
            {fields.map((f) => (
              <label key={f.name} className={f.type === 'textarea' ? 'full' : ''}>
                {f.label}
                {f.type === 'textarea' ? (
                  <textarea name={f.name} value={form[f.name]} onChange={handleChange} rows="3" />
                ) : f.type === 'select' ? (
                  <select name={f.name} value={form[f.name]} onChange={handleChange} required={f.required}>
                    <option value="">Select…</option>
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input name={f.name} type={f.type || 'text'} value={form[f.name]} onChange={handleChange}
                    required={f.required && !(editingId && f.type === 'password')} />
                )}
              </label>
            ))}
          </div>
          <div className="row">
            <button className="btn" type="submit">{editingId ? 'Save changes' : 'Add'}</button>
            {editingId && <button className="btn ghost" type="button" onClick={reset}>Cancel</button>}
          </div>
        </form>
      )}

      {loading ? <p>Loading…</p> : items.length === 0 ? <p>{emptyText}</p> : (
        <div className="cards">
          {items.map((item, index) => (
            <div key={item._id} className="card item">
              {renderItem(item, index)}
              {canEdit && (
                <div className="row">
                  <button className="btn small ghost" onClick={() => startEdit(item)}>Edit</button>
                  <button className="btn small danger" onClick={() => handleDelete(item)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
