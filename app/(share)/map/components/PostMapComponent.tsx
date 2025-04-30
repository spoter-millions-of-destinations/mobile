import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import UserInfo from '@/components/UserInfo'

import { Save } from '@/assets/images/Button'
import { Post } from '@/services/post.service'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Star } from '@/components/Star'

import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { router } from 'expo-router'
type Props = { data: Post; showImage?: boolean; showButton?: boolean; showRating?: boolean }
const PostMapComponent = ({ data, showButton, showImage, showRating }: Props) => {
    const { id, user, createdAt, description, images, rate } = data
    const { goToPostDetail, goToCollection } = useNavigatHelper()

    return (
        <View className="flex-row flex-1 w-full gap-x-3">
            {showImage && (
                <View className="overflow-hidden shadow">
                    <Image
                        source={images[0]}
                        className="w-[140px] h-[140px] rounded-[25px]"
                        contentFit="cover"
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 25,
                        }}
                    />
                </View>
            )}
            <View className="flex-col justify-between flex-1 w-full">
                <TouchableOpacity
                    onPress={() => {
                        router.back()
                        goToPostDetail(data)
                    }}
                >
                    <View className="flex-row items-center justify-between w-full">
                        <UserInfo textDark user={user} postTime={createdAt} />
                        {showRating && <Star number={data.rate} />}
                    </View>

                    <Text className="text-neutral-500 text-[12px] font-normal font-['Montserrat'] mt-2 text-wrap mb-2">
                        {description}
                    </Text>
                </TouchableOpacity>

                {showButton && (
                    <View>
                        <View className="h-[0px] border border-neutral-300 mb-[6]" />
                        <View className="flex-row items-center justify-between">
                            {/* Like and Save */}
                            <View className="flex-row gap-x-1 mr-[100]">
                                <View className="flex-row items-center gap-x-1">
                                    <Ionicons name={'heart'} size={24} color={'red'} />
                                    <Text>{Math.floor(Math.random() * 10000)}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        goToCollection(data)
                                    }
                                    className="flex-row items-center gap-x-1"
                                >
                                    <Save width={18} height={18} />
                                </TouchableOpacity>
                            </View>
                            {/* Rating */}
                            <Star number={rate} />
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

export default PostMapComponent
