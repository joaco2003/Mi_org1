import { TABS } from '../lib/tabs.js'

// La franja vertical de la derecha, con las 5 secciones.
export default function Rail({ tab, setTab }) {
  return (
    <div className="rail">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={'rail-btn' + (tab === t.id ? ' active' : '')}
          onClick={() => setTab(t.id)}
        >
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  )
}
