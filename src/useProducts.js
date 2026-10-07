import { useCallback, useEffect, useState } from 'react'
import fallback from './data/products.json'

let cache = null

export function useProducts() {
  const [products, setProducts] = useState(cache || [])
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    setError(false)
    fetch('https://fakestoreapi.com/products')
      .then((r) => { if (!r.ok) throw new Error('bad response'); return r.json() })
      .then((data) => {
        cache = data.map((p) => ({ ...p, price: Math.round(p.price * 80) }))
        setProducts(cache)
      })
      .catch(() => { setError(true); setProducts(fallback) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { if (!cache) load() }, [load])
  return { products, loading, error, retry: load }
}
