import axios from "axios"
import { ProductDocument } from "../../interfaces/products/product.interface"

export type Props = {
    query?: string | null | undefined
}
const API_URL = '/api/'

const getProducts = async (query: string | null) => {
    const response = await axios.get<ProductDocument[]>(`${API_URL}products/?name=${query ? query : ''}`)
    return response
}

const productService = {
    getProducts,
}

export default productService