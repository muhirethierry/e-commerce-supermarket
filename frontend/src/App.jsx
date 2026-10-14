import { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Categories from './pages/Categories/Categories'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import NotFound from './pages/NotFound/NotFound'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Chatbot from './components/Chatbot/Chatbot'
import { CartProvider } from './context/CartContext'

function App() {
  const [locationKey, setLocationKey] = useState(() => `${window.location.pathname}${window.location.search}`)
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const productMatch = path.match(/^\/products\/([^/]+)$/)

  useEffect(() => {
    function handlePopState() {
      setLocationKey(`${window.location.pathname}${window.location.search}`)
    }

    function handleInternalLink(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return

      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin) return
      if (destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) return

      const previousPath = window.location.pathname
      event.preventDefault()
      window.history.pushState({}, '', `${destination.pathname}${destination.search}${destination.hash}`)
      setLocationKey(`${destination.pathname}${destination.search}`)
      if (destination.hash) {
        window.requestAnimationFrame(() => document.getElementById(decodeURIComponent(destination.hash.slice(1)))?.scrollIntoView())
      } else if (destination.pathname !== previousPath) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleInternalLink)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleInternalLink)
    }
  }, [])

  let page
  if (path === '/') page = <Home />
  else if (path === '/products') page = <Products />
  else if (path === '/categories') page = <Categories />
  else if (path === '/cart') page = <Cart />
  else if (path === '/checkout') page = <Checkout />
  else if (path === '/login') page = <Login />
  else if (path === '/register') page = <Register />
  else if (path === '/forgot-password') page = <ForgotPassword />
   else if (path === '/reset-password') page = <ResetPassword />
  else if (path === '/admin') page = <AdminDashboard />
  else if (productMatch) page = <ProductDetails productId={decodeURIComponent(productMatch[1])} />
  else page = <NotFound />

  return (
    <CartProvider>
      <Navbar />
      <div key={locationKey}>{page}</div>
      <Footer />
      <Chatbot />
    </CartProvider>
  )
}

export default App
