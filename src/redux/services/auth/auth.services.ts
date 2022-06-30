import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { IResponse } from '../../features/auth/auth.slice'

const API_URL = '/api/'
export type userData = {
    name: string,
    lastname: string,
    email: string,
    password: string
}
export type userLoginData = {
    email: string,
    password: string
}

export type userInfo = {
    id: string,
    isAdmin: boolean,
}

const register = async (userData: userData) => {
    const response = await axios.post<IResponse>(API_URL + 'register', userData)
    return response.data
}

const login = async (userData: userLoginData) => {
    let response = await axios.post<IResponse>(API_URL + 'signin', userData)
    var decoded: userInfo = jwtDecode(response.data.data.token || '')
    localStorage.setItem('user', JSON.stringify( decoded ))
    localStorage.setItem('token', JSON.stringify( response.data.data.token || '' ))

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService