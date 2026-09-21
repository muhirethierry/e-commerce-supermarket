import products from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'

function Products() {
  return (
    <main className="products-page">

      <div className="products-heading">
        <div>
          <span>FRESH & QUALITY</span>

          <h1>Our Products</h1>

          <p>
            Discover fresh groceries and everyday essentials
            for your home.
          </p>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </main>
  )
}

export default Products