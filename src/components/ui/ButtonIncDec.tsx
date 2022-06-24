import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from '../../styles/theme'
import { clamp } from './clamp'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { decrementProduct, incrementProduct } from '../../redux/features/products/products.slice'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'

interface Props {
  product: ProductDocument
}

const ButtonIncDec: React.FC<Props> = ({ product }): JSX.Element => {
  const clampValue = clamp(1, 10)
  const { cart } = useAppSelector(state => state.products)
  const [value, setValue] = useState<number>(0)
  const dispatch = useAppDispatch()
  const countItemsInCart = cart.find(item => item._id === product._id)?.quantity
    
  
  return (
    <Box display='flex'>
      <IconButton
        sx={{ borderRadius: 0, background: `${Colors.secondary}` }}
        onClick={() => {
          setValue(clampValue(value - 1))
          dispatch(decrementProduct(product))
        }}>
        <RemoveIcon />
      </IconButton>
      <Typography
        variant='h6'
        sx={{ border: `1px solid ${Colors.secondary}`, p: 2 }}
      >
        {countItemsInCart}
      </Typography>
      <IconButton
        sx={{ borderRadius: 0, background: `${Colors.secondary}` }}
        onClick={() => {
          setValue(clampValue(value + 1))
          dispatch(incrementProduct(product))
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  )
}

export default ButtonIncDec