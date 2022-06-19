import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'

const Home: React.FC = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
    </div>
  )
}

export default Home