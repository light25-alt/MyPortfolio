import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Route guard: only signed-in admins may see the wrapped page.
export default function RequireAdmin({ children }) {
  const { user, isAdmin } = useAuth()
  if (!user) return <Navigate to="/signin" replace />
  return isAdmin ? children : <p className="notice error">Admin access required.</p>
}
