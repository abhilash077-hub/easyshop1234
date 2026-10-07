import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart, money } from '../context/CartContext.jsx'

const FIELDS = [
  ['name', 'Full Name', 'text', 'name'],
  ['email', 'Email', 'email', 'email'],
  ['phone', 'Phone Number', 'tel', 'tel'],
  ['address', 'Address', 'text', 'street-address'],
  ['city', 'City', 'text', 'address-level2'],
  ['state', 'State', 'text', 'address-level1'],
  ['pincode', 'Pincode', 'text', 'postal-code'],
]
const EMPTY = { name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' }

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Full name is required.'
  if (!f.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.phone.trim()) e.phone = 'Phone number is required.'
  else if (!/^\d{10}$/.test(f.phone.trim())) e.phone = 'Phone number must be exactly 10 digits.'
  if (!f.address.trim()) e.address = 'Address is required.'
  if (!f.city.trim()) e.city = 'City is required.'
  if (!f.state.trim()) e.state = 'State is required.'
  if (!f.pincode.trim()) e.pincode = 'Pincode is required.'
  else if (!/^\d{6}$/.test(f.pincode.trim())) e.pincode = 'Pincode must be 6 digits.'
  return e
}

export default function Checkout() {
  const { cart, dispatch, total } = useCart()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  if (order) {
    return (
      <div className="success">
        <div className="empty-icon" aria-hidden="true">✅</div>
        <h1>Order placed successfully!</h1>
        <p>Thank you, <strong>{order.name}</strong>. A confirmation will be sent to {order.email}.</p>
        <ul className="order-lines">
          {order.items.map((i) => (
            <li key={i.product.id}><span>{i.product.title} × {i.quantity}</span><span>{money(i.product.price * i.quantity)}</span></li>
          ))}
        </ul>
        <div className="row total"><span>Total amount</span><span>{money(order.total)}</span></div>
        <Link className="btn" to="/">Continue Shopping</Link>
      </div>
    )
  }

  if (!cart.length) {
    return <div className="empty"><h2>Your cart is empty.</h2><Link className="btn" to="/">Start Shopping</Link></div>
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setOrder({ name: form.name.trim(), email: form.email.trim(), items: cart, total })
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <>
      <h1 className="section-title">Checkout</h1>
      <div className="cart-layout">
        <form className="form" onSubmit={onSubmit} noValidate>
          {FIELDS.map(([name, text, type, auto]) => (
            <div key={name} className={`field ${name === 'address' ? 'full' : ''}`}>
              <label htmlFor={name}>{text}</label>
              <input id={name} name={name} type={type} autoComplete={auto} className="input" value={form[name]} onChange={onChange}
                aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} />
              {errors[name] && <span id={`${name}-err`} className="error" role="alert">{errors[name]}</span>}
            </div>
          ))}
          <button type="submit" className="btn full">Place Order</button>
        </form>
        <aside className="summary">
          <h2>Order Summary</h2>
          <ul className="order-lines">
            {cart.map((i) => (
              <li key={i.product.id}>
                <span>{i.product.title}<br /><small className="muted">Qty {i.quantity} · {money(i.product.price)} each</small></span>
                <span>{money(i.product.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="row"><span>Subtotal</span><span>{money(total)}</span></div>
          <div className="row total"><span>Total</span><span>{money(total)}</span></div>
        </aside>
      </div>
    </>
  )
}
