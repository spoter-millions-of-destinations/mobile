import { LoadingRefresh } from "@/assets/animations";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

const Loading = () => {
    return (
        <View className="flex-1 items-center justify-start">
            <LottieView source={LoadingRefresh} loop={true} autoPlay />
        </View>
    );
};

export default Loading;
