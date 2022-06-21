import { Box, Typography } from '@mui/material'
import Banner from '../components/banner/banner'
import AppDrawer from '../components/drawer/AppDrawer'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import Products from '../components/products/Products'
import Promotions from '../components/promotions/Promotions'
import SearchBox from '../components/search/SearchBox'

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Banner />
      <Promotions />
      <Box display="flex" justifyContent={"center"} sx={{ p: 4 }}>
        <Typography variant='h4'>Our Products</Typography>
      </Box>
      <Products />
      <Footer />
      <AppDrawer />
      <SearchBox />
    </>
  )
}

export default Home