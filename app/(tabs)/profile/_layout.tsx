import { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import UserProfile from './_components/UserProfile'
import Posts from './(tabs)/posts'
import Images from './(tabs)/images'
import Collections from './(tabs)/collections'
import UserImages from './(tabs)/images'
import UserPosts from './(tabs)/posts'
import UserCollections from './(tabs)/collections'
import { ContainerComponent } from '@/components'
import { UserContext } from '@/context/AuthContext'
import ProfileScreen from '.'
import { useLocalSearchParams, usePathname } from 'expo-router'

export default function MyProfileScreen() {
    const { user } = useContext(UserContext)
    const params = useLocalSearchParams()

    const pathname = usePathname()
    console.log('pathname', pathname)

    const isOwnProfile = pathname === '/profile'

    // Nếu là trang profile chính (từ tab), dùng id của người dùng hiện tại
    const profileId = isOwnProfile ? user?.id : Number(params.userId)

    // Đảm bảo có giá trị hợp lệ trước khi render
    if (!profileId) {
        return null // hoặc một loading screen
    }

    return <ProfileScreen userId={profileId} />
}
