import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from '../../styles/theme'
import { clamp } from './clamp'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'
import { addToCart, decreaseCart, getTotal } from '../../redux/features/cart/cart.slice'

interface Props {
  product: ProductDocument
  matches?: boolean
}

const ButtonIncDec: React.FC<Props> = ({ product, matches }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { cartItems } = useAppSelector(state => state.cart)
  const clampValue = clamp(1, 10)
  const [value, setValue] = useState<number>(0)
  const countItemsInCart = cartItems.find(item => item._id === product._id)?.quantity
  console.log(countItemsInCart)
  
  return (
    <Box display='flex' flexDirection={matches ? 'column' : 'row'}>
      <IconButton
        sx={{ borderRadius: 0, background: `${Colors.secondary}` }}
        onClick={() => {
          setValue(clampValue(value - 1))
          dispatch(decreaseCart(product))
          dispatch(getTotal())
        }}
        disabled={false}
        >
        <RemoveIcon />
      </IconButton>
      <Typography
        variant='h6'
        sx={{ border: `1px solid ${Colors.secondary}`, p: 2 }}
      >
        {countItemsInCart ? countItemsInCart : 0}
      </Typography>
      <IconButton
        sx={{ borderRadius: 0, background: `${Colors.secondary}` }}
        onClick={() => {
          setValue(clampValue(value + 1))
          dispatch(addToCart(product))
          dispatch(getTotal())
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  )
}

export default ButtonIncDec