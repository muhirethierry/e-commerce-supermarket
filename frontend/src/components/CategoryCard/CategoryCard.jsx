function CategoryCard({ name, image }) {
  return (
    <a href="/products" className="category-card">

      <div className="category-image">
        <img src={image} alt={name} />
      </div>

      <div className="category-content">
        <h3>{name}</h3>
        <span>Shop Now →</span>
      </div>

    </a>
  )
}

export default CategoryCard