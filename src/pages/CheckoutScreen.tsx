import React, { useEffect, useState } from 'react'
import Checkout from '../components/checkout/Checkout'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import { getUserInfo, reset } from '../redux/features/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

const CheckoutScreen = () => {

    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')

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
        dispatch(reset())
    }, [dispatch, userId])
  return (
    <div>
      <Checkout />
      <Footer />
    </div>
  )
}

export default CheckoutScreen