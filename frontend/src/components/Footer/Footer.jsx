import { ArrowRight, Leaf, ShoppingBag } from 'lucide-react'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-intro">
          <a className="footer-brand" href="/">
            <span><Leaf aria-hidden="true" size={20} /></span>
            FreshMart
          </a>
          <p>Fresh finds and everyday favourites, all in one easy place.</p>
          <a className="footer-shop-link" href="/products">
            Start shopping <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <a href="/">Home</a>
          <a href="/products">All products</a>
          <a href="/categories">Shop by category</a>
        </div>

        <div className="footer-column">
          <h2>Your shopping</h2>
          <a href="/cart">View your basket</a>
          <a href="/checkout">Checkout</a>
          <span className="footer-note"><ShoppingBag aria-hidden="true" size={16} /> Your basket stays on this device</span>
        </div>

        <div className="footer-column footer-contact-column">
          <h2>Contact</h2>
          <p className="footer-contact-placeholder">Store contact and opening hours will be published when confirmed.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FreshMart</span>
        <a href="/products">Find your next favourite <ArrowRight aria-hidden="true" size={15} /></a>
      </div>
    </footer>
  )
}

export default Footer