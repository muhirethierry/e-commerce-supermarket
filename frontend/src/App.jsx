import Home from './pages/Home/Home'
import Products from './pages/Products/Products'

function App() {
  const path = window.location.pathname

  if (path === '/products') {
    return <Products />
  }

  return <Home />
}

export default App