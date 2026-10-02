import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Categories from './pages/Categories/Categories'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import NotFound from './pages/NotFound/NotFound'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Chatbot from './components/Chatbot/Chatbot'
import { CartProvider } from './context/CartContext'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const productMatch = path.match(/^\/products\/([^/]+)$/)

  let page
  if (path === '/') page = <Home />
  else if (path === '/products') page = <Products />
  else if (path === '/categories') page = <Categories />
  else if (path === '/cart') page = <Cart />
  else if (path === '/checkout') page = <Checkout />
  else if (path === '/login') page = <Login />
  else if (path === '/register') page = <Register />
  else if (path === '/forgot-password') page = <ForgotPassword />
  else if (productMatch) page = <ProductDetails productId={decodeURIComponent(productMatch[1])} />
  else page = <NotFound />

  return (
    <CartProvider>
      <Navbar />
      {page}
      <Footer />
      <Chatbot />
    </CartProvider>
  )
}

export default App