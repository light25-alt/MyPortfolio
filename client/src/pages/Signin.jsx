import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { signin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await signin(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/')
    } catch (err) { setError(err.message) }
  }

  return (
    <section className="narrow">
      <h1>Sign in</h1>
      <form className="card form" onSubmit={handleSubmit}>
        {error && <p className="notice error">{error}</p>}
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <button className="btn" type="submit">Sign in</button>
        <p>No account? <Link to="/signup">Sign up</Link></p>
      </form>
    </section>
  )
}
