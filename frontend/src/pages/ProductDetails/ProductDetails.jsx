import { useEffect, useState } from 'react'
import { ArrowLeft, ShoppingBasket } from 'lucide-react'
import { getProduct } from '../../api/catalog'
import { useCart } from '../../context/CartContext'
import ProductImage from '../../components/ProductCard/ProductImage'

function ProductDetails({ productId }) {
	const { addItem, isAuthenticated, sessionChecked } = useCart()
	const [product, setProduct] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [added, setAdded] = useState(false)
	const [retryKey, setRetryKey] = useState(0)

	useEffect(() => {
		const controller = new AbortController()
		setIsLoading(true)
		setError(null)

		getProduct(productId, { signal: controller.signal })
			.then((response) => setProduct(response.data))
			.catch((requestError) => {
				if (requestError.name !== 'AbortError') setError(requestError)
			})
			.finally(() => {
				if (!controller.signal.aborted) setIsLoading(false)
			})

		return () => controller.abort()
	}, [productId, retryKey])

	if (isLoading) {
		return <main className="product-detail-page"><div className="products-api-state" role="status">Loading product details…</div></main>
	}

	if (error) {
		return (
			<main className="product-detail-page">
				<div className="no-products">
					<h1>{error.status === 404 ? 'Product not found' : 'Could not load product'}</h1>
					<p>{error.status === 404 ? 'This item may have been removed or the link may be incorrect.' : 'Check that the backend is running, then try again.'}</p>
					{error.status !== 404 && <button className="product-detail-add" type="button" onClick={() => setRetryKey((value) => value + 1)}>Retry</button>}
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
						disabled={product.stock === 0 || !sessionChecked}
						onClick={() => {
							if (addItem(product)) setAdded(true)
						}}
					>
						<ShoppingBasket aria-hidden="true" size={18} />
						{product.stock === 0 ? 'Unavailable' : !sessionChecked ? 'Checking account…' : isAuthenticated ? 'Add to basket' : 'Sign in to add'}
					</button>
					{added && <p className="product-detail-added" role="status">Added to your basket.</p>}
					<a className="product-detail-cart-link" href="/cart">View basket</a>
				</section>
			</div>
		</main>
	)
}

export default ProductDetails