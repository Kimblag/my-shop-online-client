import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../interfaces/cart/cart.interface';
import { ProductDocument } from '../../interfaces/products/product.interface';
import productService, { Props } from '../../services/products/products.service';

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}
export interface ProductState extends AsyncState {
    products: ProductDocument[]
    cart: Cart
    productsFilter: ProductDocument[]
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
}


export const getProducts = createAsyncThunk('product', async (query: Props) => {
    try {
        return await productService.getProducts(query);
    } catch (error) {
        console.error('Error: ', error)
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
    order: string
}
const sortProductPrices = (array: ProductDocument[], payload: any) => {
    console.log(payload)
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
            console.log(action.payload)
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
            console.log(action.payload)
            const previousState = state.productsFilter
            let sorted = sortProductPrices(previousState, action.payload)
            console.log(sorted)
            state.productsFilter = sorted
            state.filter = {
                ...state.filter,
                order: action.payload.order
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload?.data || []
                state.productsFilter = action.payload?.data || []
                state.filter = {
                    brand: 'AllBrands',
                    category: 'AllCategories',
                    order: 'All'
                }
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.products = []
                state.productsFilter = []
            })
    }
})

export const { filteredProducts, orderedProducts } = productSlice.actions;
export default productSlice.reducer