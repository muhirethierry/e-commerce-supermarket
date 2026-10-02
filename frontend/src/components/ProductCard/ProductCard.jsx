import { ShoppingBasket } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import ProductImage from './ProductImage'

function playAddSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return

  const audioContext = new AudioContextClass()
  const oscillator = audioContext.createOscillator()
  const volume = audioContext.createGain()
  const now = audioContext.currentTime

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(660, now)
  oscillator.frequency.setValueAtTime(880, now + 0.07)
  volume.gain.setValueAtTime(0.0001, now)
  volume.gain.exponentialRampToValueAtTime(0.08, now + 0.015)
  volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)

  oscillator.connect(volume)
  volume.connect(audioContext.destination)
  oscillator.start(now)
  oscillator.stop(now + 0.19)
  oscillator.addEventListener('ended', () => audioContext.close(), { once: true })
}

function ProductCard({ product }) {
  const { addItem } = useCart()
  const isLowStock = product.stock > 0 && product.stock <= 10

  return (
    <article className="product-card">
      <div className="product-image">
        <ProductImage product={product} />
        {product.stock === 0 && <span className="stock-badge out">Out of stock</span>}
        {isLowStock && <span className="stock-badge low">Only {product.stock} left</span>}
      </div>
      <div className="product-content">
        <span className="product-category">{product.subcategory}</span>
        <h3 className="product-name">
          <a href={`/products/${encodeURIComponent(product.id)}`}>{product.name}</a>
        </h3>
        <a className="product-details-link" href={`/products/${encodeURIComponent(product.id)}`}>
          View details
        </a>
        <div className="product-price">
          <strong>{product.price.toLocaleString()} RWF</strong>
          <span>/ {product.unit}</span>
        </div>
        <div className="product-bottom">
          <span className={`product-stock ${product.stock === 0 ? 'out-of-stock' : isLowStock ? 'low-stock' : ''}`}>
            {product.stock === 0 ? 'Unavailable' : isLowStock ? `Only ${product.stock} left` : 'In stock'}
          </span>
          <button
            className="product-add-button"
            type="button"
            disabled={product.stock === 0}
            onClick={() => {
              addItem(product)
              playAddSound()
            }}
          >
            <ShoppingBasket aria-hidden="true" size={17} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard