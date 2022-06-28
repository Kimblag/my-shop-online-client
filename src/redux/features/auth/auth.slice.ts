import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService, { userData, userLoginData } from '../../services/auth/auth.services'


type tokenType = string | null

export interface IResponse {
    status: string
    data: {
        token?: string
        message: string
    }

}

interface AuthState {
    response: IResponse | null,
    errorMessage: IResponse | unknown | null
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
}

const token: IResponse = JSON.parse(window.localStorage.getItem('user') || '{}')

const initialState: AuthState = {
    response: token ? token : null,
    isError: false,
    errorMessage: null,
    isSuccess: false,
    isLoading: false,
}

//* Register
export const register = createAsyncThunk('auth/register', async (user: userData, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
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
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
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
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.response = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.response = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.response = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.response = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer