import { createSlice } from '@reduxjs/toolkit'
import { ProductDocument } from '../../interfaces/products/product.interface'

// export interface FilterState {
//     brand: string
//     category: string
// }
// const initialState: FilterState = {
//     brand: "AllBrands",
//     category: "AllCategories"
// }

// type Filter = FilterState

// const filterByBrand = (filter: Filter, products: ProductDocument[], brand: string, modificationType: 'AllBrands') => {
//     if (brand === 'AllBrands') {
//         return products
//     } else {
//         return products.filter((product: ProductDocument) => product.brand && product.brand.includes(brand))
//     }
// }

// const filterByCategories = (filter: Filter, products: ProductDocument[], category: string, modificationType: 'AllCategories') => {
//     if (category === 'AllCategories') {
//         return products
//     } else {
//         return products.filter((product: ProductDocument) => product.category && product.category.includes(category))
//     }
// }

// const filterSlice = createSlice({
//     name: 'filters',
//     initialState,
//     reducers: {

//     }
// })

// export default filterSlice.reducer