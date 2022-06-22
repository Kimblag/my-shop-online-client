import React from 'react'
import AppDrawer from '../components/drawer/AppDrawer'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import ProductsPage from '../components/products/ProductsPage'
import SearchBox from '../components/search/SearchBox'

const Shop = () => {
  return (
    <>
      <Navbar />
      {/* filters */}
      <ProductsPage />
      <Footer />
      <AppDrawer />
      <SearchBox />
    </>
  )
}

export default Shop