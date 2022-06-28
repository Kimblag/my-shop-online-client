import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit'
import productReducer from '../redux/features/products/products.slice'
import cartSlice from './features/cart/cart.slice'
import authReducer from './features/auth/auth.slice'

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartSlice,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store