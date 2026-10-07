import { Link } from 'react-router-dom'
import { useCart, money } from '../context/CartContext.jsx'

export const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="600"><rect width="100%" height="100%" fill="#ede9fe"/><text x="50%" y="50%" fill="#7c3aed" font-size="28" font-family="sans-serif" text-anchor="middle">ShopEase</text></svg>'
)

export default function ProductCard({ product }) {
  const { dispatch } = useCart()
  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card-img" aria-label={`View ${product.title}`}>
        <img src={product.image} alt={product.title} loading="lazy" onError={(e) => { e.currentTarget.src = PLACEHOLDER }} />
      </Link>
      <div className="card-body">
        <span className="cat">{product.category}</span>
        <h3 title={product.title}>{product.title}</h3>
        <div className="rating">★ {product.rating.rate} <small>({product.rating.count})</small></div>
        <p className="price">{money(product.price)}</p>
        <div className="card-actions">
          <Link className="btn btn-outline" to={`/product/${product.id}`}>View Details</Link>
          <button className="btn" onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } })}>Add to Cart</button>
        </div>
      </div>
    </article>
  )
}
