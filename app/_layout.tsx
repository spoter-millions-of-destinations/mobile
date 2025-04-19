import { useFonts } from 'expo-font'

import '@/global.css'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { QueryClientProvider } from '@tanstack/react-query'

import { UserProvider } from '@/context/AuthContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { fonts } from '@/assets/fonts/fonts'
import { QueryClient } from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import { Slot } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

const queryClient = new QueryClient()
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded] = useFonts(fonts)

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView className="flex-1">
                <UserProvider>
                    <SafeAreaProvider>
                        <SafeAreaView className="flex-1">
                            <Slot />
                        </SafeAreaView>
                    </SafeAreaProvider>
                    <Toast position="top" />
                </UserProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}
