import { useState } from 'react'
import { useTasks } from '../data/useTasks.js'
import { DIAS_CORTOS, capitalize, toISO, todayISO } from '../lib/utils.js'
import TaskItem from './TaskItem.jsx'

export default function Calendario() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()
  const [view, setView] = useState(() => {
    const n = new Date()
    return { y: n.getFullYear(), m: n.getMonth() }
  })
  const [selected, setSelected] = useState(null)
  const [text, setText] = useState('')

  // Se arma la fecha desde el día 1, así no se "saltean" meses
  // (ej: desde el 31 de enero, "mes siguiente" no cae en marzo).
  function shiftMonth(delta) {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  const monthLabel = capitalize(
    new Date(view.y, view.m, 1).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' }),
  )
  const startOffset = (new Date(view.y, view.m, 1).getDay() + 6) % 7 // lunes = 0
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
  const today = todayISO()

  const countByDate = {}
  tasks.forEach((t) => {
    countByDate[t.date] = (countByDate[t.date] || 0) + 1
  })

  const dayTasks = selected ? tasks.filter((t) => t.date === selected) : []

  function submit(e) {
    e.preventDefault()
    if (!selected) return
    addTask(text, selected)
    setText('')
  }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(<div key={`e${i}`} className="cal-day empty" />)
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toISO(new Date(view.y, view.m, day))
    const count = Math.min(countByDate[iso] || 0, 4)
    const cls = 'cal-day' + (iso === today ? ' today' : '') + (iso === selected ? ' selected' : '')
    cells.push(
      <div key={iso} className={cls} onClick={() => setSelected(iso)}>
        <div className="num">{day}</div>
        <div className="dots">
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className="dot" />
          ))}
        </div>
      </div>,
    )
  }

  const selectedTitle = selected
    ? capitalize(
        new Date(selected + 'T00:00:00').toLocaleDateString('es-AR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        }),
      )
    : 'Elegí un día del calendario'

  return (
    <section className="panel active">
      <div className="section-title">Calendario</div>

      <div className="cal-header">
        <button type="button" onClick={() => shiftMonth(-1)} aria-label="Mes anterior">
          ‹
        </button>
        <div className="cal-month-label">{monthLabel}</div>
        <button type="button" onClick={() => shiftMonth(1)} aria-label="Mes siguiente">
          ›
        </button>
      </div>

      <div className="cal-grid">
        {DIAS_CORTOS.map((d) => (
          <div key={d} className="cal-dow">
            {d}
          </div>
        ))}
        {cells}
      </div>

      <div className="cal-day-detail">
        <div className="section-title" style={{ fontSize: 18 }}>
          {selectedTitle}
        </div>

        {selected && (
          <>
            <form className="inline" onSubmit={submit}>
              <input
                type="text"
                placeholder="¿Qué vas a hacer ese día?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button type="submit">Agregar</button>
            </form>

            <ul className="list">
              {dayTasks.length === 0 && <li className="empty">Nada agendado todavía para este día.</li>}
              {dayTasks.map((t) => (
                <TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
