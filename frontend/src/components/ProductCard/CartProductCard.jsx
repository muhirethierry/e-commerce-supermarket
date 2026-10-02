import ProductCard from './ProductCard'
import { useCart } from '../../context/CartContext'

function CartProductCard({ product }) {
  const { addItem } = useCart()

  function handleClick(event) {
    if (event.target.closest('.product-add-button')) {
      addItem(product)
    }
  }

  return (
    <div className="product-card-wrapper" onClick={handleClick}>
      <ProductCard product={product} />
    </div>
  )
}

export default CartProductCard