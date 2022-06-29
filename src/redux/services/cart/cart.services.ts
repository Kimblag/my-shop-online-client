import axios from 'axios'
import { IResponse } from '../../features/auth/auth.slice'
import { userIdType } from '../auth/user.services'

export type getUserCartProps = {
    userId: string | undefined,
    token: IResponse
}
const API_URL = '/api/'

const getUserCart = async ({userId, token}: getUserCartProps) => {
    let config = {
        headers: {Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(API_URL + 'order/find/' + userId, config)
    console.log(response.data)
    return response.data
}

const cartService = {
    getUserCart
}

export default cartService