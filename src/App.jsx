import { Routes, Route, Link } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import Checkout from './pages/Checkout.jsx'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<div className="empty"><h2>Page not found</h2><Link className="btn" to="/">Go Home</Link></div>} />
        </Routes>
      </main>
    </CartProvider>
  )
}
