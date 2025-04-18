import { LineDart, Pin2 } from '@/assets/images/Button'
import PostMapComponent from '@/components/PostMapComponent'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

import Loading from '@/components/Loading'
import attractionService from '@/services/attraction.service'
import { Image } from 'expo-image'

const AttractionPin = () => {
    const { data, isPersional } = useRoute().params
    const {
        id: AttractionId,
        name,
        description,
        rate,

        placeName,
        address,
        city,
        country,
    } = data
    const [isLoading, setIsLoading] = React.useState(true)
    const [posts, setPosts] = React.useState([])
    React.useEffect(() => {
        ;(async () => {
            try {
                setIsLoading(true)
                const data = await attractionService.getPostsOfAttraction(0, 100, AttractionId)
                setPosts(data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])
    return (
        <View className="flex-1 p-6">
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
                <Text className="text-neutral-400 text-sm font-medium font-['Montserrat']">{posts.length} +</Text>
            </View>
            <View>
                {isLoading ? (
                    <Loading />
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={posts}
                        renderItem={({ item }) => <PostMapComponent data={item} />}
                    />
                )}
            </View>
        </View>
    )
}

export default AttractionPin
