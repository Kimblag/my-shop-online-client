import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, CartItem } from '../../interfaces/cart/cart.interface';
import { ProductDocument } from '../../interfaces/products/product.interface';
import productService from '../../services/products/products.service';

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}
interface ProductState extends AsyncState {
    products: ProductDocument[]
    cart: Cart
}

const initialState: ProductState = {
    products: [],
    cart: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

const modifyQuantityByOne = (cart: Cart, selectedProduct: ProductDocument, modificationType: 'INCREMENT' | 'DECREMENT') => {
    const previousCart = [...cart]
    const productInCart = previousCart.find(product => product._id === selectedProduct._id)
    let newCart = [];
    if (!productInCart) {
        previousCart.push({ ...selectedProduct, quantity: 1 })
        newCart = previousCart
    } else {
        const filteredCart = previousCart.filter(item => item._id !== productInCart._id)
        const modification = modificationType === 'INCREMENT' ? 1 : -1;
        productInCart.quantity = productInCart.quantity + modification;
        if (productInCart.quantity === 0) {
            newCart = [...filteredCart]
        } else {
            newCart = [...filteredCart, productInCart]
        }
    }
    return newCart
}
const removeAllCartItems = (cart: Cart, selectedProduct: ProductDocument, modificationType: 'DELETE_ALL') => {
    const previousCart = [...cart]
    const productInCart = previousCart.find(product => product._id === selectedProduct._id)
    let newCart: CartItem[] = [];
    if (productInCart) {
        const filteredCart = previousCart.filter(item => item._id !== productInCart._id)
        newCart = [...filteredCart]
    }
    return newCart
}

export const getProducts = createAsyncThunk('product', async () => {
    try {
        return await productService.getProducts();
    } catch (error) {
        console.error('Error: ', error)
    }
})



export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        incrementProduct: (state: { cart: Cart; }, action: PayloadAction<ProductDocument>) => {
            const modifiedCart = modifyQuantityByOne(state.cart, action.payload, 'INCREMENT')
            state.cart = modifiedCart
        },
        decrementProduct: (state: { cart: Cart; }, action: PayloadAction<ProductDocument>) => {
            const modifiedCart = modifyQuantityByOne(state.cart, action.payload, 'DECREMENT')
            state.cart = modifiedCart
        },
        deleteProduct: (state: {cart: Cart}, action: PayloadAction<ProductDocument> ) => {
            const modifiedCart = removeAllCartItems(state.cart, action.payload, 'DELETE_ALL')
            state.cart = modifiedCart
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload?.data || []
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.products = []
            })
    }
})

export const { incrementProduct, decrementProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer