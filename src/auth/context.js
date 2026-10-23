import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

// const { user, loading, signIn, signUp, signInGoogle, resetPassword, logout } = useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth tiene que usarse dentro de <AuthProvider>')
  return ctx
}