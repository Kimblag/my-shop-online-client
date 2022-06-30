import axios from "axios";
import { addProductProps } from "../../features/favorites/favorites.slice";
import { ProductDocument } from "../../interfaces/products/product.interface";

export type getUserFavoriteProps = {
    userId: string
}
const API_URL = '/api/'

const getUserFavorite = async (userId: string) => {
    // let config = {
    //     headers: {Authorization: `Bearer ${token}`}
    // }
    const response = await axios.get(API_URL + '/wishlist/' + userId)
    console.log(response.data)
    return response.data
}

const addUserFavorite = async ({userId, product}: addProductProps) => {
    // let config = {
    //     headers: {Authorization: `Bearer ${token}`}
    // }
    let favorite = {
        userId: userId,
        favorites: product
    }
    const response = await axios.post(API_URL + '/wishlist/add', favorite )
    return response.data
}

const removeUserFavorite = async (productId: string) => {
    // let config = {
    //     headers: {Authorization: `Bearer ${token}`}
    // }
    console.log(productId)
    const response = await axios.put(API_URL + '/wishlist/remove', {id: productId} )
    console.log(response.data)
    return response.data
}

const wishlistService = {
    getUserFavorite,
    addUserFavorite,
    removeUserFavorite
}

export default wishlistService