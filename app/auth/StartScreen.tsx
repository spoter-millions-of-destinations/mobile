import { color } from '@/constants/Colors'
import { getDataFromStorage, setDataStorage } from '@/helpers/storage'
import authService from '@/services/auth.service'

import { router } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const StartScreen = () => {
    const [isLogin, setIsLogin] = React.useState(true)
    React.useEffect(() => {
        ;(async () => {
            try {
                const token: {
                    accessToken: string
                    refreshToken: string
                } = await getDataFromStorage('account')
                if (!token) return
                const res = await authService.refreshToken(token.accessToken)
                await setDataStorage('account', res)

                // router.replace('/(tabs)/feed')
            } catch (error) {
                setIsLogin(false)
                console.log(error)
            }
        })()
    }, [])
    return (
        <View className="justify-center flex-1 p-4 align-center" style={{ backgroundColor: color.white }}>
            <Text className="mb-10 text-4xl font-bold text-center text-black">Let's Get Started!</Text>
            <View className="flex-row justify-center mb-12">
                <Image source={require('@/assets/images/logo-big.jpg')} />
            </View>

            <View
                className="w-full py-5 justify-center items-center mb-10 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                style={{ backgroundColor: color.primary }}
            >
                <TouchableOpacity
                    className="flex-row justify-center py-4 mb-4 rounded-xl "
                    style={{ backgroundColor: color.primary }}
                    onPress={() => {
                        router.navigate('/auth/register')
                    }}
                >
                    <Text className="font-semibold text-white">Sign up</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.navigate('/auth/login')}>
                <View className="flex-row justify-center">
                    <Text className="font-semibold text-black">Already have an account?</Text>
                    <Text
                        className="font-semibold "
                        style={[
                            {
                                color: color.primary,
                            },
                        ]}
                    >
                        {' '}
                        Sign in
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default StartScreen
