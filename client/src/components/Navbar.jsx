import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const links = [
  ['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'],
  ['/education', 'Education'], ['/services', 'Services'], ['/contact', 'Contact']
]

export default function Navbar() {
  const { user, isAdmin, signout } = useAuth()
  const navigate = useNavigate()

  const handleSignout = async () => {
    await signout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand"><Logo /><span>My Portfolio</span></Link>
      <nav>
        {links.map(([path, label]) => (
          <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>
        ))}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="auth-links">
        {user ? (
          <>
            <span className="who">{user.name} ({user.role})</span>
            <button className="btn small" onClick={handleSignout}>Sign out</button>
          </>
        ) : (
          <>
            <Link className="btn small ghost" to="/signin">Sign in</Link>
            <Link className="btn small" to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </header>
  )
}
