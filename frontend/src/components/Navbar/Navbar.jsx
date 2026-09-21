function Navbar() {
  return (
    <nav>
      <div>
        <h2>Supermarket</h2>
      </div>

      <div>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/categories">Categories</a>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search products..."
        />

        <button>Cart</button>
        <button>Login</button>
      </div>
    </nav>
  )
}

export default Navbar