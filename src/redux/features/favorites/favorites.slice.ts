import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductDocument } from '../../interfaces/products/product.interface';
import wishlistService from '../../services/favorites/favorites.services';

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface FavoriteState extends AsyncState {
    favoriteItems: {
        status: string
        data: [{
            _id: string
            userId: string
            favorites: ProductDocument
        }] | []
    }
    isLoading: false,
    isSuccess: false,
    isError: false,
    userFavorite: {
        userId: string
        favorites: []
    }
}

const initialState: FavoriteState = {
    favoriteItems: {
        status: '',
        data: []
    },
    isLoading: false,
    isSuccess: false,
    isError: false,
    userFavorite: {
        userId: '',
        favorites: []
    }
}
export type addProductProps = {
    userId: string | undefined,
    product: ProductDocument,
    token: string
}

export const getUserFavorites = createAsyncThunk('wishlist/getFavorites', async ({userId, token}:{userId: string | undefined, token: string}, thunkAPI) => {
    try {
        return await wishlistService.getUserFavorite({userId, token})
    } catch (error: any) {
        const message = error.response.data.errors.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

export const addProductFavorites = createAsyncThunk('wishlist/addFavorites', async ({ userId, product, token }: addProductProps, thunkAPI) => {
    try {
        return await wishlistService.addUserFavorite({ userId, product, token })
    } catch (error: any) {
        const message = error.response.data.errors.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})
export const removeProductFavorites = createAsyncThunk('wishlist/removeFavorites', async ({productId, token}: {productId: string, token: string}, thunkAPI) => {
    try {
        return await wishlistService.removeUserFavorite({productId, token})
    } catch (error: any) {
        const message = error.response.data.errors.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

const cartSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        resetFavorite: (state: FavoriteState) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserFavorites.pending, (state) => ({
                ...state
            }))
            .addCase(getUserFavorites.fulfilled, (state, action) => ({
                ...state,
                favoriteItems: action.payload
            }))
            .addCase(getUserFavorites.rejected, (state, action) => ({
                ...state,
                error: action.payload
            }))
            .addCase(addProductFavorites.pending, (state) => ({
                ...state
            }))
            .addCase(addProductFavorites.fulfilled, (state, action) => ({
                ...state,
                userFavorite: action.payload
            }))
            .addCase(addProductFavorites.rejected, (state, action) => ({
                ...state,
                error: action.payload
            }))
            .addCase(removeProductFavorites.pending, (state) => ({
                ...state
            }))
            .addCase(removeProductFavorites.fulfilled, (state, action) => ({
                ...state,
                userFavorite: action.payload
            }))
            .addCase(removeProductFavorites.rejected, (state, action) => ({
                ...state,
                error: action.payload
            }))
    }
})

export const { resetFavorite } = cartSlice.actions;
export default cartSlice.reducer