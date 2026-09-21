function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <span className="hero-label">
          FRESH & QUALITY PRODUCTS
        </span>

        <h1>
          Fresh Food
          <br />
          <span>At Your Door</span>
        </h1>

        <p>
          Shop fresh groceries, everyday essentials,
          and quality products from the comfort of your home.
        </p>

        <div className="hero-buttons">
          <a href="/products" className="hero-primary">
            Shop Now
            <span>→</span>
          </a>

          <a href="/categories" className="hero-secondary">
            Explore Categories
          </a>
        </div>

        <div className="hero-features">
          <div>
            <strong>✓</strong>
            <span>Fresh Products</span>
          </div>

          <div>
            <strong>✓</strong>
            <span>Fast Delivery</span>
          </div>

          <div>
            <strong>✓</strong>
            <span>Easy Shopping</span>
          </div>
        </div>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
          alt="Fresh groceries"
        />

        <div className="hero-badge">
          <strong>100%</strong>
          <span>Fresh Quality</span>
        </div>
      </div>
    </section>
  )
}

export default Hero