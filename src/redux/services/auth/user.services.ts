import axios from 'axios'

const API_URL = '/api/'

export type userIdType = {
    id: string
}



const getUserInfo = async (userId: string) => {
    const response = await axios.get(API_URL + 'signin/user/' + userId)
    return response.data
}

const userService = {
     getUserInfo,
}
export default userService