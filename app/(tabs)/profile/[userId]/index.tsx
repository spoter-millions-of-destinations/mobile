import { useLocalSearchParams } from 'expo-router'
import ProfileScreen from '..'

export default function OtherUserProfileScreen() {
    const { userId } = useLocalSearchParams()
    console.log('other userId', userId)

    return <ProfileScreen userId={Number(userId as string)} />
}
