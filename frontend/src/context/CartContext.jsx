import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../api/catalog'

const CartContext = createContext(null)
const storageKey = 'freshmart-cart'

function readCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(storageKey) || '[]')
    return Array.isArray(savedCart) ? savedCart : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sessionChecked, setSessionChecked] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    getCurrentUser({ signal: controller.signal })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => {
        if (!controller.signal.aborted) setSessionChecked(true)
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items])

  function addItem(product) {
    if (!isAuthenticated) {
      const next = `${window.location.pathname}${window.location.search}`
      window.location.assign(`/login?next=${encodeURIComponent(next)}`)
      return false
    }

    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id)

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
    return true
  }

  function setQuantity(productId, quantity) {
    setItems((currentItems) =>
      currentItems
        .map((item) => item.id === productId
          ? { ...item, quantity: Math.min(Math.max(quantity, 0), item.stock) }
          : item)
        .filter((item) => item.quantity > 0),
    )
  }

  function removeItem(productId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, setQuantity, removeItem, clearCart, isAuthenticated, sessionChecked }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}