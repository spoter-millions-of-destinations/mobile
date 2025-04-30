import { LineDart, Pin2 } from '@/assets/images/Button'
import PostMapComponent from '@/app/(share)/map/components/PostMapComponent'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

import Loading from '@/components/Loading'
import attractionService, { Attraction } from '@/services/attraction.service'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { lineEach } from '../../../node_modules/@turf/meta/index.d'
import { className } from '../../../node_modules/@sinonjs/commons/types/index.d'
import { Star } from '@/components/Star'
import { useMemo } from 'react'

const AttractionPin = () => {
    const { data, dataType } = useLocalSearchParams()
    const attraction: Attraction = React.useMemo(() => {
        try {
            return typeof data === 'string' ? JSON.parse(data) : {}
        } catch (e) {
            console.error('Invalid data param:', e)
            return {}
        }
    }, [data])

    const { id: attractionId, name, description } = attraction

    const {
        data: postsData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['attractionPosts', attractionId],
        queryFn: () => attractionService.getPostsOfAttraction(0, 100, attractionId).then((res) => res),
        enabled: !!attractionId, // chỉ chạy khi có id
    })

    const rate = useMemo(() => {
        if (!postsData || postsData.length === 0) return 0
        const totalRate = postsData.reduce((acc, post) => acc + post.rate, 0)
        return Number((totalRate / postsData.length).toFixed(2))
    }, [postsData, attractionId])

    return (
        <View className="flex-1 p-6">
            {/* Header */}
            <View className="flex-row justify-between items-center pb-[8]">
                <Pin2 />
                <Text
                    className="text-neutral-800 text-sm font-medium font-['Montserrat'] w-[200]"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
                <LineDart />
                <Image source={require('@/assets/images/button-img/avatar-list.jpg')} />
                <Text className="text-neutral-400 text-sm font-medium font-['Montserrat']">
                    {postsData?.length || 0} +
                </Text>
            </View>
            {/* Content */}
            <View className="mb-2">
                <Text className=" text-black text-sm font-semibold font-['Montserrat'] mb-1">Information</Text>
                <Text className=" text-neutral-500 text-[12px] font-normal font-['Montserrat'] mb-2">
                    {description}
                </Text>
            </View>
            <View className="h-[0px] border border-neutral-300 mb-2" />
            <View>
                <View className="flex-row items-center justify-between mb-2">
                    <Text className=" text-black text-sm font-semibold font-['Montserrat'] mb-1">Review</Text>
                    <Star number={rate} />
                </View>

                {isLoading ? (
                    <Loading />
                ) : (
                    <FlatList
                        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                        showsVerticalScrollIndicator={false}
                        data={postsData}
                        renderItem={({ item }) => <PostMapComponent data={item} showRating />}
                    />
                )}
            </View>
        </View>
    )
}

export default AttractionPin
