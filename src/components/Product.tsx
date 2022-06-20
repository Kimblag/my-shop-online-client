import React from 'react'
import { Circle, Container, Icon, Image, Info } from '../styles/Product.styles'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { IProduct } from '../redux/types'

type Props = {
  product: IProduct
}

const Product: React.FC<Props> = ({ product }): JSX.Element => {
  return (
    <Container>
      <Circle />
      <Image src={product.image} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  )
}

export default Product