import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//アプリ本体
import App from './App.jsx'

//グローバルCSS
import './index.css'

//Leafletの地図表示用CSS
import 'leaflet/dist/leaflet.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
