import { Avatar, Button, Divider, Drawer, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addToCart, getTotal } from '../../redux/features/cart/cart.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Colors } from '../../styles/theme';
import { useUIContext } from '../context/ui';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { getUserFavorites, removeProductFavorites } from '../../redux/features/favorites/favorites.slice';
import { toast } from 'react-toastify';
import { ProductDocument } from '../../redux/interfaces/products/product.interface';

const WishList: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { showFavorites, setShowFavorites } = useUIContext()
    const { favoriteItems } = useAppSelector(state => state.wishlist)
    const { user } = useAppSelector(state => state.auth)
    const { cartItems } = useAppSelector(state => state.cart)
    const verifyProductInCart = (id: string, product: ProductDocument) => {
        const isInCart = cartItems.find(item => item._id === id)
        if (isInCart) {
            toast.info('Item already in cart')
        } else {
            dispatch(addToCart(product))
            dispatch(getTotal())
        }
    }

    const favoritesContent = favoriteItems.data?.map(item => (
        <Box key={item._id}>
            <Box display='flex' sx={{ pt: 2, pb: 2 }} alignItems="start" justifyContent='space-between'>
                <Avatar src={item.favorites.image} alt={item.favorites.name} sx={{ width: 96, height: 96 }} />
                <Box display='flex' flexDirection={'column'}>
                    <Typography color={Colors.primary} variant='h6'>{item.favorites.name}</Typography>
                    {!matches && <Typography color={Colors.primary} variant='subtitle1'>{item.favorites.description}</Typography>}
                    <Typography color={Colors.primary} variant='body1' justifyContent='end'>{item.favorites.price}</Typography>
                </Box>
                <Box display='flex' flexDirection={'column'} alignItems='center' justifyContent='center'>
                    <Button
                        onClick={() => {
                            verifyProductInCart(item.favorites._id, item.favorites)
                        }}
                        variant='contained'
                    >
                        <Typography variant='caption'>
                            Add to cart
                        </Typography>
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(removeProductFavorites(item._id))
                            dispatch(getUserFavorites(user?.data?.id as string))
                        }}
                    >
                        <DeleteForeverRoundedIcon />
                    </Button>
                </Box>
            </Box>
            {matches && <Typography color={Colors.primary} variant='subtitle1'>{item.favorites.description}</Typography>}
            <Divider variant='inset' />
        </Box>
    ))


    return (
        <Drawer open={showFavorites} onClose={() => setShowFavorites(false)} anchor='right' PaperProps={{ sx: { width: matches ? '100%' : 500, background: Colors.tertiary, borderRadius: 0 } }}>
            {favoriteItems?.data?.length > 0
                ? (
                    <Box
                        sx={{ p: 4 }}
                        display='flex'
                        justifyContent="center"
                        flexDirection={'column'}
                        alignItems='center'
                    >
                        <Typography variant='h3' color={Colors.black}>
                            Your Favorites
                        </Typography>
                        <Paper elevation={0} sx={{ mt: 2, width: '90%', padding: 4 }}>
                            {favoritesContent}
                        </Paper>
                    </Box>
                )
                : (
                    <Box sx={{ p: 4 }}
                        display='flex'
                        justifyContent="center"
                        flexDirection={'column'}
                        alignItems='center'
                    >
                        <Typography variant={matches ? 'h5' : 'h4'} color={Colors.black}>
                            You don't have any favorites! ☹
                        </Typography>
                    </Box>
                )
            }
            <Box display='flex' alignItems='center' flexDirection='column' >
                <Button
                    sx={{ m: 2 }}
                    variant="contained"
                    color="secondary" onClick={() => {
                        navigate('/shop')
                        setShowFavorites(false)
                    }}>
                    ⟵ Go to Shop
                </Button>
                <Button variant="contained" onClick={() => setShowFavorites(false)}>Close</Button>
            </Box>
        </ Drawer>
    )
}

export default WishList