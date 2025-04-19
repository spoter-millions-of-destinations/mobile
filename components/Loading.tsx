import { LoadingRefresh } from '@/assets/animations'
import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'

const Loading = () => {
    return (
        <View className="items-center justify-start flex-1">
            <LottieView source={LoadingRefresh} loop={true} autoPlay />
        </View>
    )
}

export default Loading
