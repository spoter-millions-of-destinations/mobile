import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import { SafeAreaView, TouchableOpacity, View } from 'react-native'

import postService, { Post } from '@/services/post.service'
import { NewPostLogo } from '@/assets/images/Button'
import { color } from '@/constants/Colors'
import { FlashList } from '@shopify/flash-list'
import { ContainerComponent, Loading, NotificationComponent } from '@/components'
import PostCard from '@/app/(tabs)/feed/components/PostCard'
import { Link } from 'expo-router'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const NewFeed = () => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const {
        data: posts,
        isLoading,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        staleTime: 1000 * 60 * 5,
        initialPageParam: 0,
        queryFn: async ({ pageParam }) => {
            const data = await postService.getAllFeed(10, pageParam)
            return data
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length * 10
            if (lastPage.length < 10) {
                return undefined
            }
            return nextPage
        },
    })

    const handleEndReached = () => {
        if (!isFetching && hasNextPage) {
            fetchNextPage()
        }
    }
    const flatPosts = posts?.pages.flatMap((page) => page) ?? []

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="flex-row items-center justify-between px-6 py-1">
                    <NewPostLogo />
                    <View className="flex-row items-centers gap-x-4">
                        <TouchableOpacity>
                            <Link href="/(share)/notification">
                                <Ionicons name="notifications-outline" size={24} color={color.primary} />
                            </Link>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Link href="/(share)/map">
                                <Ionicons name="map-outline" size={24} color={color.primary} />
                            </Link>
                        </TouchableOpacity>
                    </View>
                </View>
                {isLoading ? (
                    <View className="items-center justify-center flex-1 w-full h-full flew-col">
                        <Loading />
                    </View>
                ) : (
                    <ContainerComponent>
                        <FlashList
                            showsVerticalScrollIndicator={false}
                            data={flatPosts}
                            renderItem={({ item }: { item: Post }) => <PostCard post={item} />}
                            estimatedItemSize={200} // Ước lượng kích thước mỗi PostCard (tùy chỉnh theo UI)
                            onEndReached={handleEndReached}
                            onEndReachedThreshold={0.5} // Kích hoạt khi cuộn đến 50% cuối danh sách
                            ListFooterComponent={isFetching ? <Loading /> : null}
                        />
                        <NotificationComponent setModalVisible={setModalVisible} modalVisible={modalVisible} />
                    </ContainerComponent>
                )}
            </View>
        </SafeAreaView>
    )
}

export default NewFeed
