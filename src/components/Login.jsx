import { useState } from 'react'
import { useAuth } from '../auth/context.js'
import { authErrorMessage } from '../auth/errors.js'
import { isFirebaseConfigured } from '../lib/firebase.js'

const COPY = {
  login: { title: 'Hola de nuevo,', sub: 'ingresá para ver tu organizador.', button: 'Ingresar' },
  signup: { title: 'Creá tu cuenta,', sub: 'así tus datos quedan guardados y son solo tuyos.', button: 'Crear cuenta' },
  reset: { title: 'Recuperá tu acceso,', sub: 'te mandamos un link para elegir una contraseña nueva.', button: 'Enviar link' },
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

export default function Login() {
  const { signIn, signUp, signInGoogle, resetPassword } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup' | 'reset'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const copy = COPY[mode]
  const disabled = busy || !isFirebaseConfigured

  function changeMode(next) {
    setMode(next)
    setError('')
    setInfo('')
  }

  async function run(action) {
    setError('')
    setInfo('')
    setBusy(true)
    try {
      await action()
    } catch (e) {
      setError(authErrorMessage(e))
    } finally {
      setBusy(false)
    }
  }

  function submit(e) {
    e.preventDefault()
    if (mode === 'login') return run(() => signIn(email.trim(), password))
    if (mode === 'signup') return run(() => signUp(name.trim(), email.trim(), password))
    return run(async () => {
      await resetPassword(email.trim())
      // Mismo mensaje exista o no la cuenta: así nadie puede averiguar quién tiene cuenta.
      setInfo('Si ese email tiene una cuenta, te enviamos un link. Revisá también la carpeta de spam.')
    })
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="brand">Mi Organizador</div>
        <h1 className="hero login-hero">{copy.title}</h1>
        <p className="sub">{copy.sub}</p>

        {!isFirebaseConfigured && (
          <div className="notice" role="status">
            <strong>Falta conectar Firebase.</strong> Copiá <code>.env.example</code> como{' '}
            <code>.env</code>, pegá tus claves y reiniciá <code>npm run dev</code>. Mientras tanto
            los botones están desactivados.
          </div>
        )}

        {mode !== 'reset' && (
          <>
            <button type="button" className="google-btn" disabled={disabled} onClick={() => run(signInGoogle)}>
              <GoogleIcon />
              Continuar con Google
            </button>
            <div className="or">
              <span>o con tu email</span>
            </div>
          </>
        )}

        <form className="login-form" onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              Nombre
              <input type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          )}
          <label>
            Email
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          {mode !== 'reset' && (
            <label>
              Contraseña
              <input
                type="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                minLength={mode === 'signup' ? 6 : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          )}

          {error && (
            <p className="login-msg error" role="alert">
              {error}
            </p>
          )}
          {info && (
            <p className="login-msg info" role="status">
              {info}
            </p>
          )}

          <button type="submit" className="primary-btn" disabled={disabled}>
            {busy ? 'Un momento…' : copy.button}
          </button>
        </form>

        <div className="login-links">
          {mode === 'login' && (
            <>
              <button type="button" className="ghost-btn" onClick={() => changeMode('signup')}>
                Crear una cuenta
              </button>
              <button type="button" className="ghost-btn" onClick={() => changeMode('reset')}>
                Olvidé mi contraseña
              </button>
            </>
          )}
          {mode !== 'login' && (
            <button type="button" className="ghost-btn" onClick={() => changeMode('login')}>
            ← Volver a ingresar
            </button>
        )}
        </div>
    </div>
    </div>
)
}