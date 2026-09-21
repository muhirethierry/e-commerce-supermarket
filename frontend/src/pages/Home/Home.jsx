import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import CategoryList from '../../components/CategoryList/CategoryList'

function Home() {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />

        <CategoryList />

        <h2>Welcome to our supermarket</h2>
      </main>
    </div>
  )
}

export default Home