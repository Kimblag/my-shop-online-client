import { Container, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/actions/index.actions'
import { IAppDispatch, RootState } from '../../redux/store/index.store'
import React, { useEffect } from 'react'
import SingleProduct from './SingleProduct'
import SingleProductDesktop from './SingleProductDesktop'


const ProductsPage: React.FC = (): JSX.Element => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch: IAppDispatch = useDispatch()
    const products = useSelector((state: RootState) => state.reducer.products)

  return (
    <div>ProductsPage</div>
  )
}

export default ProductsPage