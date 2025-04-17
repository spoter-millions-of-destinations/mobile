import React, { useContext } from 'react'
import { Image, Text, View } from 'react-native'

import InputComponent from '@/components/InputComponent'
import { color } from '@/constants/Colors'
import { UserContext } from '@/context/AuthContext'
import { setDataStorage } from '@/helpers/storage'
import authService, { Auth } from '@/services/auth.service'
import { FontAwesome } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { Lock, User } from 'iconsax-react-native'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
type FormData = Pick<Auth, 'username' | 'password'>
const LoginScreen = () => {
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        },
    })
    const { updateUser } = useContext(UserContext)

    const { mutate: login, isPending } = useMutation({
        mutationFn: (data: FormData) => authService.login(data),
        onSuccess: async (response) => {
            console.log('Login successful:', response)

            await setDataStorage('account', response)
            router.replace('/(tabs)/feed')
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: 'Sai tài khoản hoặc mật khẩu',
                visibilityTime: 3000, // 3 giây
            })
        },
    })

    const onSubmit = (data: FormData) => {
        login(data)
    }

    return (
        <View className="flex-1" style={{ backgroundColor: color.white }}>
            <View className="flex-row justify-center mt-[100] w-full">
                <Image source={require('@/assets/images/logo-with-text.png')} className="w-full h-[200]" />
            </View>

            <View className="px-5 pt-4 pb-[30.5] bg-white rounded-t-3xl ">
                <Text className="text-black text-2xl font-semibold font-['Montserrat'] leading-normal mb-5">
                    Sign in
                </Text>
                <View>
                    {/* Username */}
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputComponent
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                                placeholder="user name"
                                affix={<User size={22} color="gray" />}
                            />
                        )}
                    />

                    {/* Password */}
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <InputComponent
                                isPassword
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                                placeholder="your password"
                                affix={<Lock size={22} color="gray" />}
                            />
                        )}
                    />
                    <View
                        className="w-full py-5 justify-center items-center mb-10 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                        style={{ backgroundColor: color.primary }}
                    >
                        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                            <Text className="text-center text-white text-base font-medium font-['Montserrat']">
                                {isPending ? 'Signing in...' : 'Sign in'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="w-[294px] h-[10] border-[2px] border-neutral-500 mx-auto"></View>
                <View className="mb-3 relative bottom-3 bg-white inline">
                    <Text className=" text-center text-neutral-500 text-sm font-medium font-['Montserrat'] leading-none inline">
                        or log in with
                    </Text>
                </View>

                <View className="flex-row gap-x-10 justify-center mb-[50]">
                    <TouchableOpacity>
                        <FontAwesome name="facebook" size={30} color="#3b5998" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="google" size={30} color="#db4437" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="apple" size={30} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="whatsapp" size={30} color="#25D366" />
                    </TouchableOpacity>
                </View>

                <Text
                    className="text-center text-neutral-400 text-sm font-normal font-['Open Sans'] leading-none tracking-tight"
                    onPress={() => router.push('/auth/register')}
                >
                    Don't have an account yet?
                    <Text
                        style={{ color: color.primary }}
                        className="text-center text-sky-800 text-sm font-normal font-['Open Sans'] underline leading-none tracking-tight"
                    >
                        {' '}
                        Sign up
                    </Text>
                </Text>
            </View>
        </View>
    )
}

export default LoginScreen
