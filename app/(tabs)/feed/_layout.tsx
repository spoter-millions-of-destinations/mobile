import { Stack } from 'expo-router'

export default function FeedLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Ẩn header mặc định, bạn có thể tùy chỉnh nếu cần
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Feed' }} />
            <Stack.Screen name="[id]" options={{ title: 'Post Detail' }} />
        </Stack>
    )
}
