import CategoryCard from '../CategoryCard/CategoryCard'

function CategoryList() {
  const categories = [
    {
      name: 'Fruits & Vegetables',
      image:
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Dairy & Eggs',
      image:
        'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Bakery',
      image:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Beverages',
      image:
        'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Pantry & Grocery',
      image:
        'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Snacks & Sweets',
      image:
        'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Household',
      image:
        'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Personal Care',
      image:
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Baby Care',
      image:
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <section className="category-section">
      <div className="section-heading">
        <div>
          <span>EXPLORE OUR STORE</span>
          <h2>Shop by Category</h2>
        </div>

        <a href="/categories">View All →</a>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoryList