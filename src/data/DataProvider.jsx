import { useCallback, useEffect, useState } from 'react'
import { DataContext } from './context.js'

// Misma clave y misma forma de datos que la versión anterior: si abrís la
// app React en el mismo navegador/origen, tus datos viejos se leen igual.
const STORAGE_KEY = 'organizador:data'

const EMPTY = {
  transactions: [],
  tasks: [],
  meals: {}, // { "Lunes-Desayuno": "texto" }
  shoppingList: [], // [{ id, text, done }]
  mealNotes: '',
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...EMPTY, ...JSON.parse(raw) }
  } catch (e) {
    console.warn('No se pudieron leer los datos guardados, empiezo de cero.', e)
  }
  return EMPTY
}

// ESTE es el único archivo que sabe dónde se guardan los datos.
// En el paso 3 lo cambiamos por Firestore y el resto de la app ni se entera.
export function DataProvider({ children }) {
  const [data, setData] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Error guardando en localStorage', e)
    }
  }, [data])

  // update recibe una función que devuelve SOLO lo que cambia.
  const update = useCallback((fn) => {
    setData((prev) => ({ ...prev, ...fn(prev) }))
  }, [])

  return <DataContext.Provider value={{ data, update }}>{children}</DataContext.Provider>
}
