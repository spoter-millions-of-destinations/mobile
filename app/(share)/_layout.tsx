import { Stack } from 'expo-router'

export default function ShareLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="feed/[id]" />
            <Stack.Screen name="collection/[id]" />
        </Stack>
    )
}
