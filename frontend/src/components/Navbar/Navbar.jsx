import { Search, ShoppingBasket, Store, UserRound } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const { itemCount } = useCart()
  const path = window.location.pathname

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo" aria-label="FreshMart home">
          <span className="logo-icon"><Store aria-hidden="true" size={22} /></span>
          <span className="logo-text">
            <strong>FreshMart</strong>
            <span>Good food, close by</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="/" aria-current={path === '/' ? 'page' : undefined}>Home</a>
          <a href="/products" aria-current={path === '/products' ? 'page' : undefined}>Shop</a>
          <a href="/categories" aria-current={path === '/categories' ? 'page' : undefined}>Categories</a>
        </nav>

        <form className="search-box" action="/products" method="get" role="search">
          <input
            type="search"
            name="q"
            placeholder="Search groceries..."
            aria-label="Search groceries"
          />
          <button type="submit" aria-label="Search">
            <Search aria-hidden="true" size={18} />
          </button>
        </form>

        <div className="nav-actions">
          <a className="account-link" href="/login" aria-label="Sign in to your account">
            <UserRound aria-hidden="true" size={18} />
            <span>Sign in</span>
          </a>
          <a className="cart-button" href="/cart" aria-label={`Cart, ${itemCount} items`}>
            <ShoppingBasket className="cart-icon" aria-hidden="true" size={18} />
            <span className="cart-text">Basket</span>
            <span className="cart-count">{itemCount}</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar