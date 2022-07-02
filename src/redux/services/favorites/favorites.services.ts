import axios from "axios";
import { ProductDocument } from "../../interfaces/products/product.interface";

export type getUserFavoriteProps = {
    userId: string
}
const API_URL = (process.env.REACT_APP_API_URL)

const getUserFavorite = async ({userId, token}:{userId: string | undefined, token: string}) => {
    let config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${API_URL}/api/wishlist/${userId}`, config)
    return response.data
}

const addUserFavorite = async ({ userId, product, token }: {userId: string |undefined, product: ProductDocument, token: string}) => {
    let config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    let favorite = {
        userId: userId,
        favorites: product
    }
    const response = await axios.post(`${API_URL}/api/wishlist/add`, favorite, config)
    return response.data
}

const removeUserFavorite = async ({productId, token}: {productId: string, token: string}) => {
    let config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.put(`${API_URL}/api/wishlist/remove`, { id: productId }, config)
    return response.data
}

const wishlistService = {
    getUserFavorite,
    addUserFavorite,
    removeUserFavorite
}

export default wishlistService