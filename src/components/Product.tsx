import React from 'react'
import { Circle, Container, Icon, Image, Info } from '../styles/Product.styles'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'


const Product: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Circle />
      <Image />
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