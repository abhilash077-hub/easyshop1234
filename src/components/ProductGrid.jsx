import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  if (!products.length) return <div className="empty"><h3>No products found</h3><p>Try a different category or search.</p></div>
  return (
    <div className="grid">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
