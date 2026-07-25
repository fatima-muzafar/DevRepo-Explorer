import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../config/firebase'
import { login as loginUser, logout as logoutUser, register as registerUser } from '../services/authService'

interface AuthContextValue {
  currentUser: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    await loginUser(email, password)
  }

  const register = async (email: string, password: string) => {
    await registerUser(email, password)
  }

  const logout = async () => {
    await logoutUser()
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      loading,
      login,
      register,
      logout,
    }),
    [currentUser, loading],
  )

  return <AuthContext.Provider value={value}>{!loading ? children : null}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default AuthContext
