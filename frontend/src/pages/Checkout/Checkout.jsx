import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { createOrder } from '../../api/catalog'

function Checkout() {
	const { items, subtotal, clearCart } = useCart()
	const [order, setOrder] = useState(null)
	const [paymentMethod, setPaymentMethod] = useState('mobile-money')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const paymentLabels = {
		'mobile-money': 'Mobile Money (MTN MoMo / Airtel Money)',
		card: 'Card (Visa / Mastercard)',
		cash: 'Cash on delivery',
	}

	async function handleSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		setError('')
		setIsSubmitting(true)
		try {
			const result = await createOrder({
				customer: {
					name: formData.get('name'),
					email: formData.get('email'),
					phone: formData.get('phone'),
					address: formData.get('address'),
				},
				paymentMethod,
				items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
			})
			setOrder(result.data)
			clearCart()
		} catch (requestError) {
			setError(requestError.message)
		} finally {
			setIsSubmitting(false)
		}
	}

	if (order) {
		return (
			<main className="checkout-page">
				<section className="checkout-confirmation" aria-live="polite">
					<span>ORDER RECEIVED</span>
					<h1>Thanks, {order.customerName}.</h1>
					<p>Your order <strong>{order.reference}</strong> has been saved. Payment method: <strong>{paymentLabels[order.paymentMethod]}</strong>. Pay when your order arrives; no online payment was taken.</p>
					<p>Order total: <strong>{order.subtotal.toLocaleString()} RWF</strong>. Delivery charges are not included yet.</p>
					<a href="/products">Continue shopping</a>
				</section>
			</main>
		)
	}

	if (items.length === 0) {
		return (
			<main className="checkout-page">
				<section className="checkout-confirmation">
					<h1>Your cart is empty</h1>
					<p>Add some products before checkout.</p>
					<a href="/products">Browse products</a>
				</section>
			</main>
		)
	}

	return (
		<main className="checkout-page">
			<div className="checkout-heading">
				<span>DELIVERY DETAILS</span>
				<h1>Checkout</h1>
			</div>
			<div className="checkout-layout">
				<form className="checkout-form" onSubmit={handleSubmit}>
					<label>Full name<input name="name" autoComplete="name" required /></label>
					<label>Email address<input name="email" type="email" autoComplete="email" required /></label>
					<label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
					<label>Delivery address<textarea name="address" autoComplete="street-address" rows="3" required /></label>
					<fieldset className="checkout-payment-options">
						<legend>Payment method</legend>
						<label className="checkout-payment-choice">
							<input
								type="radio"
								name="paymentMethod"
								value="mobile-money"
								checked={paymentMethod === 'mobile-money'}
								onChange={(event) => setPaymentMethod(event.target.value)}
							/>
							<span><strong>Mobile Money</strong><small>MTN MoMo or Airtel Money</small></span>
						</label>
						<label className="checkout-payment-choice">
							<input
								type="radio"
								name="paymentMethod"
								value="card"
								checked={paymentMethod === 'card'}
								onChange={(event) => setPaymentMethod(event.target.value)}
							/>
							<span><strong>Card</strong><small>Visa or Mastercard</small></span>
						</label>
						<label className="checkout-payment-choice">
							<input
								type="radio"
								name="paymentMethod"
								value="cash"
								checked={paymentMethod === 'cash'}
								onChange={(event) => setPaymentMethod(event.target.value)}
							/>
							<span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span>
						</label>
					</fieldset>
					<button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Submitting…' : paymentMethod === 'cash' ? 'Place cash-on-delivery order' : 'Continue to payment'}
					</button>
					{error && <p className="checkout-error" role="alert">{error}</p>}
					<p>Cash-on-delivery orders are saved now. Card and Mobile Money need a payment provider before they can be accepted.</p>
				</form>
				<aside className="checkout-summary">
					<h2>Your order</h2>
					{items.map((item) => (
						<div className="checkout-line" key={item.id}>
							<span>{item.name} × {item.quantity}</span>
							<strong>{(item.price * item.quantity).toLocaleString()} RWF</strong>
						</div>
					))}
					<div className="checkout-total"><span>Subtotal</span><strong>{subtotal.toLocaleString()} RWF</strong></div>
				</aside>
			</div>
		</main>
	)
}

export default Checkout
