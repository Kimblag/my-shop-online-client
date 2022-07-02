import axios from "axios";
import { getOrderType } from "../../features/orders/orders.slice";

const API_URL = (process.env.REACT_APP_API_URL)

const getUserOrders = async ({userId, token}: getOrderType) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.get(`${API_URL}/api/order/find/${userId}`, config)
    return response.data
}

const ordersService = {
    getUserOrders
}

export default ordersService