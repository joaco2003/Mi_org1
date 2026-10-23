import { useState } from 'react'
import { useData } from '../data/context.js'
import { fmtDateLabel, fmtMoney, getTotals, todayISO } from '../lib/utils.js'

export default function Finanzas() {
  const { data, update } = useData()
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('gasto')
  const [category, setCategory] = useState('')

  const { income, expenses, balance } = getTotals(data.transactions)

  function submit(e) {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!desc.trim() || Number.isNaN(value)) return
    update((d) => ({
      transactions: [
        {
          id: Date.now(),
          desc: desc.trim(),
          amount: value,
          type,
          category: category.trim(),
          date: todayISO(),
        },
        ...d.transactions,
      ],
    }))
    setDesc('')
    setAmount('')
    setCategory('')
  }

  function remove(id) {
    update((d) => ({ transactions: d.transactions.filter((t) => t.id !== id) }))
  }

  return (
    <section className="panel active">
      <div className="section-title">Finanzas</div>

      <div className="grid" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="eyebrow">Ingresos</div>
          <div className="big pos">{fmtMoney(income)}</div>
        </div>
        <div className="card">
          <div className="eyebrow">Gastos</div>
          <div className="big neg">{fmtMoney(expenses)}</div>
        </div>
        <div className="card">
          <div className="eyebrow">Balance</div>
          <div className={'big ' + (balance >= 0 ? 'pos' : 'neg')}>{fmtMoney(balance)}</div>
        </div>
      </div>

      <form className="inline" onSubmit={submit}>
        <input type="text" placeholder="Descripción" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        <input
          type="number"
          placeholder="Monto"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>
        <input
          type="text"
          placeholder="Categoría (opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul className="list">
        {data.transactions.length === 0 && (
          <li className="empty">Todavía no cargaste ningún movimiento.</li>
        )}
        {data.transactions.map((t) => (
          <li key={t.id}>
            <div className="desc">
              {t.desc}
              {t.category && <span className="meta"> · {t.category}</span>}
              <span className="meta"> · {fmtDateLabel(t.date)}</span>
            </div>
            <div className={'amt ' + (t.type === 'ingreso' ? 'pos' : 'neg')}>
              {t.type === 'ingreso' ? '+' : '-'}
              {fmtMoney(t.amount)}
            </div>
            <button className="del" title="Borrar" onClick={() => remove(t.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
