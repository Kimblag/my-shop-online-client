import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar'
import UserProfile from '../components/UserProfile/UserProfile';
import { getUserInfo, reset } from '../redux/features/auth/auth.slice';
import { getUserFavorites, resetFavorite } from '../redux/features/favorites/favorites.slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Colors } from '../styles/theme';

const Profile = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)

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
        dispatch(getUserFavorites(userId))
        setTimeout(() => {
            dispatch(reset())
            dispatch(resetFavorite())
          }, 800)
    }, [dispatch])

    return (
        <Box sx={{ backgroundColor: Colors.light_gray }}>
            <Navbar user={user} />
            <UserProfile />
            <Footer />
        </Box>
    )
}

export default Profile