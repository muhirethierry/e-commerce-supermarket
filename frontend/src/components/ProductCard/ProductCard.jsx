function ProductCard({ product }) {
  return (
    <article className="product-card">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />

        <button
          className="product-wishlist"
          aria-label={`Add ${product.name} to wishlist`}
        >
          ♡
        </button>
      </div>

      <div className="product-content">

        <span className="product-category">
          {product.subcategory}
        </span>

        <h3>{product.name}</h3>

        <div className="product-info">
          <strong>
            {product.price.toLocaleString()} RWF
          </strong>

          <span>/ {product.unit}</span>
        </div>

        <p className="product-stock">
          {product.stock > 0
            ? `${product.stock} in stock`
            : 'Out of stock'}
        </p>

        <button
          className="product-add-button"
          disabled={product.stock === 0}
        >
          🛒 Add to Cart
        </button>

      </div>

    </article>
  )
}

export default ProductCard