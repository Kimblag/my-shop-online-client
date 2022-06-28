import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { IResponse } from "../auth/auth.slice";
import { userInfo } from "../../services/auth/auth.services";
import userService, { userIdType } from "../../services/auth/user.services";


//TODO: create user info state
// export interface IUser {
//     name: string
//     lastname: string
//     email: string
//     isVerified: boolean
// }
// export type IUserType = {
//     data: IUser
//     status: string
// }

// interface UserState {
//     response: IUserType | null
//     isError: boolean
//     isLoading: boolean
//     isSuccess: boolean
// }

// const initialState: UserState = {
//     response: null,
//     isError: false,
//     isLoading: false,
//     isSuccess: false
// }


// export const getUserInfo = createAsyncThunk('user/getInfo', async (userId: string, thunkAPI) => {
//     try {
//         return await userService.getUserInfo(userId)
//     } catch (error: any) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         reset: (state: UserState) => {
//             state.isLoading = false
//             state.isError = false
//             state.isSuccess = false
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getUserInfo.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(getUserInfo.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.response = action.payload
//             })
//             .addCase(getUserInfo.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isError = true
//                 state.response = null
//             })
//     }
// })

// export const { reset } = userSlice.actions
// export default userSlice.reducer