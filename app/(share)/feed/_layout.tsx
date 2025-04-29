import { Stack } from 'expo-router'

export const FeedLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="collection/[id]" />
            <Stack.Screen name="feed/[id]" />
            <Stack.Screen name="map" />
        </Stack>
    )
}
