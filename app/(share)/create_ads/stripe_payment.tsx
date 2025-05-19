import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { WebView } from 'react-native-webview'
import { Loading } from '@/components'
import { useHideBottonTab } from '@/hooks'
import { usePaymentStore } from '@/store/usePaymentStore'

const StripeScreen = () => {
    const { data: uri } = useLocalSearchParams<{ data: string }>()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [redirecting, setRedirecting] = useState(false)

    useHideBottonTab()
    const { setPaymentStatus } = usePaymentStore()
    const handleNavigationChange = (navState: any) => {
        const url = navState.url
        if (url.includes('success-page/success') || url.includes('success-page/error')) {
            setPaymentStatus(true)
            setRedirecting(true)
            setTimeout(() => {
                router.replace('/(share)/create_ads')
            }, 3000)
        }
    }

    if (!uri) {
        return (
            <SafeAreaView className="items-center justify-center flex-1">
                <Text className="font-medium text-red-500">Error: Missing payment URL</Text>
            </SafeAreaView>
        )
    }

    if (redirecting) {
        return (
            <SafeAreaView className="items-center justify-center flex-1 bg-white">
                <Text className="text-lg font-medium text-neutral-600">Redirecting to your profile...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            {isLoading && (
                <View className="absolute z-10 items-center justify-center w-full h-full bg-white">
                    <Loading />
                    <Text className="mt-4 text-neutral-600">Loading payment page...</Text>
                </View>
            )}

            {hasError && (
                <View className="absolute z-10 items-center justify-center w-full h-full bg-white">
                    <Text className="px-4 text-center text-red-500">
                        There was an error loading the payment page. Please try again.
                    </Text>
                </View>
            )}

            <WebView
                source={{ uri }}
                style={{ flex: 1 }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true)
                    setIsLoading(false)
                }}
                onNavigationStateChange={handleNavigationChange}
            />
        </SafeAreaView>
    )
}

export default StripeScreen
