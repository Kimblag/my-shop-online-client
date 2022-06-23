import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProducts } from '../redux/actions/index.actions';
import { IAppDispatch, RootState } from '../redux/store/index.store';
import AppDrawer from '../components/drawer/AppDrawer'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import AppPagination from '../components/appPagination/AppPagination'
import ProductsPage from '../components/products/ProductsPage'
import SearchBox from '../components/search/SearchBox'
import { IProduct } from '../redux/types';
import { Container } from '@mui/material';


const Shop: React.FC = (): JSX.Element => {
  const dispatch: IAppDispatch = useDispatch()
  const products = useSelector((state: RootState) => state.reducer.products)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const totalProducts = products?.length
  const pageSize = 8

  const handlePageChange = (e: any, page: number) => {
    setCurrentPage(page)
  }
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts: IProduct[] | undefined = products?.slice(
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
      <SearchBox />
    </>
  )
}

export default Shop