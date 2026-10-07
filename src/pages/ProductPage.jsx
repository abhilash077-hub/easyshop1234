import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart, money } from '../context/CartContext.jsx'
import { useProducts } from '../useProducts.js'
import Loading from '../components/Loading.jsx'
import { PLACEHOLDER } from '../components/ProductCard.jsx'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const { dispatch } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (loading) return <Loading />
  const product = products.find((p) => String(p.id) === id)
  if (!product) {
    return <div className="empty"><h2>Product not found</h2><p>This product does not exist.</p><Link className="btn" to="/">Back to Products</Link></div>
  }

  const add = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: qty } })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="detail">
      <div className="detail-img"><img src={product.image} alt={product.title} onError={(e) => { e.currentTarget.src = PLACEHOLDER }} /></div>
      <div className="detail-info">
        <span className="cat">{product.category}</span>
        <h1>{product.title}</h1>
        <div className="rating">★ {product.rating.rate} <small>({product.rating.count} reviews)</small></div>
        <p className="price big">{money(product.price)}</p>
        <p className="desc">{product.description}</p>
        <div className="qty-row">
          <label htmlFor="qty">Quantity</label>
          <div className="qty">
            <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span id="qty" aria-live="polite">{qty}</span>
            <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
        </div>
        <div className="card-actions">
          <button className="btn" onClick={add}>{added ? '✓ Added!' : 'Add to Cart'}</button>
          <button className="btn btn-outline" onClick={() => navigate('/#products')}>Back to Products</button>
        </div>
      </div>
    </div>
  )
}
