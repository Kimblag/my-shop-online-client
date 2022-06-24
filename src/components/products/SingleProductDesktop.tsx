import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/products'
import FavoriteIcon from "@mui/icons-material/Favorite"
import FitScreenIcon from "@mui/icons-material/FitScreen"
import ShareIcon from "@mui/icons-material/Share"
import ProductMeta from './ProductMeta'
import { useDialogModal } from '../../hooks/useDialogModal'
import ProductDetail from '../productDetail/ProductDetail'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { decrementProduct, deleteProduct, incrementProduct } from '../../redux/features/products/products.slice'
import { ProductDocument } from '../../redux/interfaces/products/product.interface'


type Props = {
    product: ProductDocument
    matches?: boolean
}


const SingleProductDesktop: React.FC<Props> = ({ product, matches }): JSX.Element => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const handleMouseEnter = () => setShowOptions(true)
    const handleMouseLeave = () => setShowOptions(false)
    const { open, toggle } = useDialogModal()
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector(state => state.products)
    const addToCartText = cart.findIndex(item => item._id === product._id) >= 0 ? 'Remove from cart' : 'Add to cart'

    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductFavButton isfav={1}>
                    <FavoriteIcon />
                </ProductFavButton>
                {
                    (showOptions) && <ProductAddToCart onClick={() => addToCartText === 'Add to cart' ? dispatch(incrementProduct(product)) : dispatch(deleteProduct(product))} show={showOptions} variant="contained">
                        {addToCartText}
                    </ProductAddToCart>
                }
                <ProductActionsWrapper show={showOptions}>
                    <Stack direction='column'>
                        <ProductActionButton>
                            <ShareIcon />
                        </ProductActionButton>
                        <ProductActionButton onClick={toggle}>
                            <FitScreenIcon />
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductMeta product={product} matches={matches} />
            <ProductDetail open={open} onClose={toggle} product={product} />

        </>
    )
}

export default SingleProductDesktop