import axios from "axios"
import { ProductDocument } from "../../interfaces/products/product.interface"

export type Props = {
    query?: string | null | undefined
}

const getProducts = async (query: Props) => {
    const response = await axios.get<ProductDocument[]>(`http://localhost:3001/api/products/?name=${query ? query : ''}`)
    return response
}

const productService = {
    getProducts,
}

export default productService