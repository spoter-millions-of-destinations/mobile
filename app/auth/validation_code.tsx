import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useForm, Controller, set } from 'react-hook-form'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { Ionicons } from '@expo/vector-icons'
import { color } from '@/constants/Colors'
import * as Progress from 'react-native-progress'
import { Back } from '@/assets/images/Button'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

const CELL_COUNT = 6

const VerificationScreen = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            code: '',
        },
    })

    const ref = useBlurOnFulfill({ value: '', cellCount: CELL_COUNT })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: '',
        setValue: () => {},
    })

    const onSubmit = (data: { code: string }) => {
        console.log('Verification code entered:', data.code)
        // You can add API verification here

        Toast.show({
            type: 'success',
            text1: 'Verification Successful',
            text2: 'Your account has been verified successfully.',
        })
        setTimeout(() => {
            router.replace('/auth/login')
        }, 2000)
    }

    return (
        <View className="flex-1 px-5 bg-white pt-14">
            {/* Header */}
            <View className="flex-row items-center gap-x-5 mb-[30px]">
                <Back />
                <Text className="text-neutral-800 text-base font-semibold font-['Montserrat'] leading-none ">
                    Create a new account
                </Text>
            </View>

            <Progress.Bar progress={2 / 3} width={null} color="#262626" animationType="timing" className="mb-[40px]" />

            <Text className="mb-4 text-base text-gray-800">Enter the verification code we sent to your email</Text>

            <Controller
                control={control}
                name="code"
                rules={{ required: true, minLength: CELL_COUNT }}
                render={({ field: { onChange, value } }) => (
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={onChange}
                        cellCount={CELL_COUNT}
                        rootStyle={{ marginBottom: 20 }}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                key={index}
                                onLayout={getCellOnLayoutHandler(index)}
                                className={`w-12 h-14 border rounded-md justify-center items-center ${
                                    isFocused ? 'border-blue-500' : 'border-gray-400'
                                }`}
                            >
                                <Text className="text-xl font-semibold text-center">
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                )}
            />

            <TouchableOpacity onPress={() => console.log('Resend code')} className="mb-4">
                <Text className="text-base font-semibold text-blue-700">Resend Code</Text>
            </TouchableOpacity>

            <View
                className="w-full py-5 justify-center items-center mb-10 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                style={{ backgroundColor: color.primary }}
            >
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="text-center text-white text-base font-medium font-['Montserrat']"
                >
                    <Text className="text-base font-semibold text-center text-white">Verify</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VerificationScreen
