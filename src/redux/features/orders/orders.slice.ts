import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { OrderItem } from '../../interfaces/orders/orders.interfaces';
import ordersService from '../../services/orders/orders.services';
import { AsyncState } from '../products/products.slice';

export interface OrderState extends AsyncState {
    error: any
    userData: {
        status: string
        data: Array<OrderItem>

    }
}

const initialState: OrderState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: '',
    userData: {
        status: '',
        data: []
    }
}

export type getOrderType = {
    userId: string | undefined
    token: string
}

export const getUserOrders = createAsyncThunk('orders/getUserOrders', async ({ userId, token }: getOrderType, thunkAPI) => {
    try {
        return await ordersService.getUserOrders({ userId, token })
    } catch (error: any) {
        const message = error.response.data.errors.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrders: (state: OrderState) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserOrders.pending, (state) => ({
                ...state,
                isLoading: true
            }))
            .addCase(getUserOrders.fulfilled, (state, action) => ({
                ...state,
                isLoading: false,
                userData: action.payload
            }))
            .addCase(getUserOrders.rejected, (state, action) => ({
                ...state,
                error: action.payload,
                isError: true
            }))
    },
})


export const { resetOrders } = orderSlice.actions
export default orderSlice.reducer