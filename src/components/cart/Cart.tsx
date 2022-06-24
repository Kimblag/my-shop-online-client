import { Drawer, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { Colors } from '../../styles/theme'
import { useUIContext } from '../context/ui'

const Cart: React.FC = (): JSX.Element => {
    const { showCart, cart, setShowCart } = useUIContext()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const cartContent = cart.map(item => (
        <Box key={item._id}>
            <Box display='flex' sx={{ pt: 2, pb: 2 }} alignItems="start" justifyContent='space-between' >
            </Box>
        </Box>
    ))

    return (
        <Drawer open={showCart} onClose={() => setShowCart(false)} anchor='right' PaperProps={{ sx: { width: 500, background: Colors.tertiary, borderRadius: 0 } }} >
            {cartContent}
        </Drawer>
    )
}

export default Cart