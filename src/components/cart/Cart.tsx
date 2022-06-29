import { Avatar, Button, Divider, Drawer, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Colors } from '../../styles/theme'
import { useUIContext } from '../context/ui'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { addToCart, clearCart, decreaseCart, getTotal } from '../../redux/features/cart/cart.slice'
import { useNavigate } from 'react-router-dom'


const Cart: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { cartTotalAmount, cartTotalQuantity } = useAppSelector(state => state.cart)
    const { showCart, setShowCart } = useUIContext()
    const { cartItems } = useAppSelector(state => state.cart)

    useEffect(() => {
        dispatch(getTotal())
    }, [dispatch])

    const cartContent = cartItems.map(item => (
        <Box key={item._id}>
            <Box display='flex' sx={{ pt: 2, pb: 2 }} alignItems="start" justifyContent='space-between' >
                <Avatar src={item.image} sx={{ width: 96, height: 96 }} />
                <Box display='flex' flexDirection={'column'}>
                    <Typography color={Colors.primary} variant='h6'>{item.name}</Typography>
                    {!matches && <Typography color={Colors.primary} variant='subtitle1'>{item.description}</Typography>}
                    <Typography color={Colors.primary} variant='body1' justifyContent={'end'}>TOTAL: ${item.price * item.quantity}</Typography>
                </Box>
                <Box display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'}>
                    <Button onClick={() => {
                        dispatch(addToCart(item))
                        dispatch(getTotal())
                    }}>
                        <AddIcon />
                    </Button>
                    <Typography>
                        {item.quantity}
                    </Typography>
                    <Button onClick={() => {
                        dispatch(decreaseCart(item))
                        dispatch(getTotal())
                    }}>
                        <RemoveIcon />
                    </Button>
                </Box>
            </Box>
            {matches && <Typography color={Colors.primary} variant='subtitle1'>{item.description}</Typography>}
            <Divider variant='inset' />
        </Box>
    ))

    return (
        <Drawer open={showCart} onClose={() => setShowCart(false)} anchor='right' PaperProps={{ sx: { width: matches ? '100%' : 500, background: Colors.tertiary, borderRadius: 0 } }} >
            {cartItems.length > 0
                ? (<Box
                    sx={{ p: 4 }}
                    display='flex'
                    justifyContent="center"
                    flexDirection={'column'}
                    alignItems='center'
                >
                    <Typography variant='h3' color={Colors.black}>
                        Your Cart
                    </Typography>
                    <Paper elevation={0} sx={{ mt: 2, width: '90%', padding: 4 }}>
                        {cartContent}
                    </Paper>

                    <Paper elevation={0} sx={{ mt: 2, width: '90%', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: "flex-end", alignItems: 'flex-end' }}>
                        <Typography variant='h6' color={Colors.black} >
                            Subtotal: ${cartTotalAmount}
                        </Typography>
                        <Typography variant='h6' color={Colors.black} >
                            Quantity: ${cartTotalQuantity}
                        </Typography>
                    </Paper>

                    <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    <Button sx={{ mt: 4 }} variant='contained' onClick={() => navigate('/checkout')}>
                        Proceed to payment
                    </Button>
                </Box>)
                : (<Box sx={{ p: 4 }}
                    display='flex'
                    justifyContent="center"
                    flexDirection={'column'}
                    alignItems='center'
                >
                    <Typography variant={matches ? 'h5' : 'h4'} color={Colors.black}>
                        Your cart is empty! ☹
                    </Typography>
                </Box>)}
            <Box display='flex' alignItems='center' flexDirection='column' >
                <Button
                    sx={{ m: 2 }}
                    variant="contained"
                    color="secondary" onClick={() => {
                        navigate('/shop')
                        setShowCart(false)
                        }}>
                    ⟵ Go to Shop
                </Button>
                <Button variant="contained" onClick={() => setShowCart(false)}>Close</Button>
            </Box>
        </Drawer>
    )
}

export default Cart