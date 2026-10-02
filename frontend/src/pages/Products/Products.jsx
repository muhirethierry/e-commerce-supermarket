import { useState } from 'react'
import { Search } from 'lucide-react'
import products from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'

function Products() {
  const params = new URLSearchParams(window.location.search)
  const [searchTerm, setSearchTerm] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'All categories')
  const [subcategory, setSubcategory] = useState(params.get('subcategory') || 'All items')
  const [sortOrder, setSortOrder] = useState('featured')

  const categories = [...new Set(products.map((product) => product.category))]
  const subcategories = [...new Set(products
    .filter((product) => category === 'All categories' || product.category === category)
    .map((product) => product.subcategory))]

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim()
    const matchesSearch = [product.name, product.category, product.subcategory]
      .some((value) => value.toLowerCase().includes(search))
    const matchesCategory = category === 'All categories' || product.category === category
    const matchesSubcategory = subcategory === 'All items' || product.subcategory === subcategory

    return matchesSearch && matchesCategory && matchesSubcategory
  })

  const sortedProducts = [...filteredProducts].sort((first, second) => {
    if (sortOrder === 'price-low') return first.price - second.price
    if (sortOrder === 'price-high') return second.price - first.price
    if (sortOrder === 'name') return first.name.localeCompare(second.name)
    return first.id - second.id
  })

  function handleCategoryChange(event) {
    setCategory(event.target.value)
    setSubcategory('All items')
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
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </div>

      <div className="products-results">
        <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</span>
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
            <select value={subcategory} onChange={(event) => setSubcategory(event.target.value)}>
              <option>All items</option>
              {subcategories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Sort</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="no-products">
          <h2>No products found</h2>
          <p>Try another search or choose a different category.</p>
        </div>
      )}
    </main>
  )
}

export default Products