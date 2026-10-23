import { useState } from 'react'
import { useAuth } from '../auth/context.js'
import { firstName } from '../lib/utils.js'

export default function Masthead({ tab, setTab }) {
  const { user, logout } = useAuth()
  const [now] = useState(() => new Date())
  const month = now.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '')

  return (
    <div className="masthead">
      <div className="brand">Mi Organizador</div>
      <nav className="top-nav">
        <button className={tab === 'inicio' ? 'active' : ''} onClick={() => setTab('inicio')}>
          ⌂ Índice
        </button>
        <button className={tab === 'calendario' ? 'active' : ''} onClick={() => setTab('calendario')}>
          ▦ Calendario
        </button>
      </nav>
      <div className="masthead-right">
        <span className="user-name">{firstName(user)}</span>
        <button type="button" className="ghost-btn" onClick={logout}>
          Salir
        </button>
        <div className="seal">{`${now.getDate()}\n${month}`}</div>
      </div>
    </div>
  )
}
