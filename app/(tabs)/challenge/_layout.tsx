import { Stack } from 'expo-router'

export default function ChallengeLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Challenge' }} />
            <Stack.Screen name="[id]" options={{ title: 'Challenge Detail' }} />
        </Stack>
    )
}
