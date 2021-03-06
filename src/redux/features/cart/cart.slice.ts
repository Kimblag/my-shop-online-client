import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../interfaces/cart/cart.interface'
import { toast } from 'react-toastify'
import { ProductDocument } from '../../interfaces/products/product.interface';
import cartService, { getUserCartProps } from '../../services/cart/cart.services';
interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface CartState extends AsyncState {
    cartItems: Cart
    cartTotalQuantity: number
    cartTotalAmount: number
    userCart: {
        loading: boolean
        error: string
        status: string,
        data: []
    }
}

const initialState: CartState = {
    cartItems: window.localStorage.getItem('cartItems') ? JSON.parse(window.localStorage.getItem('cartItems') || '[]') : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    userCart: {
        loading: false,
        error: '',
        status: '',
        data: []
    }
}

export const getUserCart = createAsyncThunk('cart/getUserCart', async ({userId, token}: getUserCartProps, thunkAPI) => {
    try {
        return await cartService.getUserCart({userId, token})
    } catch (error: any) {
        const message = error.response.data.errors.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state: CartState, action: { payload: ProductDocument }) {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += 1
            } else {
                const selectedProduct = { ...action.payload, quantity: 1 }
                state.cartItems.push(selectedProduct)
                toast.success(`${action.payload.name} added to cart`, { position: 'bottom-left' })
            }
            window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart(state: CartState, action: { payload: ProductDocument; }) {
            const newCart = state.cartItems.filter(cartItem => cartItem._id !== action.payload._id)
            state.cartItems = newCart
            window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.info(`${action.payload.name} removed from cart`, { position: 'bottom-left' })
        },
        decreaseCart(state: CartState, action: { payload: ProductDocument }) {
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem._id === action.payload._id)
            if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1
            } else if (state.cartItems[itemIndex].quantity === 1) {
                const newCart = state.cartItems.filter(cartItem => cartItem._id !== action.payload._id)
                state.cartItems = newCart
            }
            window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart(state: CartState) {
            state.cartItems = []
            window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        getTotal(state: CartState) {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, quantity } = cartItem;
                const itemTotal = price * quantity
                cartTotal.total += itemTotal
                cartTotal.quantity += quantity
                return cartTotal
            }, {
                total: 0,
                quantity: 0
            })
            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserCart.pending, (state) => ({
                ...state
            }))
            .addCase(getUserCart.fulfilled, (state, action) => ({
                ...state,
                userCart: action.payload
            }))
            .addCase(getUserCart.rejected, (state, action) => ({
                ...state,
                error: action.payload
            }))
    }
})

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotal } = cartSlice.actions;
export default cartSlice.reducer