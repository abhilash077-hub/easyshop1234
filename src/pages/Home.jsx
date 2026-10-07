import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import Loading from '../components/Loading.jsx'
import { useProducts } from '../useProducts.js'

const SORTS = {
  default: 'Default',
  low: 'Price: Low to High',
  high: 'Price: High to Low',
  az: 'Name: A-Z',
  za: 'Name: Z-A',
}
const label = (c) => c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)

export default function Home() {
  const { products, loading, error, retry } = useProducts()
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [query, setQuery] = useState('')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#products') document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }, [hash, loading])

  const categories = useMemo(() => ['all', ...new Set(products.map((p) => p.category))], [products])
  const featured = useMemo(() => [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4), [products])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter((p) =>
      (category === 'all' || p.category === category) && (!q || p.title.toLowerCase().includes(q)))
    const s = [...list]
    if (sort === 'low') s.sort((a, b) => a.price - b.price)
    if (sort === 'high') s.sort((a, b) => b.price - a.price)
    if (sort === 'az') s.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'za') s.sort((a, b) => b.title.localeCompare(a.title))
    return s
  }, [products, category, sort, query])

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">New season · Early bird deals live</p>
          <h1>Style made simple. Shop your look.</h1>
          <p className="hero-sub">Fresh fashion, jewellery and gadgets — order in a few taps, no more DMs.</p>
          <a className="btn btn-light" href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Shop Now</a>
        </div>
      </section>

      {loading ? <Loading /> : (
        <>
          {error && (
            <div className="alert" role="alert">
              <span>Unable to load products. Please try again.</span>
              <button className="btn btn-small" onClick={retry}>Retry</button>
            </div>
          )}

          <section aria-labelledby="feat">
            <h2 id="feat" className="section-title">Featured for you ✨</h2>
            <ProductGrid products={featured} />
          </section>

          <section id="products" aria-labelledby="cat-title">
            <h2 id="cat-title" className="section-title">Product catalogue</h2>
            <div className="toolbar">
              <input type="search" className="input" placeholder="Search products" aria-label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
              <select className="input" aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="chips" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button key={c} className={`chip ${c === category ? 'active' : ''}`} aria-pressed={c === category} onClick={() => setCategory(c)}>
                  {label(c)}
                </button>
              ))}
            </div>
            <ProductGrid products={visible} />
          </section>
        </>
      )}
    </>
  )
}
