import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import axiosClient from './axiosClient'

export type User = {
    id: number
    email: string
    name: string
    username: string
    avatar: string
    roles: string[]
    isLocked: boolean
    createdAt: string
    updatedAt: string
}
const userService = {
    getMyInfo: (): Promise<User> => {
        return axiosClient.get('/users/me')
    },
    getUserById: (userId: number): Promise<User> => {
        return axiosClient.get(`/users/${userId}`)
    },
}

export default userService
