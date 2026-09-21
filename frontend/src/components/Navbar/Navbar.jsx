function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <a href="/" className="logo">
          <span className="logo-icon">🛒</span>

          <div className="logo-text">
            <h2>FreshMart</h2>
            <span>Supermarket</span>
          </div>
        </a>

        {/* Main Navigation */}
        <nav className="nav-links">
          <a href="/" className="active">
            Home
          </a>

          <a href="/products">
            Shop
          </a>

          <a href="/categories">
            Categories
          </a>
        </nav>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
          />

          <button aria-label="Search">
            🔍
          </button>
        </div>

        {/* Actions */}
        <div className="nav-actions">

          <button
            className="nav-icon"
            aria-label="Wishlist"
          >
            ♡
          </button>

          <button
            className="nav-icon"
            aria-label="Account"
          >
            👤
          </button>

          <button className="cart-button">
            <span className="cart-icon">🛒</span>

            <span className="cart-text">
              Cart
            </span>

            <span className="cart-count">
              0
            </span>
          </button>

        </div>

      </div>
    </header>
  )
}

export default Navbar