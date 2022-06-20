import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import reducer from "../reducers/index.reducer"
import { ProductsAction } from '../types'

const rootReducer = combineReducers({
    reducer
})
export type IAppActions = ProductsAction
export type IAppState = ReturnType<typeof rootReducer>
export type IAppDispatch = ThunkDispatch<IAppState, unknown, IAppActions>
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware<IAppDispatch, any>(thunkMiddleware as ThunkMiddleware<IAppState, IAppActions, any>)))
export type RootState = ReturnType<typeof rootReducer>;

export default store;