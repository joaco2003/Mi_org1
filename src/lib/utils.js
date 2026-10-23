// Constantes y funciones chicas que se usan en varias pantallas.

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
export const DIAS_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
export const COMIDAS = ['Desayuno', 'Almuerzo', 'Cena', 'Snacks']

// Fecha en formato AAAA-MM-DD usando la hora LOCAL.
// (La versión anterior usaba toISOString(), que trabaja en UTC: en Argentina,
// después de las 21hs la app creía que ya era el día siguiente.)
export function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayISO() {
  return toISO(new Date())
}

// Lunes = 0 ... Domingo = 6
export function todayIndex() {
  return (new Date().getDay() + 6) % 7
}

export function fmtMoney(n) {
  return '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

export function fmtDateLabel(iso) {
  if (!iso) return 'sin fecha'
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function getTotals(transactions) {
  const income = transactions.filter((t) => t.type === 'ingreso').reduce((a, t) => a + t.amount, 0)
  const expenses = transactions.filter((t) => t.type === 'gasto').reduce((a, t) => a + t.amount, 0)
  return { income, expenses, balance: income - expenses }
}

// "Ana María Pérez" -> "Ana". Sin nombre cargado, usa lo anterior a la @ del email.
export function firstName(user) {
  if (!user) return ''
  const name = (user.displayName || '').trim().split(/\s+/)[0]
  return name || (user.email || '').split('@')[0]
}