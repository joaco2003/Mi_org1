import { AuthProvider } from './auth/AuthProvider.jsx'
import { useAuth } from './auth/context.js'
import Login from './components/Login.jsx'
import Organizador from './components/Organizador.jsx'
import { DataProvider } from './data/DataProvider.jsx'

// El "portero": sin sesión iniciada no se ve nada de la app.
function Gate() {
  const { user, loading } = useAuth()

  if (loading) return <div className="splash">Cargando…</div>
  if (!user) return <Login />

  // key={uid}: si cambia la cuenta, los datos de la anterior se descartan por completo.
  return (
    <DataProvider key={user.uid} uid={user.uid}>
      <Organizador />
    </DataProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}
