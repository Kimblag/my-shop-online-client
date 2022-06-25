import axios from "axios"
import { ProductDocument } from "../../interfaces/products/product.interface"

const getProducts = async () => {
    const response = await axios.get<ProductDocument[]>(`http://localhost:3001/api/products`)
    return response
}

const productService = {
    getProducts,
}

export default productService