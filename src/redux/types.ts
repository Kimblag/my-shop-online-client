export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_PRODUCT = 'GET_PRODUCT'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

export interface IReview{
    id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
    productId: string;
}

export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    image: string
    category: Array<string>
    numOfReviews: number
    deleted: boolean
    reviews: IReview[]
}

export interface ProductsState {
    products: IProduct[] | null
    loading: boolean
    error: string | null
}

export interface ProductError {
    cod: string;
    message: string;
}

interface GetProductsAction {
    type: typeof GET_ALL_PRODUCTS;
    payload: IProduct[];
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

export type ProductsAction = GetProductsAction | SetLoadingAction | SetErrorAction;
