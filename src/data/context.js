import { createContext, useContext } from 'react'

export const DataContext = createContext(null)

// Cualquier pantalla usa esto para leer y modificar los datos:
//   const { data, update } = useData()
//   update((d) => ({ tasks: [...d.tasks, nueva] }))
export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData tiene que usarse dentro de <DataProvider>')
  return ctx
}
