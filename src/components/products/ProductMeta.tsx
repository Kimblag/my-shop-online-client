import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ProductMetaWrapper } from '../../styles/products'

type Props = {
    product?: any
    matches?: boolean
}

const ProductMeta: React.FC<Props> = ({ product, matches }) => {
    return (
        <ProductMetaWrapper>
            <Box sx={{ minHeight: matches ? '80px' : '' }}>
                <Typography variant={matches ? 'body1' : 'h5'} lineHeight={2}>
                    {product.name}
                </Typography>
            </Box>
            <Typography variant={matches ? 'body1' : 'body1'}>
                ${product.price}
            </Typography>
        </ProductMetaWrapper>
    )
}

export default ProductMeta