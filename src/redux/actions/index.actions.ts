import axios from 'axios'
import { Dispatch } from "redux";
import { IProduct, ProductError, ProductsAction, SET_ERROR } from "../types";

export const getAllProducts = () => {
    return async (dispatch: Dispatch<ProductsAction>) => {
        try {
            const response = await axios.get('http://localhost:3001/api/products')
            if(!response){
                const responseData: ProductError = response
                throw new Error(responseData.message)
            }
            const responseData: IProduct[] = response.data
            dispatch({
                type: 'GET_ALL_PRODUCTS',
                payload: responseData
            })
        } catch (error: any) {
            dispatch({
                type: SET_ERROR,
                payload: error.message || error
            })
        }
    }
}