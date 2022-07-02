import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Cart from '../components/cart/Cart'
import AppDrawer from '../components/drawer/AppDrawer'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import UserOrders from '../components/orders/UserOrders'
import SearchBox from '../components/search/SearchBox'
import WishList from '../components/wishList/WishList'
import { getUserInfo, reset } from '../redux/features/auth/auth.slice'
import { getUserFavorites, resetFavorite } from '../redux/features/favorites/favorites.slice'
import { getUserOrders, resetOrders } from '../redux/features/orders/orders.slice'
import { getProducts } from '../redux/features/products/products.slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Colors } from '../styles/theme'

const Orders = () => {
    const dispatch = useAppDispatch()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPage, setCurrentPage] = useState<number>(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [open, setOpen] = useState(false);
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
        dispatch(getUserFavorites({ userId, token: responseEncode as string }))
        dispatch(getUserOrders({ userId, token: responseEncode as string }))
        setTimeout(() => {
            dispatch(reset())
            dispatch(resetFavorite())
            dispatch(resetOrders())
        }, 800)
    }, [dispatch, responseEncode])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ backgroundColor: Colors.light_gray }}>
            <Navbar open={handleClickOpen} close={handleClose} user={user} />
            <UserOrders user={userData} />
            <Footer />
            <AppDrawer />
            <Cart />
            <SearchBox setCurrentPage={setCurrentPage} />
            <WishList />
        </Box>
    )
}

export default Orders