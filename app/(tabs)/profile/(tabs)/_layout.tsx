import { Tabs } from 'expo-router'
import { View, ScrollView } from 'react-native'
import UserProfile from '../_components/UserProfile'

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: '#fff' },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#888',
            }}
        >
            <Tabs.Screen name="posts" options={{ title: 'Posts' }} />
            <Tabs.Screen name="images" options={{ title: 'Images' }} />
            <Tabs.Screen name="collections" options={{ title: 'Collections' }} />
        </Tabs>
    )
}
