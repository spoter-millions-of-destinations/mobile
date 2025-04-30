import { Stack } from 'expo-router'

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'white' },
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="register" />

            <Stack.Screen name="StartScreen" />
            <Stack.Screen name="validation_code" />
        </Stack>
    )
}
