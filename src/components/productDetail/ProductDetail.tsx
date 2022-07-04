import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Colors } from '../../styles/theme'
import CloseIcon from '@mui/icons-material/Close'
import ReactDOM from 'react-dom'
import { Product, ProductDetailInfoWrapper, ProductDetailWrapper, ProductImage } from '../../styles/products'
import ButtonIncDec from '../ui/ButtonIncDec'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'
import { useAppSelector } from '../../redux/hooks'

export interface IProps {
    open: boolean
    onClose: () => void
    product: ProductDocument
    favorites: Array<string>
    handleWishList: (e: { preventDefault: () => void }) => void
    userId: string | undefined
    local: boolean
}
interface TransitionProps {
    children: React.ReactElement<any, any>;
}

const Transition = React.forwardRef((props: TransitionProps, ref) => (
    <Slide direction="down" ref={ref} {...props} />
));

const ProductDetail: React.FC<IProps> = ({ local, open, onClose, product, favorites, handleWishList, userId }): JSX.Element | null => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const { user } = useAppSelector(state => state.auth)
    const { favoriteItems } = useAppSelector(state => state.wishlist)
    if (user?.data) {
        if (favoriteItems?.data !== undefined && favoriteItems?.data !== null) {
            favoriteItems?.data.forEach(product => favorites.push(product.favorites._id))
        }
    }
    const modal = (
        <Dialog
            TransitionComponent={Transition}
            open={open}
            fullScreen
        >
            <DialogTitle
                sx={{
                    background: Colors.secondary,
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {product.name}
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <ProductDetailWrapper flexDirection={matches ? 'column' : 'row'}>
                <Product sx={{ mr: 8, width: '40%' }}>
                    <ProductImage src={product.image} />
                </Product>
                <ProductDetailInfoWrapper>
                    {/* <Typography variant='subtitle1'>Availability: {product.stock} in stock</Typography> */}
                    <Typography variant='h4' sx={{ lineHeight: 2 }}>{product.name}</Typography>
                    <Typography variant='h5'>${product.price}</Typography>
                    <Typography variant='body1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                    <Box
                        sx={{
                            mt: 4
                        }}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <ButtonIncDec product={product} />
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        sx={{ mt: 4, color: Colors.primary }}
                    >
                        {local === false
                            ? (
                                <Button onClick={(e) => handleWishList(e)} sx={{ width: '200px' }}>
                                    <FavoriteIcon sx={{ mr: 2 }} />
                                    Add to wishlist
                                </Button>
                            )
                            : (
                                <Button onClick={(e) => handleWishList(e)} sx={{ width: '200px' }}>
                                    <FavoriteIcon sx={{ mr: 2 }} />
                                    Remove from wishlist
                                </Button>
                            )
                        }
                    </Box>
                </ProductDetailInfoWrapper>
            </ProductDetailWrapper>
            <DialogContent>
            </DialogContent>
        </Dialog>
    )
    return open ? ReactDOM.createPortal(modal, document.body) : null
}

export default ProductDetail