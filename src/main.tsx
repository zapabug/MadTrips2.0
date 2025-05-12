import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// BrowserRouter import is no longer needed here if App.tsx handles it.
// import { BrowserRouter } from 'react-router-dom'; 
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter> Removed */}
      <App />
    {/* </BrowserRouter> Removed */}
  </StrictMode>,
)
