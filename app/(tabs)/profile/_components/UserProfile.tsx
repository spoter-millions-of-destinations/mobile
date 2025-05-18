import { Ads, Follow, LineProfile, Share } from '@/assets/images/Button'
import { color } from '@/constants/Colors'
import { UserContext } from '@/context/AuthContext'
import React from 'react'
import { router } from 'expo-router'
import { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Number } from './Number'
import { useQuery } from '@tanstack/react-query'
import userService from '@/services/user.service'
import { Loading } from '@/components'
type Props = {
    userId: number
} & React.ComponentProps<typeof View>
const UserProfile = React.memo(({ userId }: Props) => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const response = await userService.getUserById(userId)

            return response
        },
        staleTime: 1000 * 60 * 5,
    })
    const { user: currentUser } = useContext(UserContext)
    if (isLoading) return <Loading />
    return (
        <View className="bg-[#FAFAFA] flex-1">
            {/* Ads */}
            <View className="relative">
                <TouchableOpacity
                    onPress={() => router.push('/(share)/create_ads')}
                    className="absolute z-20 right-[30] top-[50]"
                >
                    <Ads />
                </TouchableOpacity>
                <Image
                    className="w-full h-[300px] rounded-bl-[25px] rounded-br-[25px]"
                    source={{ uri: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/anh-nen-cute.jpg' }}
                />
            </View>

            <View className="px-[42] -top-[50] relative -mb-[40px]">
                {/* Avatar */}
                <View className="items-center justify-center ">
                    <Image source={{ uri: user!.avatar }} className="w-[100] h-[100] rounded-full" />
                </View>
                <View className="mb-2">
                    <Text className="text-center text-neutral-800 text-2xl font-semibold font-['Montserrat']">
                        {user!.name}
                    </Text>
                </View>

                {/* Number */}
                <View className="flex-row mb-[15] items-center justify-between">
                    <Number number={Math.round(Math.random() * 10000)} content={'Following'} />
                    <LineProfile />
                    <Number number={Math.round(Math.random() * 10000)} content={'Followers'} />
                    <LineProfile />
                    <Number number={Math.round(Math.random() * 10000)} content={'Likes'} />
                </View>

                {/* Bio */}
                <View className="mb-3">
                    <Text className="mb-1 text-center text-neutral-800 text-sm font-normal font-['Montserrat']">
                        I’m a positive person. I love to travel and eat. Always available for chat
                    </Text>
                    <Text className="text-center text-neutral-600 text-xs font-normal font-['Montserrat']">
                        Los Angeles, CA
                    </Text>
                </View>

                {/* Button */}
                {currentUser!.id !== user!.id && (
                    <View className="flex-row items-center justify-center gap-x-2">
                        <TouchableOpacity
                            style={{
                                backgroundColor: color.primary,
                            }}
                            className="px-[47px] py-[15px] rounded-[100px] justify-center items-center"
                        >
                            <Text className="text-center text-neutral-50 text-base font-semibold font-['Montserrat'] stracking-wide">
                                Messsage
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="px-[15] py-[15] rounded-full border border-neutral-200 justify-center items-center">
                            <Follow />
                        </TouchableOpacity>
                        <TouchableOpacity className="px-[15] py-[15] rounded-full border border-neutral-200 justify-center items-center">
                            <Share />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
})
export default UserProfile
