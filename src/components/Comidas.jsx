import { Fragment, useState } from 'react'
import { useData } from '../data/context.js'
import { COMIDAS, DIAS, DIAS_CORTOS, todayIndex } from '../lib/utils.js'

export default function Comidas() {
  const { data, update } = useData()
  const [item, setItem] = useState('')
  const hoy = todayIndex()

  // ---- Menú semanal: filas = comidas, columnas = días ----
  function setMeal(key, value) {
    update((d) => ({ meals: { ...d.meals, [key]: value } }))
  }

  // ---- Lista de la compra ----
  function addItem(e) {
    e.preventDefault()
    const text = item.trim()
    if (!text) return
    update((d) => ({ shoppingList: [...d.shoppingList, { id: Date.now(), text, done: false }] }))
    setItem('')
  }
  function toggleItem(id) {
    update((d) => ({
      shoppingList: d.shoppingList.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
    }))
  }
  function deleteItem(id) {
    update((d) => ({ shoppingList: d.shoppingList.filter((i) => i.id !== id) }))
  }
  function clearDone() {
    update((d) => ({ shoppingList: d.shoppingList.filter((i) => !i.done) }))
  }

  const hayTildados = data.shoppingList.some((i) => i.done)

  return (
    <section className="panel active">
      <div className="section-title">Planificador de comidas</div>

      <div className="meal-scroll">
        <div className="meal-grid">
          <div className="mg-corner" />
          {DIAS_CORTOS.map((d, i) => (
            <div key={d} className={'mg-head' + (i === hoy ? ' today' : '')}>
              {d}
            </div>
          ))}

          {COMIDAS.map((comida) => (
            <Fragment key={comida}>
              <div className="mg-meal">{comida}</div>
              {DIAS.map((dia, i) => {
                const key = `${dia}-${comida}`
                return (
                  <div key={key} className={'mg-cell' + (i === hoy ? ' today' : '')}>
                    <textarea
                      value={data.meals[key] || ''}
                      onChange={(e) => setMeal(key, e.target.value)}
                      placeholder="…"
                      aria-label={`${comida} del ${dia}`}
                    />
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="comida-extra">
        <div className="block">
          <div className="block-head">
            <div className="section-title" style={{ fontSize: 18, margin: 0, border: 'none', padding: 0 }}>
              Lista de la compra
            </div>
            {hayTildados && (
              <button type="button" className="ghost-btn" onClick={clearDone}>
                Limpiar tildados
              </button>
            )}
          </div>

          <form className="inline" onSubmit={addItem}>
            <input
              type="text"
              placeholder="¿Qué te falta comprar?"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
            <button type="submit">Agregar</button>
          </form>

          <ul className="list">
            {data.shoppingList.length === 0 && (
              <li className="empty">Lista vacía. Anotá lo que necesitás comprar.</li>
            )}
            {data.shoppingList.map((i) => (
              <li key={i.id} className={'task' + (i.done ? ' done' : '')}>
                <input type="checkbox" checked={i.done} onChange={() => toggleItem(i.id)} />
                <div className="desc">{i.text}</div>
                <button className="del" title="Borrar" onClick={() => deleteItem(i.id)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="block">
          <div className="section-title" style={{ fontSize: 18 }}>
            Notas
          </div>
          <textarea
            className="notes-paper"
            value={data.mealNotes}
            onChange={(e) => update(() => ({ mealNotes: e.target.value }))}
            placeholder="Recetas para probar, ideas, cosas para no olvidar…"
            aria-label="Notas de comidas"
          />
        </div>
      </div>
    </section>
  )
}
