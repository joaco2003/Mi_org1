import { useData } from './context.js'
import { todayISO } from '../lib/utils.js'

// Las tareas las usan "Día a día" y "Calendario": la lógica vive acá, una sola vez.
export function useTasks() {
  const { data, update } = useData()

  function addTask(text, date) {
    const clean = text.trim()
    if (!clean) return
    update((d) => ({
      tasks: [{ id: Date.now(), text: clean, date: date || todayISO(), done: false }, ...d.tasks],
    }))
  }

  function toggleTask(id) {
    update((d) => ({ tasks: d.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) }))
  }

  function deleteTask(id) {
    update((d) => ({ tasks: d.tasks.filter((t) => t.id !== id) }))
  }

  return { tasks: data.tasks, addTask, toggleTask, deleteTask }
}
