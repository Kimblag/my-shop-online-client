import axios from "axios"

export type Props = {
    query?: string | null | undefined
}
const API_URL = (process.env.REACT_APP_API_URL)

const getProducts = async (query: string | null) => {
    const response = await axios.get(`${API_URL}/api/products/?name=${query ? query : ''}`)
    return response.data
}

const productService = {
    getProducts,
}

export default productService