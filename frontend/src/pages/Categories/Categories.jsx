import { ArrowRight } from 'lucide-react'
import CategoryList from '../../components/CategoryList/CategoryList'

function Categories() {
  return (
    <main className="categories-page">
      <div className="categories-heading">
        <span>SHOP THE WAY YOU LIKE</span>
        <h1>Good things, grouped for you.</h1>
        <p>Explore all 30 departments. New department listings are sample products for this frontend demo.</p>
        <a href="/products">Browse all products <ArrowRight aria-hidden="true" size={17} /></a>
      </div>
      <CategoryList />
    </main>
  )
}

export default Categories