function CategoryCard({ name, image }) {
  return (
    <div>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  )
}

export default CategoryCard