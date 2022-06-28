import React, { useCallback, useEffect, useState } from 'react'
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


const Shop: React.FC = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { productsFilter, isSuccess } = useAppSelector(state => state.products)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { user } = useAppSelector(state => state.auth)
  console.log(user)

  type userDecodeType = {
    data: {
      exp: number
      iat: number
      id: string
      isAdmin: boolean
    }
  }

  // useEffect(() => {
  //   const userDecode: userDecodeType = JSON.parse(window.localStorage.getItem('user') || '{}')
  //     const userId: string = userDecode?.data?.id
  //     dispatch(getUserInfo(userId))
  //     dispatch(reset())
  // }, [dispatch])


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
      dispatch(getProducts())
      setLoading(false)
    }, 1000);
  }, [dispatch])

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
              <ProductsPage currentProducts={currentProducts} />
              <AppPagination currentPage={currentPage} totalProducts={totalProducts} pageSize={pageSize} handlePageChange={handlePageChange} />
              <Footer />
              <AppDrawer />
              <Cart />
              <SearchBox />
              <Signin open={open} close={handleClose} openRegister={handleOpenRegister} />
              <Signup openLogin={handleClickOpen} open={openRegister} close={handleCloseRegister}/>
            </>
          )
      }

    </>
  )
}

export default Shop