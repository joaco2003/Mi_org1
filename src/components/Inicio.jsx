import { useData } from '../data/context.js'
import { TABS } from '../lib/tabs.js'
import { COMIDAS, DIAS, fmtMoney, getTotals, todayIndex, todayISO } from '../lib/utils.js'

const DIRECTORIO = [
  { tab: 'calendario', title: 'Calendario', sub: 'Mes · días · eventos' },
  { tab: 'finanzas', title: 'Finanzas', sub: 'Ingresos · gastos · balance' },
  { tab: 'dia', title: 'Día a día', sub: 'Tareas · agenda' },
  { tab: 'comida', title: 'Comidas', sub: 'Menú · compras · notas' },
]

export default function Inicio({ tab, setTab }) {
  const { data } = useData()

  const { balance } = getTotals(data.transactions)
  const today = todayISO()
  const pendientesHoy = data.tasks.filter((t) => t.date === today && !t.done).length
  const diaHoy = DIAS[todayIndex()]
  const comidasHoy = COMIDAS.filter((c) => (data.meals[`${diaHoy}-${c}`] || '').trim() !== '').length

  return (
    <section className="panel active">
      <div className="inicio-grid">
        <div className="inicio-main">
          <div className="eyebrow">HUB · ÍNDICE</div>
          <h1 className="hero">Bienvenida,</h1>
          <p className="hero-sub">tocá donde quieras para empezar.</p>
          <p className="sub">
            Cada tarjeta de acá es un acceso directo. Usá los botones de abajo o el directorio de la
            derecha para moverte.
          </p>

          <div className="grid" style={{ marginBottom: 8 }}>
            <div className="card">
              <div className="eyebrow">Balance actual</div>
              <div className={'big ' + (balance >= 0 ? 'pos' : 'neg')}>{fmtMoney(balance)}</div>
            </div>
            <div className="card">
              <div className="eyebrow">Tareas de hoy</div>
              <div className="big">{pendientesHoy}</div>
            </div>
            <div className="card">
              <div className="eyebrow">Comidas planeadas hoy</div>
              <div className="big">
                {comidasHoy} / {COMIDAS.length}
              </div>
            </div>
          </div>

          <div className="section-label">SECCIONES</div>
          <div className="pills">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={'pill' + (tab === t.id ? ' active' : '')}
                onClick={() => setTab(t.id)}
              >
                {t.id === 'inicio' ? '+ ' : ''}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="directorio-card">
          <div className="directorio-header">
            <span className="directorio-title">directorio</span>
            <span className="directorio-count">{DIRECTORIO.length} rutas</span>
          </div>
          <div className="directorio-list">
            {DIRECTORIO.map((r, i) => (
              <button key={r.tab} className="directorio-row" onClick={() => setTab(r.tab)}>
                <span className="d-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="d-text">
                  <strong>{r.title}</strong>
                  <small>{r.sub}</small>
                </span>
                <span className="d-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
