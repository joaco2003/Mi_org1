import { useCallback, useEffect, useState } from 'react'
import { DataContext } from './context.js'

// Cada cuenta guarda en su propia clave, así dos personas que usan el mismo
// navegador no ven los datos de la otra.
const LEGACY_KEY = 'organizador:data' // la clave de antes de existir el login
const keyFor = (uid) => `organizador:data:${uid}`

const EMPTY = {
  transactions: [],
  tasks: [],
  meals: {}, // { "Lunes-Desayuno": "texto" }
  shoppingList: [], // [{ id, text, done }]
  mealNotes: '',
}

function load(uid) {
  try {
    const key = keyFor(uid)
    let raw = localStorage.getItem(key)
    if (!raw) {
      // Datos cargados antes del login: los hereda la primera cuenta que entra
      // y se MUEVEN (no se copian), para que no los herede nadie más.
      const legacy = localStorage.getItem(LEGACY_KEY)
      if (legacy) {
        localStorage.setItem(key, legacy)
        localStorage.removeItem(LEGACY_KEY)
        raw = legacy
      }
    }
    if (raw) return { ...EMPTY, ...JSON.parse(raw) }
  } catch (e) {
    console.warn('No se pudieron leer los datos guardados, empiezo de cero.', e)
  }
  return EMPTY
}

// ESTE es el único archivo que sabe dónde se guardan los datos.
// En el paso 3 lo cambiamos por Firestore y el resto de la app ni se entera.
export function DataProvider({ uid, children }) {
  const [data, setData] = useState(() => load(uid))

  useEffect(() => {
    try {
      localStorage.setItem(keyFor(uid), JSON.stringify(data))
    } catch (e) {
      console.error('Error guardando en localStorage', e)
    }
  }, [data, uid])

  // update recibe una función que devuelve SOLO lo que cambia.
  const update = useCallback((fn) => {
    setData((prev) => ({ ...prev, ...fn(prev) }))
  }, [])

  return <DataContext.Provider value={{ data, update }}>{children}</DataContext.Provider>
}
