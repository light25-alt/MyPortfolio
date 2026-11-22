import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { signup, signin } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await signup(form.name, form.email, form.password)
      await signin(form.email, form.password) // sign in straight after registering
      navigate('/')
    } catch (err) { setError(err.message) }
  }

  return (
    <section className="narrow">
      <h1>Sign up</h1>
      <form className="card form" onSubmit={handleSubmit}>
        {error && <p className="notice error">{error}</p>}
        <label>Name<input name="name" value={form.name} onChange={handleChange} required /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        <label>Password (min 6 characters)<input name="password" type="password" minLength="6" value={form.password} onChange={handleChange} required /></label>
        <button className="btn" type="submit">Create account</button>
        <p>Already registered? <Link to="/signin">Sign in</Link></p>
      </form>
    </section>
  )
}
