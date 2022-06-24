import React, { useEffect, useState } from 'react'
import AppDrawer from '../components/drawer/AppDrawer'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import AppPagination from '../components/appPagination/AppPagination'
import ProductsPage from '../components/products/ProductsPage'
import SearchBox from '../components/search/SearchBox'
import { Container } from '@mui/material';
import Cart from '../components/cart/Cart';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getProducts } from '../redux/features/products/products.slice'


const Shop: React.FC = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const state = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()
  console.log(state)
  
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const totalProducts = state.products.length
  const pageSize = 8

  const handlePageChange = (e: any, page: number) => {
    setCurrentPage(page)
  }
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = state.products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Navbar />
      {/* filters */}
      <Container> Filters</Container>
      <ProductsPage currentProducts={currentProducts} />
      <AppPagination currentPage={currentPage} totalProducts={totalProducts} pageSize={pageSize} handlePageChange={handlePageChange} />
      <Footer />
      <AppDrawer />
      <Cart />
      <SearchBox />
    </>
  )
}

export default Shop