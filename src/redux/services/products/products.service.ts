import axios from "axios"
import { CartItem } from "../../interfaces/cart/cart.interface"
import { ProductDocument } from "../../interfaces/products/product.interface"

const getProducts = async () => {
    const response = await axios.get<ProductDocument[]>(`http://localhost:3001/api/products`)
    return response
}

const addProductToCart = async (payload: any) => {
    console.log(payload)
    // const response = await axios.post<ProductDocument>(`http://localhost:3001/api/cart`, payload)
    // return response
    return payload
}

const productService = {
    getProducts,
    addProductToCart,
}

export default productService