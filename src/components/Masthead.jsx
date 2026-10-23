import { useState } from 'react'

export default function Masthead({ tab, setTab }) {
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
      <div className="seal">{`${now.getDate()}\n${month}`}</div>
    </div>
  )
}
