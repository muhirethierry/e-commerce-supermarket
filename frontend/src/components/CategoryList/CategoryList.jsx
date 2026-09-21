import CategoryCard from '../CategoryCard/CategoryCard'

function CategoryList() {
  const categories = [
    {
      name: 'Fruits & Vegetables',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
    },
    {
      name: 'Dairy & Eggs',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
    },
    {
      name: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    },
    {
      name: 'Beverages',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
    },
    {
      name: 'Pantry & Grocery',
      image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9',
    },
    {
     
  name: 'Snacks & Sweets',
  image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f',

    },
    {
      name: 'Household',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f',
    },
    {
      name: 'Personal Care',
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
    },
    {
      name: 'Baby Care',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4',
    },
  ]

  return (
    <section>
      <h2>Shop by Category</h2>

      <div>
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