import { View, Text } from "react-native";
import React from "react";
import { CheckBox } from "react-native";
const CheckboxComponent = ({ text }) => {
    return (
        <View className="flex-row items-center ">
            <CheckBox className="mr-2" />
            <Text className="text-neutral-400 text-sm font-normal font-['Montserrat']">
                {text}
            </Text>
        </View>
    );
};

export default CheckboxComponent;
