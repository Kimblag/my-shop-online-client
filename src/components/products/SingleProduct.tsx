import { Stack } from '@mui/material'
import React from 'react'
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/products'
import FavoriteIcon from "@mui/icons-material/Favorite"
import FitScreenIcon from "@mui/icons-material/FitScreen"
// import ShareIcon from "@mui/icons-material/Share"
import ProductMeta from './ProductMeta'
import { useDialogModal } from '../../hooks/useDialogModal'
import ProductDetail from '../productDetail/ProductDetail'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToCart, getTotal, removeFromCart } from '../../redux/features/cart/cart.slice'
import { useEffect } from 'react'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'

type Props = {
    product?: any
    matches?: boolean
}

const SingleProduct: React.FC<Props> = ({ product, matches }): JSX.Element => {
    const { open, toggle } = useDialogModal()
    const dispatch = useAppDispatch()
    const { cartItems } = useAppSelector(state => state.cart)
    const addToCartText = cartItems.findIndex(item => item._id === product._id) >= 0 ? 'Remove from cart' : 'Add to cart'
    useEffect(() => {
        dispatch(getTotal())
    }, [dispatch])
    const handleAddProduct = (product: ProductDocument) => {
        dispatch(addToCart(product))
        dispatch(getTotal())
    }
    const handleRemoveProduct = (product: ProductDocument) => {
        dispatch(removeFromCart(product))
        dispatch(getTotal())
    }
    return (
        <>
            <Product>
                <ProductImage src={product.image} alt={product.name} />
                <ProductMeta product={product} matches={matches} />
                <ProductActionsWrapper>
                    <Stack direction='row'>
                        <ProductFavButton isfav={1}>
                            <FavoriteIcon />
                        </ProductFavButton>
                        {/* <ProductActionButton>
                            <ShareIcon />
                        </ProductActionButton> */}
                        <ProductActionButton onClick={toggle}>
                            <FitScreenIcon />
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
                <ProductAddToCart onClick={() => addToCartText === 'Add to cart' ? handleAddProduct(product) : handleRemoveProduct(product)} variant="contained" >{addToCartText}</ProductAddToCart>
            </Product>
            <ProductDetail open={open} onClose={toggle} product={product} />
        </>
    )
}

export default SingleProduct