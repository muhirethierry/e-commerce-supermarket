import { useCart } from '../../context/CartContext'

function Cart() {
	const { items, subtotal, setQuantity, removeItem } = useCart()

	return (
		<main className="cart-page">
			<div className="cart-heading">
				<span>YOUR BASKET</span>
				<h1>Shopping cart</h1>
				<p>Review your fresh picks before checkout.</p>
			</div>

			{items.length === 0 ? (
				<div className="cart-empty">
					<h2>Your cart is empty</h2>
					<p>Find something fresh for your table.</p>
					<a className="cart-continue" href="/products">Browse products</a>
				</div>
			) : (
				<div className="cart-layout">
					<div className="cart-items">
						{items.map((item) => (
							<article className="cart-item" key={item.id}>
								<img src={item.image} alt={item.name} />
								<div className="cart-item-info">
									<span>{item.subcategory}</span>
									<h2>{item.name}</h2>
									<strong>{item.price.toLocaleString()} RWF / {item.unit}</strong>
								</div>
								<div className="cart-quantity" aria-label={`Quantity for ${item.name}`}>
									<button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
									<span>{item.quantity}</span>
									<button onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity" disabled={item.quantity >= item.stock}>+</button>
								</div>
								<strong className="cart-line-total">{(item.price * item.quantity).toLocaleString()} RWF</strong>
								<button className="cart-remove" onClick={() => removeItem(item.id)}>Remove</button>
							</article>
						))}
					</div>
					<aside className="cart-summary">
						<h2>Order summary</h2>
						<div><span>Subtotal</span><strong>{subtotal.toLocaleString()} RWF</strong></div>
						<div><span>Delivery</span><span>Unavailable in preview</span></div>
						<a href="/checkout" className="cart-checkout">Continue to checkout</a>
						<a href="/products" className="cart-back">Continue shopping</a>
					</aside>
				</div>
			)}
		</main>
	)
}

export default Cart
