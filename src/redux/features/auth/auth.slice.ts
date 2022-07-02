import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService, { userData, userLoginData } from '../../services/auth/auth.services'
import userService from '../../services/auth/user.services'


export interface IResponse {
    status: string
    data: {
        token?: string
        message: string
    }
}
export interface IUser {
    name: string
    lastname: string
    email: string
    isVerified: boolean
    id: string
    address: {
        country: string
        city: string
        street: string
        zip: string
        province: string
    }
    shippingAddress: {
        country: string
        city: string
        street: string
        zip: string
        province: string
    }
}
export type IUserType = {
    data: IUser
    status: string
}

interface AuthState {
    response: IResponse | null,
    responseEncode: string | null
    errorMessageLogin: IResponse | unknown | null
    errorMessageRegister: IResponse | unknown | null
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    user: IUserType | null
}

const user: IResponse = JSON.parse(window.localStorage.getItem('user') || '{}')
const token: string = JSON.parse(window.localStorage.getItem('token') || '{}')

const initialState: AuthState = {
    response: user ? user : null,
    responseEncode: token ? token : null,
    isError: false,
    errorMessageLogin: null,
    errorMessageRegister: null,
    isSuccess: false,
    isLoading: false,
    user: null
}

//* Register
export const register = createAsyncThunk('auth/register', async (user: userData, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error: any) {
        console.error(error?.response?.data.errors.message)
        let message = error?.response?.data.errors.message || error?.response
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const login = createAsyncThunk('auth/login', async (user: userLoginData, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error: any) {
        console.error(error?.response?.data.errors.message)
        let message = error?.response?.data.errors.message || error?.response
        return thunkAPI.rejectWithValue(message)
        // return message
    }
})

export const getUserInfo = createAsyncThunk('user/getInfo', async (userId: string, thunkAPI) => {
    try {
        console.log(userId)
        return await userService.getUserInfo(userId)
    } catch (error: any) {
        const message = error.response.data.errors.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state: AuthState) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => ({
                ...state,
                isLoading: true
            }))
            .addCase(register.fulfilled, (state, action) => ({
                ...state,
                isLoading: false,
                isSuccess: true,
                response: action.payload
            }))
            .addCase(register.rejected, (state, action) => ({
                ...state,
                isError: true,
                errorMessageRegister: action.payload,
            }))
            .addCase(login.pending, (state) => ({
                ...state,
                isLoading: true
            }))
            .addCase(login.fulfilled, (state, action) => ({
                ...state,
                isSuccess: true,
                response: action.payload,
                responseEncode: JSON.parse(window.localStorage.getItem('token') || ''),
                errorMessageLogin: null
            }))
            .addCase(login.rejected, (state, action) => ({
                ...state,
                isError: true,
                errorMessageLogin: action.payload,
            }))
            .addCase(logout.fulfilled, (state) => ({
                ...state,
                response: null,
                responseEncode: null,
                user: null,
            }))
            .addCase(getUserInfo.pending, (state) => ({
                ...state,
                isLoading: true
            }))
            .addCase(getUserInfo.fulfilled, (state, action) => ({
                ...state,
                isLoading: false,
                isSuccess: true,
                user: action.payload,
            }))
            .addCase(getUserInfo.rejected, (state, action) => ({
                ...state,
                isError: true,
            }))
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer