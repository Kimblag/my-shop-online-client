import React, { useEffect } from 'react'
import Checkout from '../components/checkout/Checkout'
import Footer from '../components/footer/Footer'
import { getUserInfo, reset } from '../redux/features/auth/auth.slice'
import { getUserFavorites, resetFavorite } from '../redux/features/favorites/favorites.slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

const CheckoutScreen = () => {
  const { responseEncode } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  type userDecodeType = {
    exp: number
    iat: number
    id: string
    isAdmin: boolean

  }
  const userDecode: userDecodeType = JSON.parse(window.localStorage.getItem('user') || '{}')
  const userId: string = userDecode?.id

  useEffect(() => {
    dispatch(getUserInfo(userId))
    dispatch(getUserFavorites({userId, token: responseEncode as string}))
    setTimeout(() => {
      dispatch(reset())
      dispatch(resetFavorite())
    }, 800)
  }, [dispatch, responseEncode, userId])
  return (
    <div>
      <Checkout />
      <Footer />
    </div>
  )
}

export default CheckoutScreen