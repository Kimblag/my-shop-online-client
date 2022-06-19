import React from 'react'
import { Container } from '../styles/Products.styles'
import Product from './Product'

const Products: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Product />
    </Container>
  )
}

export default Products