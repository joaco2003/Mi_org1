import { useState } from 'react'
import { useTasks } from '../data/useTasks.js'
import { todayISO } from '../lib/utils.js'
import TaskItem from './TaskItem.jsx'

export default function DiaADia() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()
  const [text, setText] = useState('')
  const [date, setDate] = useState(todayISO)

  function submit(e) {
    e.preventDefault()
    addTask(text, date)
    setText('')
  }

  const sorted = [...tasks].sort((a, b) => (a.date || '').localeCompare(b.date || ''))

  return (
    <section className="panel active">
      <div className="section-title">Día a día</div>

      <form className="inline" onSubmit={submit}>
        <input
          type="text"
          placeholder="¿Qué tenés que hacer?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>

      <ul className="list">
        {sorted.length === 0 && <li className="empty">No tenés tareas cargadas todavía.</li>}
        {sorted.map((t) => (
          <TaskItem key={t.id} task={t} showDate onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </ul>
    </section>
  )
}
