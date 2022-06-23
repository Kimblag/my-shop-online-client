import { Container, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { IProduct } from '../../redux/types'
import SingleProduct from './SingleProduct'
import SingleProductDesktop from './SingleProductDesktop'

interface Props {
  currentProducts: IProduct[] | undefined
}

const ProductsPage: React.FC<Props> = ({ currentProducts }): JSX.Element => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  var idInc: number = 1
  const renderProducts = currentProducts?.map(product => (
    <Grid item key={idInc++} xs={2} sm={4} md={4} display="flex" flexDirection="column" alignItems="center">
      {matches ? <SingleProduct product={product} matches={matches} /> : <SingleProductDesktop product={product} matches={matches} />}

    </Grid>
  ))
  return (
    <Container>
      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center' sx={{ margin: '20px 4px 10px 4px' }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {renderProducts}
      </Grid>
    </Container>
  )
}

export default ProductsPage