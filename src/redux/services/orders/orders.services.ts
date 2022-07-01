import axios from "axios";
import { getOrderType } from "../../features/orders/orders.slice";

const API_URL = '/api/'

const getUserOrders = async ({userId, token}: getOrderType) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.get(API_URL + 'order/find/' + userId, config)
    console.log(response)
    return response.data
}

const ordersService = {
    getUserOrders
}

export default ordersService