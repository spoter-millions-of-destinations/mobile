import axios from 'axios'

import { getDataFromStorage } from '@/helpers/storage'
console.log('axiosClient', process.env.EXPO_PUBLIC_API_URL)

const axiosClient = axios.create({
    baseURL: 'https://spoter-be.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = await getDataFromStorage('account')
        if (accessToken && accessToken.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken.accessToken
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data.data
        }

        return response
    },
    (error) => {
        console.error(error)
        if (error.response) {
            console.error('API error:', error.response.data)
            throw error.response.data
        } else {
            console.error('API error:', error.message)
            throw error.message
        }
    },
)

export default axiosClient
