import { Stack } from 'expo-router'
export default function CollectionLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="create_collection"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="save"
                options={{
                    headerShown: false,
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                    presentation: 'modal',
                }}
            />
        </Stack>
    )
}
