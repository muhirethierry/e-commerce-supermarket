import { useEffect, useState } from 'react'
import { Archive, Boxes, ClipboardList, LayoutDashboard, Pencil, Plus, RotateCcw, Search, ShieldAlert, X } from 'lucide-react'
import {
  archiveAdminProduct,
  getAdminOrders,
  getAdminProducts,
  getAdminSummary,
  getCurrentUser,
  restoreAdminProduct,
  saveAdminProduct,
  updateAdminOrderStatus,
} from '../../api/catalog'

const emptyProduct = {
  name: '',
  category: '',
  subcategory: '',
  price: '',
  unit: 'piece',
  stock: '',
  image: '',
  ageRestricted: false,
}

const orderTransitions = {
  pending: ['processing', 'cancelled'],
  processing: ['ready', 'cancelled'],
  ready: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
}

function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [accessState, setAccessState] = useState('checking')
  const [section, setSection] = useState('overview')
  const [summary, setSummary] = useState(null)
  const [products, setProducts] = useState([])
  const [productPagination, setProductPagination] = useState(null)
  const [productPage, setProductPage] = useState(1)
  const [productSearch, setProductSearch] = useState('')
  const [orders, setOrders] = useState([])
  const [orderFilter, setOrderFilter] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isProductFormOpen, setIsProductFormOpen] = useState(false)
  const [productForm, setProductForm] = useState(emptyProduct)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    getCurrentUser({ signal: controller.signal })
      .then(({ data }) => {
        setUser(data)
        setAccessState(data.role === 'ADMIN' ? 'admin' : 'forbidden')
      })
      .catch(() => setAccessState('signed-out'))
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (accessState !== 'admin') return
    let cancelled = false
    setIsLoading(true)
    setError('')
    Promise.all([
      section === 'overview' ? getAdminSummary() : Promise.resolve(null),
      section === 'products'
        ? getAdminProducts({ page: productPage, limit: 50, q: productSearch.trim() })
        : Promise.resolve(null),
      section === 'orders' ? getAdminOrders(orderFilter) : Promise.resolve(null),
    ])
      .then(([summaryResponse, productsResponse, ordersResponse]) => {
        if (cancelled) return
        if (summaryResponse) setSummary(summaryResponse.data)
        if (productsResponse) {
          setProducts(productsResponse.data)
          setProductPagination(productsResponse.pagination)
        }
        if (ordersResponse) setOrders(ordersResponse.data)
      })
      .catch((requestError) => {
        if (!cancelled && requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => { cancelled = true }
  }, [accessState, section, productPage, productSearch, orderFilter, retryKey])

  function startNewProduct() {
    setEditingProduct(null)
    setProductForm(emptyProduct)
    setIsProductFormOpen(true)
    setError('')
    setNotice('')
  }

  function startEditProduct(product) {
    setEditingProduct(product.id)
    setIsProductFormOpen(true)
    setProductForm({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: String(product.price),
      unit: product.unit,
      stock: String(product.stock),
      image: product.image,
      ageRestricted: product.ageRestricted,
    })
    setError('')
    setNotice('')
  }

  async function handleSaveProduct(event) {
    event.preventDefault()
    setIsSaving(true)
    setError('')
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
      }
      await saveAdminProduct(payload, editingProduct)
      setEditingProduct(null)
      setIsProductFormOpen(false)
      setProductForm(emptyProduct)
      setNotice(editingProduct ? 'Product updated.' : 'Product added to the catalog.')
      setRetryKey((value) => value + 1)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleArchive(product) {
    if (!window.confirm(`Remove “${product.name}” from the storefront? It will remain in historical orders and can be restored.`)) return
    setError('')
    try {
      await archiveAdminProduct(product.id)
      setNotice(`${product.name} was archived from the storefront.`)
      setRetryKey((value) => value + 1)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  async function handleRestore(product) {
    setError('')
    try {
      await restoreAdminProduct(product.id)
      setNotice(`${product.name} is active in the storefront again.`)
      setRetryKey((value) => value + 1)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  async function handleOrderStatus(order, status) {
    setError('')
    try {
      await updateAdminOrderStatus(order.id, status)
      setNotice(`Order ${order.reference} marked ${status}.`)
      setRetryKey((value) => value + 1)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (accessState === 'checking') {
    return <main className="admin-page"><p className="admin-state">Checking administrator access…</p></main>
  }

  if (accessState !== 'admin') {
    return (
      <main className="admin-page">
        <section className="admin-access-state">
          <ShieldAlert aria-hidden="true" size={28} />
          <h1>{accessState === 'signed-out' ? 'Sign in to continue' : 'Administrator access required'}</h1>
          <p>{accessState === 'signed-out'
            ? 'Sign in with the administrator account to manage the FreshMart store.'
            : `Signed in as ${user?.email}. This account does not have administrator permissions.`}</p>
          <a href="/login">{accessState === 'signed-out' ? 'Sign in' : 'Return to storefront'}</a>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <header className="admin-heading">
        <div>
          <span>FRESHMART OPERATIONS</span>
          <h1>Store dashboard</h1>
          <p>Manage catalog listings and order progress.</p>
        </div>
        <div className="admin-identity"><ShieldAlert aria-hidden="true" size={17} />{user?.name} <small>Administrator</small></div>
      </header>

      <div className="admin-layout">
        <nav className="admin-sidebar" aria-label="Admin sections">
          <button type="button" className={section === 'overview' ? 'active' : ''} onClick={() => setSection('overview')}>
            <LayoutDashboard aria-hidden="true" size={17} />Overview
          </button>
          <button type="button" className={section === 'products' ? 'active' : ''} onClick={() => setSection('products')}>
            <Boxes aria-hidden="true" size={17} />Products
          </button>
          <button type="button" className={section === 'orders' ? 'active' : ''} onClick={() => setSection('orders')}>
            <ClipboardList aria-hidden="true" size={17} />Orders
          </button>
        </nav>

        <section className="admin-content" aria-live="polite">
          {error && <div className="admin-alert" role="alert">{error}<button type="button" aria-label="Dismiss error" onClick={() => setError('')}><X size={16} /></button></div>}
          {notice && <div className="admin-notice" role="status">{notice}<button type="button" aria-label="Dismiss notice" onClick={() => setNotice('')}><X size={16} /></button></div>}
          {isLoading && <p className="admin-state">Loading dashboard data…</p>}
          {!isLoading && error && <button className="admin-retry" type="button" onClick={() => setRetryKey((value) => value + 1)}><RotateCcw size={15} />Retry</button>}

          {!isLoading && section === 'overview' && summary && (
            <>
              <div className="admin-metrics">
                <article><span>Active products</span><strong>{summary.activeProducts.toLocaleString()}</strong></article>
                <article><span>Low stock (5 or fewer)</span><strong>{summary.lowStockProducts.toLocaleString()}</strong></article>
                <article><span>Total orders</span><strong>{summary.totalOrders.toLocaleString()}</strong></article>
                <article><span>Pending orders</span><strong>{summary.pendingOrders.toLocaleString()}</strong></article>
              </div>
              <div className="admin-section-heading"><div><span>RECENT ACTIVITY</span><h2>Latest orders</h2></div><button type="button" onClick={() => setSection('orders')}>Manage orders</button></div>
              <OrderTable orders={summary.recentOrders} onStatusChange={handleOrderStatus} compact />
            </>
          )}

          {!isLoading && section === 'products' && (
            <>
              <div className="admin-section-heading">
                <div><span>CATALOG</span><h2>Products</h2></div>
                <button type="button" className="admin-primary-button" onClick={startNewProduct}><Plus size={16} />Add product</button>
              </div>
              {isProductFormOpen && <ProductForm isEditing={editingProduct !== null} product={productForm} setProduct={setProductForm} isSaving={isSaving} onSubmit={handleSaveProduct} onCancel={() => { setEditingProduct(null); setIsProductFormOpen(false) }} />}
              <div className="admin-product-tools">
                <label><Search aria-hidden="true" size={16} /><input value={productSearch} onChange={(event) => { setProductSearch(event.target.value); setProductPage(1) }} placeholder="Search catalog…" aria-label="Search admin products" /></label>
                <span>{productPagination?.total?.toLocaleString() ?? 0} listings</span>
              </div>
              <ProductTable products={products} onEdit={startEditProduct} onArchive={handleArchive} onRestore={handleRestore} />
              {productPagination?.pages > 1 && <div className="admin-pagination"><button type="button" disabled={productPage <= 1} onClick={() => setProductPage((page) => page - 1)}>Previous</button><span>Page {productPage} of {productPagination.pages}</span><button type="button" disabled={productPage >= productPagination.pages} onClick={() => setProductPage((page) => page + 1)}>Next</button></div>}
            </>
          )}

          {!isLoading && section === 'orders' && (
            <>
              <div className="admin-section-heading"><div><span>FULFILLMENT</span><h2>Orders</h2></div>
                <label className="admin-order-filter">Status<select value={orderFilter} onChange={(event) => setOrderFilter(event.target.value)}><option value="">All orders</option><option value="pending">Pending</option><option value="processing">Processing</option><option value="ready">Ready</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select></label>
              </div>
              <OrderTable orders={orders} onStatusChange={handleOrderStatus} />
            </>
          )}
        </section>
      </div>
    </main>
  )
}

function ProductForm({ isEditing, product, setProduct, isSaving, onSubmit, onCancel }) {
  function update(field, value) {
    setProduct((current) => ({ ...current, [field]: value }))
  }

  return (
    <form className="admin-product-form" onSubmit={onSubmit}>
      <div className="admin-form-heading"><h3>{isEditing ? 'Edit product' : 'New product'}</h3><button type="button" aria-label="Close product form" onClick={onCancel}><X size={18} /></button></div>
      <label>Product name<input required maxLength="160" value={product.name} onChange={(event) => update('name', event.target.value)} /></label>
      <div className="admin-form-grid">
        <label>Department<input required maxLength="100" value={product.category} onChange={(event) => update('category', event.target.value)} placeholder="e.g. Fruits & Vegetables" /></label>
        <label>Item type<input required maxLength="100" value={product.subcategory} onChange={(event) => update('subcategory', event.target.value)} placeholder="e.g. Fruits" /></label>
        <label>Price (RWF)<input required type="number" min="0" step="1" value={product.price} onChange={(event) => update('price', event.target.value)} /></label>
        <label>Unit<input required maxLength="30" value={product.unit} onChange={(event) => update('unit', event.target.value)} placeholder="kg, piece, pack…" /></label>
        <label>Stock quantity<input required type="number" min="0" step="1" value={product.stock} onChange={(event) => update('stock', event.target.value)} /></label>
        <label>Image URL<input type="url" value={product.image} onChange={(event) => update('image', event.target.value)} placeholder="https://…" /></label>
      </div>
      <label className="admin-checkbox"><input type="checkbox" checked={product.ageRestricted} onChange={(event) => update('ageRestricted', event.target.checked)} /> Age restricted</label>
      <div className="admin-form-actions"><button type="button" onClick={onCancel}>Cancel</button><button className="admin-primary-button" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save product'}</button></div>
    </form>
  )
}

function ProductTable({ products, onEdit, onArchive, onRestore }) {
  if (products.length === 0) return <p className="admin-empty">No products match this search.</p>
  return (
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Product</th><th>Department</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{products.map((product) => <tr key={product.id} className={!product.isActive ? 'archived' : ''}>
        <td><div className="admin-product-cell"><img src={product.image} alt="" /><strong>{product.name}</strong></div></td>
        <td>{product.category}<small>{product.subcategory}</small></td>
        <td>{product.price.toLocaleString()} RWF / {product.unit}</td>
        <td>{product.stock}</td>
        <td><span className={`admin-status ${product.isActive ? product.stock <= 5 ? 'warning' : 'active' : 'inactive'}`}>{product.isActive ? product.stock <= 5 ? 'Low stock' : 'Active' : 'Archived'}</span></td>
        <td><div className="admin-row-actions">{product.isActive && <button type="button" aria-label={`Edit ${product.name}`} onClick={() => onEdit(product)}><Pencil size={15} /></button>}{product.isActive ? <button type="button" aria-label={`Archive ${product.name}`} onClick={() => onArchive(product)}><Archive size={15} /></button> : <button type="button" aria-label={`Restore ${product.name}`} onClick={() => onRestore(product)}><RotateCcw size={15} /></button>}</div></td>
      </tr>)}</tbody>
    </table></div>
  )
}

function OrderTable({ orders, onStatusChange, compact = false }) {
  if (orders.length === 0) return <p className="admin-empty">No orders to show.</p>
  return (
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Reference / customer</th><th>Placed</th><th>Payment</th><th>Total</th><th>Status</th>{!compact && <th>Update</th>}</tr></thead>
      <tbody>{orders.map((order) => <tr key={order.id}>
        <td><strong>{order.reference}</strong><small>{order.customerName} · {order.email} · {order.phone}</small></td>
        <td>{new Date(order.createdAt).toLocaleString()}</td>
        <td>{order.paymentMethod === 'cash' ? 'Cash on delivery' : order.paymentMethod}<small>{order.paymentStatus}</small></td>
        <td>{order.subtotal.toLocaleString()} RWF</td>
        <td><span className={`admin-status ${order.status === 'pending' ? 'warning' : order.status === 'cancelled' ? 'inactive' : 'active'}`}>{order.status}</span></td>
        {!compact && <td><OrderStatusControl order={order} onStatusChange={onStatusChange} /></td>}
      </tr>)}</tbody>
    </table></div>
  )
}

function OrderStatusControl({ order, onStatusChange }) {
  const choices = orderTransitions[order.status] || []
  if (choices.length === 0) return <span className="admin-muted">No further actions</span>
  return <select aria-label={`Update ${order.reference} status`} value="" onChange={(event) => event.target.value && onStatusChange(order, event.target.value)}>
    <option value="">Update status…</option>
    {choices.map((status) => <option value={status} key={status}>{status}</option>)}
  </select>
}

export default AdminDashboard
