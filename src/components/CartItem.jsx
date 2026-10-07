import { Link } from 'react-router-dom'
import { useCart, money } from '../context/CartContext.jsx'
import { PLACEHOLDER } from './ProductCard.jsx'

export default function CartItem({ item }) {
  const { dispatch } = useCart()
  const { product, quantity } = item
  return (
    <li className="cart-item">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} onError={(e) => { e.currentTarget.src = PLACEHOLDER }} />
      </Link>
      <div className="ci-info">
        <h3>{product.title}</h3>
        <p className="muted">{money(product.price)} each</p>
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: product.id })}>−</button>
          <span aria-live="polite">{quantity}</span>
          <button aria-label="Increase quantity" onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: product.id })}>+</button>
        </div>
      </div>
      <div className="ci-side">
        <strong>{money(product.price * quantity)}</strong>
        <button className="link-btn" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product.id })}>Remove</button>
      </div>
    </li>
  )
}
