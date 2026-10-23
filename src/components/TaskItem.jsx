import { fmtDateLabel } from '../lib/utils.js'

// Una tarea con su checkbox y su botón de borrar. La usan "Día a día" y "Calendario".
export default function TaskItem({ task, showDate = false, onToggle, onDelete }) {
  return (
    <li className={'task' + (task.done ? ' done' : '')}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <div className="desc">{task.text}</div>
      {showDate && <div className="meta">{fmtDateLabel(task.date)}</div>}
      <button className="del" title="Borrar" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  )
}
