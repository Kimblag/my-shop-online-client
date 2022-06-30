import { Box, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import Banner from '../components/banner/banner'
import Cart from '../components/cart/Cart'
import Categories from '../components/categories/Categories'
import AppDrawer from '../components/drawer/AppDrawer'
import Footer from '../components/footer/Footer'
import Loader from '../components/loader/Loader'
import Navbar from '../components/navbar/Navbar'
import Products from '../components/products/Products'
import Promotions from '../components/promotions/Promotions'
import SearchBox from '../components/search/SearchBox'
import Signin from '../components/signin/Signin'
import Signup from '../components/signup/Signup'
import WishList from '../components/wishList/WishList'
import { getUserInfo, reset } from '../redux/features/auth/auth.slice'
import { getUserFavorites } from '../redux/features/favorites/favorites.slice'
import { getProducts } from '../redux/features/products/products.slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Colors } from '../styles/theme'

const Home: React.FC = (): JSX.Element => {
  const { products } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { user } = useAppSelector(state => state.auth)
  const [currentPage, setCurrentPage] = useState<number>(1)


   type userDecodeType = {
  
      exp: number
      iat: number
      id: string
      isAdmin: boolean
  }
  const userDecode: userDecodeType = JSON.parse(window.localStorage.getItem('user') || '{}')
  const userId: string = userDecode?.id
  

  useEffect(() => {
    dispatch(getUserInfo(userId))
    dispatch(getUserFavorites(userId))
    dispatch(reset())
  }, [dispatch, userId])

  //TODO validar si esta el usuario en local storage y despachar la action.


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      dispatch(getProducts(null))
      setLoading(false)
    }, 1000);
  }, [dispatch])

  return (
    <>
      {loading
        ? (
          <div style={{ height: '100vh' }}>
            <Loader />
          </div>
        ) : (
          <>
            <Navbar user={user} open={handleClickOpen} close={handleClose} />
            <Banner />
            <Promotions />
            <Box display="flex" justifyContent={"center"} sx={{ p: 4 }}>
              <Typography variant='h4'>Our Products</Typography>
            </Box>
            <Products products={products} />
            <Divider variant='middle' sx={{ m: 3, borderColor: Colors.secondary }} />
            <Box display="flex" justifyContent={"center"} sx={{ p: 2 }}>
              <Typography variant='h4'>Our Categories</Typography>
            </Box>
            <Categories isLoading={loading} />
            <Footer />
            <AppDrawer />
            <Cart />
            <SearchBox setCurrentPage={setCurrentPage} />
            <Signin open={open} close={handleClose} openRegister={handleOpenRegister} />
            <Signup openLogin={handleClickOpen} open={openRegister} close={handleCloseRegister} />
            <WishList />
          </>)}
    </>
  )
}

export default Home