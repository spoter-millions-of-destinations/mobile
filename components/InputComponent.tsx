import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
export type InputComponentProps = {
    value: string;
    onChangeText: (text: string) => void;
    text?: string;
    placeholder: string;
    isPassword?: boolean;
    affix?: React.ReactNode;
    suffix?: React.ReactNode;
    className?: string;
};
const InputComponent = ({
    value,
    onChangeText,
    text,
    placeholder,
    isPassword = false,
    affix = "",
    suffix = "",
    className = ""
}: InputComponentProps) => {
    return (
        <View className={className}>
            <View>
                {text && (
                    <Text className="text-gray-700 mb-1 ml-4">{text}</Text>
                )}
            </View>
            <View className="flex-row items-center py-5 px-[22px] rounded-[10px] border border-neutral-300 mb-[30]">
                {affix && affix}
                <TextInput
                    secureTextEntry={isPassword}
                    value={value}
                    className="flex-1 px-5 text-neutral-600 text-base font-normal font-['Montserrat'] leading-none tracking-tight items-center"
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    placeholderTextColor="gray"
                />
                {suffix && suffix}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default InputComponent;
