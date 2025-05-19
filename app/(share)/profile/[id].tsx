import ProfileScreen from '@/app/(tabs)/profile'
import { useLocalSearchParams } from 'expo-router'

export default function OtherUserProfileScreen() {
    const { id } = useLocalSearchParams()
    console.log('other userId', id)
    return <ProfileScreen userId={Number(id as string)} />
}
