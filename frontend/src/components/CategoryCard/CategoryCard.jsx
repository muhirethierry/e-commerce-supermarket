import { ArrowUpRight } from 'lucide-react'

function CategoryCard({ category, name, image, count }) {
  const query = new URLSearchParams({ category })

  return (
    <a href={`/products?${query.toString()}`} className="category-card">
      <div className="category-image">
        <img src={image} alt={name} loading="lazy" />
        <span className="category-count">{count} items</span>
      </div>
      <div className="category-content">
        <div>
          <span className="category-parent">{category}</span>
          <h3>{name}</h3>
        </div>
        <span className="category-arrow" aria-label={`Shop ${name}`}>
          <ArrowUpRight aria-hidden="true" size={18} />
        </span>
      </div>
    </a>
  )
}

export default CategoryCard