import { Typography } from '@mui/material'
import React from 'react'
import { ProductMetaWrapper } from '../../styles/products'

type Props = {
    product?: any
    matches?: boolean
}

const ProductMeta: React.FC<Props> = ({ product, matches }) => {
    return (
        <ProductMetaWrapper>
            <Typography variant={matches ? 'h6' : 'h5'} lineHeight={2}>
                {product.name}
            </Typography>
            <Typography variant={matches ? 'caption' : 'body1'}>
                ${product.price}
            </Typography>
        </ProductMetaWrapper>
    )
}

export default ProductMeta