import { Stack } from '@mui/material'
import React from 'react'
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/products'
import FavoriteIcon from "@mui/icons-material/Favorite"
import FitScreenIcon from "@mui/icons-material/FitScreen"
import ShareIcon from "@mui/icons-material/Share"
import ProductMeta from './ProductMeta'
type Props = {
    product?: any
    matches?: boolean
}

const SingleProduct: React.FC<Props> = ({ product, matches }): JSX.Element => {
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
                    <ProductActionButton>
                        <ShareIcon />
                    </ProductActionButton>
                    <ProductActionButton>
                        <FitScreenIcon />
                    </ProductActionButton>
                </Stack>
            </ProductActionsWrapper>
            <ProductAddToCart variant="contained">Add to Cart</ProductAddToCart>
        </Product>
        </>
    )
}

export default SingleProduct