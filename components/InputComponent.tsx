import React, { forwardRef } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'

export type InputComponentProps = TextInputProps & {
    text?: string
    affix?: React.ReactNode
    suffix?: React.ReactNode
    className?: string
    isPassword?: boolean
}

const InputComponent = forwardRef<TextInput, InputComponentProps>(
    (
        { value, onChangeText, text, placeholder, secureTextEntry, affix, suffix, isPassword, className = '', ...rest },
        ref,
    ) => {
        return (
            <View className={className}>
                {text && <Text className="mb-1 ml-4 text-gray-700">{text}</Text>}
                <View className="flex-row items-center py-5 px-[22px] rounded-[10px] border border-neutral-300 mb-[30]">
                    {affix}
                    <TextInput
                        style={{ lineHeight: 20 }}
                        ref={ref}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={isPassword}
                        placeholder={placeholder}
                        placeholderTextColor="gray"
                        className="flex-1 px-5 text-neutral-600 text-base font-normal font-['Montserrat'] leading-none tracking-tight "
                        {...rest}
                    />
                    {suffix}
                </View>
            </View>
        )
    },
)

export default InputComponent
