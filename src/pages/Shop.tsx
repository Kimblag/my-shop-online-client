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


const Shop: React.FC = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { productsFilter, isSuccess } = useAppSelector(state => state.products)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()


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
              <Navbar />
              <Filters setCurrentPage={setCurrentPage} />
              <ProductsPage currentProducts={currentProducts} />
              <AppPagination currentPage={currentPage} totalProducts={totalProducts} pageSize={pageSize} handlePageChange={handlePageChange} />
              <Footer />
              <AppDrawer />
              <Cart />
              <SearchBox />
            </>
          )
      }

    </>
  )
}

export default Shop