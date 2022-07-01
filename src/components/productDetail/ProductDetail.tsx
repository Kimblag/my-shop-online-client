import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Colors } from '../../styles/theme'
import CloseIcon from '@mui/icons-material/Close'
import ReactDOM from 'react-dom'
import { Product, ProductDetailInfoWrapper, ProductDetailWrapper, ProductImage } from '../../styles/products'
import ButtonIncDec from '../ui/ButtonIncDec'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'

export interface IProps {
    open: boolean
    onClose: () => void
    product: ProductDocument
}
interface TransitionProps {
    children: React.ReactElement<any, any>;
}

const Transition = React.forwardRef((props: TransitionProps, ref) => (
    <Slide direction="down" ref={ref} {...props} />
));

const ProductDetail: React.FC<IProps> = ({ open, onClose, product }): JSX.Element | null => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
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
                    <Typography variant='subtitle1'>Availability: {product.stock} in stock</Typography>
                    <Typography variant='h4' sx={{ lineHeight: 2 }}>{product.name}</Typography>
                    <Typography>${product.price}</Typography>
                    <Typography variant='body1'>
                        {product.description}
                        {product.description}
                        {product.description}
                    </Typography>
                    <Box
                        sx={{
                            mt: 4
                        }}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        {/*//* buttons */}
                        <ButtonIncDec product={product} />

                        {/* <Button variant='contained'>Add to cart</Button> */}
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        sx={{ mt: 4, color: Colors.primary }}
                    >
                        <Button onClick={() => {
                            
                        }} sx={{width: '200px'}}>
                            <FavoriteIcon sx={{ mr: 2 }} />
                            Add to wishlist
                        </Button>
                    </Box>
                    {/* <Box sx={{ mt: 4, color: Colors.primary }}>
                        <Facebook />
                        <Twitter sx={{ pl: theme.spacing(4) }} />
                        <Instagram sx={{ pl: theme.spacing(4) }} />
                    </Box> */}
                </ProductDetailInfoWrapper>
            </ProductDetailWrapper>
            <DialogContent>
            </DialogContent>
        </Dialog>
    )
    return open ? ReactDOM.createPortal(modal, document.body) : null
}

export default ProductDetail