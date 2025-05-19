import { useHideBottonTab } from '@/hooks'
import { Stack } from 'expo-router'

export default function CameraLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="create-post-screen"
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
