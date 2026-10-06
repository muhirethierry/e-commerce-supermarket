import { useEffect, useState } from 'react'
import { Search, ShoppingBasket, UserRound } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { getCurrentUser, signOut } from '../../api/catalog'

function Navbar() {
  const { itemCount } = useCart()
  const [user, setUser] = useState(null)
  const path = window.location.pathname

  useEffect(() => {
    const controller = new AbortController()
    getCurrentUser({ signal: controller.signal })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null))

    return () => controller.abort()
  }, [])

  async function handleSignOut() {
    await signOut().catch(() => {})
    setUser(null)
    window.location.assign('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo" aria-label="FreshMart home">
          <img className="navbar-logo-image" src="/logo.png" alt="FreshMart - Fresh Products, Better Life" />
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
          {user ? (
            <div className="signed-in-actions">
              {user.role === 'ADMIN' && <a className="admin-nav-link" href="/admin">Admin</a>}
              <span className="signed-in-name" title={user.email}><UserRound aria-hidden="true" size={18} />{user.name}</span>
              <button className="sign-out-button" type="button" onClick={handleSignOut}>Sign out</button>
            </div>
          ) : (
            <a className="account-link" href="/login" aria-label="Sign in to your account">
              <UserRound aria-hidden="true" size={18} />
              <span>Sign in</span>
            </a>
          )}
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