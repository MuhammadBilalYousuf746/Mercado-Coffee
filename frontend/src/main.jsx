import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext' // Check this import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* Ye yahan hona lazmi hai */}
      <App />
    </CartProvider>
  </StrictMode>,
)