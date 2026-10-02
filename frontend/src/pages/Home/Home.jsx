import { useEffect, useState } from 'react'
import Hero from '../../components/Hero/Hero'
import CategoryList from '../../components/CategoryList/CategoryList'
import ProductCard from '../../components/ProductCard/ProductCard'
import products from '../../data/products'

function Home() {
  const dealProducts = products
    .filter((product) => product.category !== 'Alcoholic Drinks')
    .slice(0, 5)
    .map((product, index) => ({
      ...product,
      discount: [15, 20, 25, 18, 30][index] || 10,
    }))

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % dealProducts.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [dealProducts.length])

  const formatPrice = (value) => `${value.toLocaleString()} RWF`

  return (
    <div>
      <main>
        <Hero />

        <section className="promo-showcase">
          <div className="section-heading promo-heading">
            <div>
              <span>SAMPLE OFFERS</span>
              <h2>Example discounts for the storefront preview</h2>
            </div>
            <a href="/products">Shop all deals</a>
          </div>

          <div className="promo-slider">
            {dealProducts.map((product, index) => (
              <article
                key={product.id}
                className={`promo-slide ${index === currentSlide ? 'active' : ''}`}
                aria-label={`${product.name} discount deal`}
              >
                <div className="promo-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="promo-badge">-{product.discount}%</span>
                </div>

                <div className="promo-content">
                  <span className="promo-label">Example discount</span>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>

                  <div className="promo-pricing">
                    <strong>{formatPrice(product.price - Math.round(product.price * (product.discount / 100)))}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </div>

                  <a href={`/products/${encodeURIComponent(product.id)}`} className="promo-button">View product</a>
                </div>
              </article>
            ))}
          </div>
          <p className="promo-disclaimer">Example prices only. Live offers and final prices will come from the store catalog.</p>

          <div className="promo-dots" aria-label="Deal slideshow navigation">
            {dealProducts.map((product, index) => (
              <button
                key={product.id}
                type="button"
                className={index === currentSlide ? 'dot active' : 'dot'}
                onClick={() => setCurrentSlide(index)}
                aria-label={`View deal ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="featured-section">
          <div className="section-heading">
            <div>
              <span>GOOD PICKS, EVERY DAY</span>
              <h2>Popular this week</h2>
            </div>
            <a href="/products">Shop all products</a>
          </div>

          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <CategoryList />
      </main>
    </div>
  )
}

export default Home