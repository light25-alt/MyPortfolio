import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { site } from '../siteConfig'

const empty = { firstname: '', lastname: '', phone: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  // Saves the message through the API, then redirects to the Home page.
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await api.post('/api/contacts', form)
      navigate('/', { state: { flash: 'Thanks! Your message was sent.' } })
    } catch (err) { setError(err.message) }
  }

  return (
    <section>
      <h1>Contact me</h1>
      <div className="two-col">
        <div className="card">
          <h3>Contact information</h3>
          <p><strong>Email:</strong> {site.email}</p>
          <p><strong>Phone:</strong> {site.phone}</p>
          <p><strong>Location:</strong> {site.location}</p>
        </div>
        <form className="card form" onSubmit={handleSubmit}>
          {error && <p className="notice error">{error}</p>}
          <div className="grid">
            <label>First name<input name="firstname" value={form.firstname} onChange={handleChange} required /></label>
            <label>Last name<input name="lastname" value={form.lastname} onChange={handleChange} required /></label>
            <label>Contact number<input name="phone" value={form.phone} onChange={handleChange} /></label>
            <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
            <label className="full">Message<textarea name="message" rows="4" value={form.message} onChange={handleChange} /></label>
          </div>
          <button className="btn" type="submit">Send message</button>
        </form>
      </div>
    </section>
  )
}
