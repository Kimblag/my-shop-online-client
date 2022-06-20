import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/actions/index.actions'
import { IAppDispatch, RootState } from '../redux/store/index.store'
import { IProduct } from '../redux/types'
import { Container } from '../styles/Products.styles'
import Product from './Product'

const Products: React.FC = (): JSX.Element => {
  const dispatch: IAppDispatch = useDispatch()
  const products: any = useSelector((state: RootState) => state.reducer.products)
  const loading: boolean = useSelector((state: RootState) => state.reducer.loading)
  const error = useSelector((state: RootState) => state.reducer.error)

  useEffect(() =>{
    dispatch(getAllProducts())
  }, [dispatch])
  
  var count = 1
  return (
    <Container>
      {
        loading ? <h1>Loading...</h1> : products && products.map((product: IProduct) => <Product key={count++} product={product} />)
      }
    </Container>
  )
}

export default Products