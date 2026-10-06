import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { getCategories, getProducts, getSubcategories } from '../../api/catalog'
import ProductCard from '../../components/ProductCard/ProductCard'

function Products() {
  const params = new URLSearchParams(window.location.search)
  const [searchTerm, setSearchTerm] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'All categories')
  const [subcategory, setSubcategory] = useState(params.get('subcategory') || 'All items')
  const [sortOrder, setSortOrder] = useState('featured')
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 24, total: 0, pages: 0 })
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterError, setFilterError] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    getCategories({ signal: controller.signal })
      .then((response) => {
        setCategories(response.data)
        setFilterError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setFilterError('Could not load departments from the catalog API.')
      })

    return () => controller.abort()
  }, [retryKey])

  useEffect(() => {
    const controller = new AbortController()
    const selectedCategory = category === 'All categories' ? '' : category
    getSubcategories(selectedCategory, { signal: controller.signal })
      .then((response) => {
        setSubcategories(response.data)
        setFilterError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setFilterError('Could not load item types from the catalog API.')
      })

    return () => controller.abort()
  }, [category, retryKey])

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    setError('')

    const timer = window.setTimeout(() => {
      const sort = {
        'price-low': 'price-asc',
        'price-high': 'price-desc',
        name: 'name',
      }[sortOrder]

      getProducts({
        q: searchTerm.trim(),
        category: category === 'All categories' ? '' : category,
        subcategory: subcategory === 'All items' ? '' : subcategory,
        sort,
        page,
        limit: 24,
      }, { signal: controller.signal })
        .then((response) => {
          setProducts(response.data)
          setPagination(response.pagination)
        })
        .catch((requestError) => {
          if (requestError.name !== 'AbortError') setError(requestError.message)
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false)
        })
    }, searchTerm.trim() ? 250 : 0)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [searchTerm, category, subcategory, sortOrder, page, retryKey])

  function handleCategoryChange(event) {
    setCategory(event.target.value)
    setSubcategory('All items')
    setPage(1)
  }

  const pageTitle = subcategory !== 'All items'
    ? subcategory
    : category === 'All categories' ? 'Our Products' : category

  return (
    <main className="products-page">
      <div className="products-heading">
        <div>
          <span>FRESH & QUALITY</span>
          <h1>{pageTitle}</h1>
          <p>Discover fresh groceries and everyday essentials for your home. Some listings are sample demo products.</p>
        </div>
        <label className="products-search">
          <Search aria-hidden="true" size={18} />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value)
              setPage(1)
            }}
          />
        </label>
      </div>

      <div className="products-results">
        <span aria-live="polite">
          {isLoading
            ? 'Loading products…'
            : error
              ? 'Catalog unavailable'
              : `Showing ${pagination.total === 0 ? 0 : (page - 1) * pagination.limit + 1}-${Math.min(page * pagination.limit, pagination.total)} of ${pagination.total} products`}
        </span>
        <div className="products-filters">
          <label>
            <span>Department</span>
            <select value={category} onChange={handleCategoryChange}>
              <option>All categories</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Type</span>
            <select value={subcategory} onChange={(event) => {
              setSubcategory(event.target.value)
              setPage(1)
            }}>
              <option>All items</option>
              {subcategories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Sort</span>
            <select value={sortOrder} onChange={(event) => {
              setSortOrder(event.target.value)
              setPage(1)
            }}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>

      {filterError && <p className="products-api-note" role="status">{filterError}</p>}

      {isLoading ? (
        <div className="products-api-state" role="status">Loading the FreshMart catalog…</div>
      ) : error ? (
        <div className="products-api-state products-api-error" role="alert">
          <h2>We couldn’t load the catalog.</h2>
          <p>{error}</p>
          <p>Make sure the backend is running, then try again.</p>
          <button type="button" onClick={() => setRetryKey((value) => value + 1)}>Retry</button>
        </div>
      ) : products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="no-products">
          <h2>No products found</h2>
          <p>Try another search or choose a different category.</p>
        </div>
      )}

      {!isLoading && !error && pagination.pages > 1 && (
        <nav className="products-pagination" aria-label="Product pages">
          <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>
            Previous
          </button>
          <span>Page {pagination.page} of {pagination.pages}</span>
          <button type="button" disabled={page >= pagination.pages} onClick={() => setPage((current) => current + 1)}>
            Next
          </button>
        </nav>
      )}
    </main>
  )
}

export default Products