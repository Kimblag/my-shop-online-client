import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import UserOrders from '../components/orders/UserOrders'
import { getUserInfo, reset } from '../redux/features/auth/auth.slice'
import { getUserFavorites, resetFavorite } from '../redux/features/favorites/favorites.slice'
import { getUserOrders, resetOrders } from '../redux/features/orders/orders.slice'
import { getProducts } from '../redux/features/products/products.slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Colors } from '../styles/theme'

const Orders = () => {
    const dispatch = useAppDispatch()
    const { user, responseEncode } = useAppSelector(state => state.auth)
    const { userData } = useAppSelector(state => state.orders)

    type userDecodeType = {
        exp: number
        iat: number
        id: string
        isAdmin: boolean
    }

    useEffect(() => {
        const userDecode: userDecodeType = JSON.parse(window.localStorage.getItem('user') || '{}')
        const userId: string = userDecode?.id
        dispatch(getProducts(null))
        dispatch(getUserInfo(userId))
        dispatch(getUserFavorites(userId))
        dispatch(getUserOrders({userId, token: responseEncode as string}))
        setTimeout(() => {
            dispatch(reset())
            dispatch(resetFavorite())
            dispatch(resetOrders())
        }, 800)
    }, [dispatch, responseEncode])
    
    return (
        <Box sx={{ backgroundColor: Colors.light_gray }}>
            <Navbar user={user} />
            <UserOrders user={userData} />
            <Footer />
        </Box>
    )
}

export default Orders