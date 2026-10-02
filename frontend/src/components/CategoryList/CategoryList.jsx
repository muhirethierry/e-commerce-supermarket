import { ArrowRight } from 'lucide-react'
import products from '../../data/products'
import CategoryCard from '../CategoryCard/CategoryCard'

function CategoryList() {
  const categories = products.reduce((groups, product) => {
    const key = product.category
    const group = groups.get(key)

    if (group) {
      group.count += 1
    } else {
      groups.set(key, {
        category: product.category,
        name: product.category,
        image: product.image,
        count: 1,
      })
    }

    return groups
  }, new Map())

  return (
    <section className="category-section" id="shop-categories">
      <div className="section-heading">
        <div>
          <span>FIND YOUR EVERYDAY FAVOURITES</span>
          <h2>Shop by category</h2>
        </div>
        <a href="/products" className="text-link">
          Browse everything <ArrowRight aria-hidden="true" size={17} />
        </a>
      </div>

      <div className="category-grid">
        {[...categories.values()].map((category) => (
          <CategoryCard key={`${category.category}-${category.name}`} {...category} />
        ))}
      </div>
    </section>
  )
}

export default CategoryList