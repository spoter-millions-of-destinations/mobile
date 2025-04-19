import { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import UserProfile from './components/UserProfile'
import Posts from './(tabs)/posts'
import Images from './(tabs)/images'
import Collections from './(tabs)/collections'
import UserImages from './(tabs)/images'
import UserPosts from './(tabs)/posts'
import UserCollections from './(tabs)/collections'
import { ContainerComponent } from '@/components'
import { UserContext } from '@/context/AuthContext'
import ProfileScreen from '.'
import { useLocalSearchParams } from 'expo-router'

export default function MyProfileScreen() {
    const { user } = useContext(UserContext)
    const { userId = user!.id } = useLocalSearchParams()

    return <ProfileScreen userId={userId as number} />
}
