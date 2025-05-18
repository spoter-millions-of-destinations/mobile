import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'

import { Loading } from '@/components'
import { useHideBottonTab } from '@/hooks'
import { useLocalSearchParams } from 'expo-router'
import { WebView } from 'react-native-webview'
const StripeScreen = () => {
    const { data: uri } = useLocalSearchParams<{ data: string }>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)

    useHideBottonTab()
    if (!uri) {
        return (
            <SafeAreaView className="items-center justify-center flex-1">
                <Text className="font-medium text-red-500">Error: Missing payment URL</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView className="flex-1">
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
            />
        </SafeAreaView>
    )
}

export default StripeScreen
