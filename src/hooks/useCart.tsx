import React from 'react'
import { useUIContext } from '../components/context/ui'

const useCart = () => {
    const { cart, setCart } = useUIContext()

    // const addToCart = () => {
    //     cart.findIndex(c => c.id === product.id) >= 0
    //     ? setCart(cart.filter((c: ICartProduct) => c.id !== product.id))
    //     : setCart()
    // }
    return (
        <div>useCart</div>
    )
}

export default useCart