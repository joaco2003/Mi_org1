# Mi Organizador (React + Vite)

## Cómo correrlo

```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
```

Otros comandos:

```bash
npm run build    # genera la carpeta dist/ lista para publicar
npm run preview  # prueba esa versión compilada
npm run lint     # revisa el código
```

## Estructura

```
src/
├── main.jsx            # arranque
├── App.jsx             # elige qué pantalla mostrar
├── styles.css          # todo el diseño
├── lib/                # utilidades y lista de secciones
├── data/
│   ├── DataProvider.jsx  # ÚNICO lugar que guarda/carga datos (hoy: localStorage)
│   ├── context.js        # el hook useData()
│   └── useTasks.js       # lógica de tareas (la usan Día a día y Calendario)
└── components/         # una pantalla por archivo
```

## Pasar tus datos de la versión anterior

El navegador guarda los datos por dirección (puerto incluido), así que la app nueva
arranca vacía. Para traer lo que ya cargaste:

1. En la app vieja (Live Server), abrí la consola (F12) y ejecutá:
   `copy(localStorage.getItem('organizador:data'))`
2. En la app nueva (localhost:5173), abrí la consola y ejecutá:
   `localStorage.setItem('organizador:data', 'PEGÁ_ACÁ_LO_COPIADO')`
   (con comillas simples alrededor) y recargá la página.
