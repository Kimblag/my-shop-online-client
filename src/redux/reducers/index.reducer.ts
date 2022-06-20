import { GET_ALL_PRODUCTS, ProductsAction, ProductsState } from "../types"

const initialState: ProductsState = {
    products: null,
    loading: false,
    error: "",
}

const reducer = (state = initialState, action: ProductsAction) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: ""
            }
        default:
            return state
    }
}

export default reducer