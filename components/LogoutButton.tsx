// components/LogoutButton.tsx
import React, { useContext } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { UserContext } from '@/context/AuthContext'
import { setDataStorage } from '@/helpers/storage'
import { router } from 'expo-router'

const LogoutButton = () => {
    const { updateUser } = useContext(UserContext)

    const handleLogout = async () => {
        updateUser(null) // xóa user ở context
        await setDataStorage('account', null) // xóa user ở local storage
        router.replace('/auth/login') // chuyển hướng về trang login
    }

    return (
        <TouchableOpacity onPress={handleLogout} className="p-3 bg-red-500 rounded-xl">
            <Text className="font-bold text-center text-white">Đăng xuất</Text>
        </TouchableOpacity>
    )
}

export default LogoutButton
