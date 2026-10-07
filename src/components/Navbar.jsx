import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo" onClick={close}>Shop<span>Ease</span></Link>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/#products" onClick={close}>Products</NavLink>
          <NavLink to="/cart" onClick={close} className="cart-link">
            Cart
            <span className="badge" aria-label={`${itemCount} items in cart`}>{itemCount}</span>
          </NavLink>
        </nav>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
