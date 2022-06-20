import React from 'react'
import { IProduct } from '../redux/types'
import '../styles/product.css'

type Props = {
  product: IProduct
}

const Product: React.FC<Props> = ({ product }): JSX.Element => {
  return (

    <div>Product</div>
  )
}

export default Product