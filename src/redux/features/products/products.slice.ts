import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../interfaces/cart/cart.interface';
import { ProductDocument } from '../../interfaces/products/product.interface';
import productService from '../../services/products/products.service';

export interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}
export interface ProductState extends AsyncState {
    products: ProductDocument[] | []
    cart: Cart
    productsFilter: ProductDocument[] | []
    error: any
}

export interface FilterState extends ProductState {
    filter: {
        brand: string,
        category: string,
        order: string
    }
}

const initialState: FilterState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    products: [],
    productsFilter: [],
    filter: {
        brand: 'AllBrands',
        category: 'AllCategories',
        order: 'All'
    },
    cart: [],
    error: ''
}


export const getProducts = createAsyncThunk('product', async (query: string | null, thunkAPI) => {
    try {
        return await productService.getProducts(query);
    } catch (error: any) {
        const message = error.response.data.errors.message || error.response
        return thunkAPI.rejectWithValue(message)
    }
})

const filterByBrand = (products: ProductDocument[], brand: string) => {
    if (brand === 'AllBrands') {
        return products
    } else {
        return products.filter((product: ProductDocument) => product.brand && product.brand.includes(brand))
    }
}

const filterByCategories = (products: ProductDocument[], category: string) => {
    if (category === 'AllCategories') {
        return products
    } else {
        return products.filter((product: ProductDocument) => product.category && product.category.includes(category))
    }
}
type filterType = {
    brand: string
    category: string
    order: string
}
type orderType = {
    brand: string
    category: string
    order: string
}
const sortProductPrices = (array: ProductDocument[], payload: any) => {
    if (payload === 'High') {
        array.sort((a: ProductDocument, b: ProductDocument) => b.price - a.price)
    }
    if (payload === 'Lower') {
        array.sort((a: ProductDocument, b: ProductDocument) => a.price - b.price)
    }
    return array
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filteredProducts(state: FilterState, action: { payload: filterType }) {
            let productsFilterByBrand = filterByBrand(state.products, action.payload.brand)
            let productsFilterByCategory = filterByCategories(productsFilterByBrand, action.payload.category)
            let sorted = sortProductPrices(productsFilterByCategory, state.filter.order)
            state.productsFilter = sorted
            state.filter = {
                ...state.filter,
                brand: action.payload.brand,
                category: action.payload.category,
                order: action.payload.order
            }
        },
        orderedProducts(state: FilterState, action: { payload: orderType }) {
            const previousState = state.productsFilter
            let sorted = sortProductPrices(previousState, action.payload)
            state.productsFilter = sorted
            state.filter = {
                ...state.filter,
                order: action.payload.order
            }
        },
        resetFilters(state: FilterState) {
            state.filter = {
                brand: 'AllBrands',
                category: 'AllCategories',
                order: 'All'
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => ({
                ...state,
                products: action.payload,
                productsFilter: action.payload,
                isLoading: false

            }))
            .addCase(getProducts.rejected, (state, action) => ({
                ...state,
                isError: true,
                error: action.payload
            }))
    }
})

export const { filteredProducts, orderedProducts, resetFilters } = productSlice.actions;
export default productSlice.reducer