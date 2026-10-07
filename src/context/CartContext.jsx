import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const KEY = 'shopease-cart'
const CartContext = createContext(null)

export const money = (n) => '₹' + Number(n).toLocaleString('en-IN')

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload
      const found = state.find((i) => i.product.id === product.id)
      if (found) return state.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      return [...state, { product, quantity }]
    }
    case 'REMOVE_FROM_CART':
      return state.filter((i) => i.product.id !== action.payload)
    case 'INCREASE_QUANTITY':
      return state.map((i) => i.product.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i)
    case 'DECREASE_QUANTITY':
      return state
        .map((i) => i.product.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(raw) ? raw.filter((i) => i && i.product && i.quantity > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [], load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(cart)) } catch { /* storage unavailable */ }
  }, [cart])

  // Derived values — never stored in state
  const itemCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart])
  const total = useMemo(() => cart.reduce((s, i) => s + i.product.price * i.quantity, 0), [cart])

  const value = useMemo(() => ({ cart, dispatch, itemCount, total }), [cart, itemCount, total])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
