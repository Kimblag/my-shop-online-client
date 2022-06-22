import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/products'
import FavoriteIcon from "@mui/icons-material/Favorite"
import FitScreenIcon from "@mui/icons-material/FitScreen"
import ShareIcon from "@mui/icons-material/Share"
import ProductMeta from './ProductMeta'
import { useDialogModal } from '../../hooks/useDialogModal'
import ProductDetail from '../productDetail/ProductDetail'


type Props = {
    product?: any
    matches?: boolean
}


const SingleProductDesktop: React.FC<Props> = ({ product, matches }): JSX.Element => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const handleMouseEnter = () => {
        setShowOptions(true)
    }

    const handleMouseLeave = () => {
        setShowOptions(false)
    }
    const { open, toggle } = useDialogModal()


    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductFavButton isfav={1}>
                    <FavoriteIcon />
                </ProductFavButton>
                {
                    (showOptions) && <ProductAddToCart show={showOptions} variant="contained">
                        Add to cart
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