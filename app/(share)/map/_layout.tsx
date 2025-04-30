import { Stack } from 'expo-router'

export default function MapLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen
                name="attraction_pin"
                options={{
                    headerShown: false,
                    presentation: 'formSheet',

                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="post_pin"
                options={{
                    headerShown: false,
                    presentation: 'formSheet',
                    sheetAllowedDetents: 'fitToContents',
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
        </Stack>
    )
}
