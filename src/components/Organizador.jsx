import { useState } from 'react'
import Calendario from './Calendario.jsx'
import Comidas from './Comidas.jsx'
import DiaADia from './DiaADia.jsx'
import Finanzas from './Finanzas.jsx'
import Inicio from './Inicio.jsx'
import Masthead from './Masthead.jsx'
import Rail from './Rail.jsx'

// La app en sí (lo que ve alguien que ya ingresó).
export default function Organizador() {
  const [tab, setTab] = useState('inicio')

  return (
    <div className="app-shell">
      <div className="app">
        <Masthead tab={tab} setTab={setTab} />

        {tab === 'inicio' && <Inicio tab={tab} setTab={setTab} />}
        {tab === 'finanzas' && <Finanzas />}
        {tab === 'dia' && <DiaADia />}
        {tab === 'calendario' && <Calendario />}
        {tab === 'comida' && <Comidas />}

        <div className="footer-note">
          tocá donde quieras para navegar · tus datos se guardan solos en este navegador
        </div>
      </div>

      <Rail tab={tab} setTab={setTab} />
    </div>
  )
}
