import { Stack } from 'expo-router'

export default function CameraLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="camera" options={{ title: 'Camera' }} />
            <Stack.Screen name="create-post-screen" options={{ title: 'Create Post' }} />
        </Stack>
    )
}
