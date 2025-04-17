import { Stack } from 'expo-router'

export default function SuggestLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Suggest' }} />
            <Stack.Screen name="collection_suggest" options={{ title: 'Collection Suggest' }} />
            <Stack.Screen name="detail_suggestion" options={{ title: 'Detail Suggestion' }} />
        </Stack>
    )
}
