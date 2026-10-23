import { useState } from 'react'
import { DataProvider } from './data/DataProvider.jsx'
import Calendario from './components/Calendario.jsx'
import Comidas from './components/Comidas.jsx'
import DiaADia from './components/DiaADia.jsx'
import Finanzas from './components/Finanzas.jsx'
import Inicio from './components/Inicio.jsx'
import Masthead from './components/Masthead.jsx'
import Rail from './components/Rail.jsx'

export default function App() {
  const [tab, setTab] = useState('inicio')

  return (
    <DataProvider>
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
    </DataProvider>
  )
}
