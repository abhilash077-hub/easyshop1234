import { Link, useNavigate } from 'react-router-dom'
import { useCart, money } from '../context/CartContext.jsx'
import CartItem from '../components/CartItem.jsx'

export default function CartPage() {
  const { cart, dispatch, itemCount, total } = useCart()
  const navigate = useNavigate()

  if (!cart.length) {
    return (
      <div className="empty">
        <div className="empty-icon" aria-hidden="true">🛒</div>
        <h2>Your cart is empty.</h2>
        <Link className="btn" to="/">Start Shopping</Link>
      </div>
    )
  }

  return (
    <>
      <h1 className="section-title">Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {cart.map((item) => <CartItem key={item.product.id} item={item} />)}
        </ul>
        <aside className="summary">
          <h2>Price details</h2>
          <div className="row"><span>Number of items</span><span>{itemCount}</span></div>
          <div className="row"><span>Subtotal</span><span>{money(total)}</span></div>
          <div className="row total"><span>Total</span><span>{money(total)}</span></div>
          <button className="btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          <Link className="btn btn-outline" to="/">Continue Shopping</Link>
          <button className="btn btn-danger" onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
        </aside>
      </div>
    </>
  )
}
