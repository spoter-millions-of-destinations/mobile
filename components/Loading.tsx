import { LoadingRefresh } from '@/assets/animations'
import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'

const Loading = () => {
    return (
        <View className="items-center justify-start flex-1">
            <LottieView style={{ width: 200, height: 200 }} source={LoadingRefresh} loop={true} autoPlay />
        </View>
    )
}

export default Loading
