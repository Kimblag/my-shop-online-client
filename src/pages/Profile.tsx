import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Cart from '../components/cart/Cart';
import AppDrawer from '../components/drawer/AppDrawer';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar'
import SearchBox from '../components/search/SearchBox';
import UserProfile from '../components/UserProfile/UserProfile';
import WishList from '../components/wishList/WishList';
import { getUserInfo, reset } from '../redux/features/auth/auth.slice';
import { getUserFavorites, resetFavorite } from '../redux/features/favorites/favorites.slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Colors } from '../styles/theme';

const Profile = () => {
    const dispatch = useAppDispatch()
    const { user, responseEncode } = useAppSelector(state => state.auth)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPage, setCurrentPage] = useState<number>(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [open, setOpen] = useState(false);

    type userDecodeType = {
        exp: number
        iat: number
        id: string
        isAdmin: boolean
    }

    useEffect(() => {
        const userDecode: userDecodeType = JSON.parse(window.localStorage.getItem('user') || '{}')
        const userId: string = userDecode?.id
        dispatch(getUserInfo(userId))
        dispatch(getUserFavorites({userId, token: responseEncode as string}))
        setTimeout(() => {
            dispatch(reset())
            dispatch(resetFavorite())
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
            <UserProfile />
            <Footer />
            <AppDrawer />
            <Cart />
            <SearchBox setCurrentPage={setCurrentPage} />
            <WishList />
        </Box>
    )
}

export default Profile