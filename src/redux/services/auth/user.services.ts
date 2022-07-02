import axios from 'axios'

const API_URL = (process.env.REACT_APP_API_URL)

export type userIdType = {
    id: undefined | string
}



const getUserInfo = async (userId: string) => {
    console.log(userId)
    const response = await axios.get(`${API_URL}/api/signin/user/${userId}`)
    return response.data
}

const userService = {
     getUserInfo,
}
export default userService