import React, { useState } from 'react'
import { View, Text, Button, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import InputComponent from '@/components/InputComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { color } from '@/constants/Colors'
import { Lock, Sms, Unlock, User } from 'iconsax-react-native'
import authService, { Auth } from '@/services/auth.service'
import { router } from 'expo-router'
import * as Progress from 'react-native-progress'
import { Back } from '@/assets/images/Button'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
type FormData = Pick<Auth, 'username' | 'password' | 'email' | 'name'> & {
    confirmPassword: string
}
const Register = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const password = watch('password')

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const { confirmPassword, ...payload } = data
            return await authService.register(payload)
        },
        onSuccess: (response) => {
            console.log('Register successful:', response)
            router.replace('/auth/SuccessScreen')
        },
        onError: (error: {
            error: {
                messsage: string
            }
        }) => {
            console.error('Register failed:', error)
            Toast.show({
                type: 'error',
                text1: 'Register Failed',
                text2: error?.error?.messsage,
            })
        },
    })

    const onSubmit = (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Passwords do not match',
            })
            return
        }
        router.push('/auth/validation_code')
        console.log('Form data:', data)
        //mutation.mutate(data)
    }
    return (
        <View className="flex-1" style={{ backgroundColor: color.primary }}>
            <View className="flex-1 p-5 bg-white ">
                <View className="flex-row items-center gap-x-5 mb-[30px]">
                    <Back />
                    <Text className="text-neutral-800 text-base font-semibold font-['Montserrat'] leading-none ">
                        Create a new account
                    </Text>
                </View>

                <Progress.Bar
                    progress={1 / 3}
                    width={null}
                    color="#262626"
                    animationType="timing"
                    className="mb-[40px]"
                />

                {/* Full Name */}
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'Full name is required' }}
                    render={({ field: { onChange, value } }) => (
                        <InputComponent
                            value={value}
                            onChangeText={onChange}
                            placeholder="Full name"
                            affix={<User size={22} color="gray" />}
                        />
                    )}
                />

                {/* Username */}
                <Controller
                    control={control}
                    name="username"
                    rules={{ required: 'User name is required' }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <InputComponent
                                value={value}
                                onChangeText={onChange}
                                placeholder="User name"
                                affix={<User size={22} color="gray" />}
                            />
                        </>
                    )}
                />

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <InputComponent
                            value={value}
                            onChangeText={onChange}
                            placeholder="abc@example.com"
                            affix={<Sms size={22} color="gray" />}
                        />
                    )}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email format',
                        },
                    }}
                />

                {/* Password */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <InputComponent
                            autoComplete="off"
                            textContentType="none" // hoặc "username" hay "password", tuỳ vào mục đích
                            importantForAutofill="no"
                            value={value}
                            onChangeText={onChange}
                            placeholder="********"
                            isPassword
                            affix={<Lock size={22} color="gray" />}
                        />
                    )}
                />

                {/* Confirm Password */}
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                        <InputComponent
                            autoComplete="off"
                            textContentType="none" // hoặc "username" hay "password", tuỳ vào mục đích
                            importantForAutofill="no"
                            value={value}
                            onChangeText={onChange}
                            placeholder="********"
                            isPassword
                            affix={<Unlock size={22} color="gray" />}
                        />
                    )}
                />
                <View
                    className="w-full py-5 justify-center items-center mb-10 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    style={{ backgroundColor: color.primary }}
                >
                    <TouchableOpacity
                        disabled={mutation.isPending}
                        className="flex-row justify-center py-3 mb-4 rounded-xl "
                        style={{ backgroundColor: color.primary }}
                        onPress={handleSubmit(onSubmit, (formErrors) => {
                            Object.values(formErrors).forEach((error: any) => {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Validation Error',
                                    text2: error.message || 'Invalid input',
                                })
                            })
                        })}
                    >
                        {mutation.isPending ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text className="font-semibold text-white">Continue</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                    <View className="flex-row justify-center">
                        <Text className="text-center text-neutral-400 text-sm font-normal font-['Open Sans'] leading-none tracking-tight">
                            Already have an account?
                        </Text>
                        <Text
                            className="text-center text-sky-800 text-sm font-normal font-['Open Sans'] underline leading-none tracking-tight"
                            style={[
                                {
                                    color: color.primary,
                                },
                            ]}
                        >
                            {' '}
                            Sign In
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register
