import React, { useEffect, useState } from 'react'
import AppDrawer from '../components/drawer/AppDrawer'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import AppPagination from '../components/appPagination/AppPagination'
import ProductsPage from '../components/products/ProductsPage'
import SearchBox from '../components/search/SearchBox'
import Cart from '../components/cart/Cart';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getProducts } from '../redux/features/products/products.slice'
import Filters from '../components/filters/Filters'
import Loader from '../components/loader/Loader'
import Signin from '../components/signin/Signin'
import Signup from '../components/signup/Signup'
import { getUserInfo, reset } from '../redux/features/auth/auth.slice'
import { Alert, AlertTitle } from '@mui/material'
import { Container } from '@mui/system'
import { getUserFavorites, resetFavorite } from '../redux/features/favorites/favorites.slice'
import WishList from '../components/wishList/WishList'


const Shop: React.FC = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { productsFilter, products } = useAppSelector(state => state.products)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { user } = useAppSelector(state => state.auth)

  type userDecodeType = {
    exp: number
    iat: number
    id: string
    isAdmin: boolean
  }

  useEffect(() => {
    const userDecode: userDecodeType = JSON.parse(window.localStorage.getItem('user') || '{}')
    const userId: string = userDecode?.id
    dispatch(getUserInfo(userId))
    dispatch(getUserFavorites(userId))
    setTimeout(() => {
      dispatch(reset())
      dispatch(resetFavorite())
    }, 800)
  }, [dispatch])


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


  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     dispatch(getProducts(null))
  //     setLoading(false)
  //   }, 1000);
  // }, [dispatch])
  const timer = (time: number) =>
    setTimeout(() => {
      setLoading(false);
    }, time);

  useEffect(() => {
    setLoading(true);
    if (products.length === 0) {
      dispatch(getProducts(null))
    }
    timer(500)
  }, [dispatch, products.length])

  const totalProducts = productsFilter.length
  const pageSize = 8

  const handlePageChange = (e: any, page: number) => {
    setCurrentPage(page)
  }
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = productsFilter?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      {
        loading
          ? (
            <Loader />
          )
          : (
            <>
              <Navbar user={user} open={handleClickOpen} close={handleClose} />
              <Filters setCurrentPage={setCurrentPage} />
              {currentProducts.length > 0 ? <ProductsPage currentProducts={currentProducts} /> : (
                <Container sx={{ padding: '5rem', display: 'flex', justifyContent: 'center' }}>
                  <Alert severity="info" sx={{ width: '100%', fontSize: '1.5rem' }}>
                    <AlertTitle>Oops!</AlertTitle>
                    There are no products! <strong>☹</strong>
                  </Alert>
                </Container>
              )}
              <AppPagination currentPage={currentPage} totalProducts={totalProducts} pageSize={pageSize} handlePageChange={handlePageChange} />
              <Footer />
              <AppDrawer />
              <Cart />
              <SearchBox setCurrentPage={setCurrentPage} />
              <Signin open={open} close={handleClose} openRegister={handleOpenRegister} />
              <Signup openLogin={handleClickOpen} open={openRegister} close={handleCloseRegister} />
              <WishList />
            </>
          )
      }

    </>
  )
}

export default Shop