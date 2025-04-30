import { Stack } from 'expo-router'

export default function ModalStackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        ></Stack>
    )
}
