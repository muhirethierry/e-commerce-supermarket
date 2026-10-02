import { useState } from 'react'
import { ArrowLeft, ShoppingBasket } from 'lucide-react'
import products from '../../data/products'
import { useCart } from '../../context/CartContext'
import ProductImage from '../../components/ProductCard/ProductImage'

function ProductDetails({ productId }) {
	const product = products.find((item) => String(item.id) === productId)
	const { addItem } = useCart()
	const [added, setAdded] = useState(false)

	if (!product) {
		return (
			<main className="product-detail-page">
				<div className="no-products">
					<h1>Product not found</h1>
					<p>This item may have been removed or the link may be incorrect.</p>
					<a className="product-detail-back" href="/products">Browse products</a>
				</div>
			</main>
		)
	}

	return (
		<main className="product-detail-page">
			<a className="product-detail-back" href="/products"><ArrowLeft aria-hidden="true" size={16} />Back to products</a>
			<div className="product-detail-layout">
				<div className="product-detail-image"><ProductImage product={product} /></div>
				<section className="product-detail-info" aria-labelledby="product-detail-title">
					<span className="product-detail-category">{product.category} / {product.subcategory}</span>
					<h1 id="product-detail-title">{product.name}</h1>
					<p className="product-detail-price">{product.price.toLocaleString()} RWF <span>/ {product.unit}</span></p>
					<p className="product-detail-stock">{product.stock > 0 ? `${product.stock} available in this demo catalog` : 'Currently unavailable'}</p>
					<p className="product-detail-note">Product information and availability shown here are sample storefront data and may change when live catalog services are connected.</p>
					<button
						className="product-detail-add"
						type="button"
						disabled={product.stock === 0}
						onClick={() => {
							addItem(product)
							setAdded(true)
						}}
					>
						<ShoppingBasket aria-hidden="true" size={18} />
						{product.stock === 0 ? 'Unavailable' : 'Add to basket'}
					</button>
					{added && <p className="product-detail-added" role="status">Added to your basket.</p>}
					<a className="product-detail-cart-link" href="/cart">View basket</a>
				</section>
			</div>
		</main>
	)
}

export default ProductDetails