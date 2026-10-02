import { useState } from 'react'
import { useCart } from '../../context/CartContext'

function Checkout() {
	const { items, subtotal } = useCart()
	const [isComplete, setIsComplete] = useState(false)
	const [paymentMethod, setPaymentMethod] = useState('mobile-money')
	const paymentLabels = {
		'mobile-money': 'Mobile Money (MTN MoMo / Airtel Money)',
		card: 'Card (Visa / Mastercard)',
		cash: 'Cash on delivery',
	}

	function handleSubmit(event) {
		event.preventDefault()
		setIsComplete(true)
	}

	if (isComplete) {
		return (
			<main className="checkout-page">
				<section className="checkout-confirmation" aria-live="polite">
					<span>CHECKOUT PREVIEW</span>
					<h1>Your checkout details are ready.</h1>
					<p>Selected payment method: <strong>{paymentLabels[paymentMethod]}</strong>. This preview did not create an order or take payment, and your basket has been kept.</p>
					<a href="/cart">Return to your basket</a>
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
					<button type="submit">Preview checkout</button>
					<p>Preview only. No order is placed and no payment is processed. Delivery charges and final totals require live store data.</p>
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
