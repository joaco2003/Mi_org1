import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase.js'
import { AuthContext } from './context.js'

// Nos quedamos solo con lo que la app necesita (y un objeto simple hace que
// React se entere cuando cambia, por ejemplo el nombre).
function toUser(u) {
  return u ? { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL } : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // Sin Firebase configurado no hay nada que esperar.
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return undefined
    // Firebase avisa acá al abrir la app (¿ya había sesión?) y en cada login/logout.
    return onAuthStateChanged(auth, (u) => {
      setUser(toUser(u))
      setLoading(false)
    })
  }, [])

  const signIn = useCallback((email, password) => signInWithEmailAndPassword(auth, email, password), [])

  const signUp = useCallback(async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) {
      await updateProfile(cred.user, { displayName: name })
      // Cambiar el nombre no dispara onAuthStateChanged: actualizamos a mano.
      setUser(toUser(auth.currentUser))
    }
  }, [])

  const signInGoogle = useCallback(() => signInWithPopup(auth, googleProvider), [])
  const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email), [])
  const logout = useCallback(() => signOut(auth), [])

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signInGoogle, resetPassword, logout }),
    [user, loading, signIn, signUp, signInGoogle, resetPassword, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
