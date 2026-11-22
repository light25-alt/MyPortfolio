import { createContext, useContext, useState } from 'react'
import { api, tokenStore } from '../api'

// Global auth state: who is signed in and their role (user | admin).
const AuthContext = createContext(null)
const USER_KEY = 'portfolio_user'

const loadUser = () => {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)

  const signin = async (email, password) => {
    const data = await api.post('/auth/signin', { email, password })
    tokenStore.set(data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const signup = (name, email, password) => api.post('/api/users', { name, email, password })

  const signout = async () => {
    try { await api.get('/auth/signout') } catch { /* ignore network errors */ }
    tokenStore.clear()
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === 'admin', signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
