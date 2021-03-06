import axios from 'axios'

export type getUserCartProps = {
    userId: string | undefined,
    token: string | null
}
const API_URL = (process.env.REACT_APP_API_URL)

const getUserCart = async ({userId, token}: getUserCartProps) => {
    let config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`${API_URL}/api/order/find/${userId}`, config)
    return response.data
}

const cartService = {
    getUserCart
}

export default cartService