import Categories from '../components/Categories'
import Featured from '../components/Featured'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'

const Home: React.FC = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Featured />
    </div>
  )
}

export default Home