import React from 'react'
import {
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

import MasonryList from '@react-native-seoul/masonry-list'

import ContainerComponent from '@/components/ContainerComponent'


import {
    Collection,
    Filter,
    KinhLup
} from '@/assets/images/Button'

import Loading from '@/components/Loading'
import { useToggle } from '@/hooks'
import postService, { Post } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useDebounce } from 'use-debounce'
import FilterModal from './_components/FilterModel'
import { ImageCard } from './_components/ImageCard'
const Suggest = () => {
    const [modalVisible, setModalVisible] = useToggle(false, true)

    const [filters, setFilters] = React.useState<{
        latitude: number | undefined
        longitude: number | undefined
        radius: number | undefined
        rate: number | undefined
    }>({
        latitude: undefined,
        longitude: undefined,
        radius: undefined,
        rate: undefined,
    })
    const [searchQuery, setSearchQuery] = React.useState('')
    const [debouncedSearch] = useDebounce(searchQuery, 500)

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts', filters, debouncedSearch],
        queryFn: () =>
            postService.getAllFeedByQuery({
                limit: 100,
                offset: 0,
                search: debouncedSearch || undefined,
                ...(filters.radius || filters.rate ? filters : {}),
            }),
    })

    return (
        <SafeAreaView className="flex-1 px-6 bg-white">
            <ContainerComponent>
                <View className="flex-row items-center justify-between mb-2 gap-x-3 ">
                    <View className="px-3 py-2 bg-neutral-50 rounded-[35px] border border-neutral-300 flex-row justify-between items-center relative flex-1">
                        <View>
                            <KinhLup />
                        </View>

                        <TextInput
                            className="flex-1 ml-5"
                            placeholder="Seach here"
                            onChangeText={(text) => {
                                setSearchQuery(text)
                                // Khi người dùng bắt đầu search, clear toàn bộ filters
                                setFilters({
                                    latitude: undefined,
                                    longitude: undefined,
                                    radius: undefined,
                                    rate: undefined,
                                })
                            }}
                            value={searchQuery}
                        />
                        <TouchableOpacity onPress={() => setModalVisible()}>
                            <Filter />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)/suggest/collection_suggest')}
                            className="w-[50px] h-[50px] px-3.5 py-[15px] rounded-[25px] border border-neutral-300 flex-col justify-between items-center inline-flex"
                        >
                            <Collection />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-1">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <MasonryList
                            data={posts}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }: { item: unknown; i: number }) => (
                                <ImageCard i={i} item={item as Post} posts={posts} />
                            )}
                        />
                    )}
                </View>
                <FilterModal
                    visible={modalVisible}
                    onClose={() => setModalVisible()}
                    onApply={(filters) => {
                        setFilters((prev) => ({ ...prev, ...filters }))
                        setModalVisible()
                    }}
                />
            </ContainerComponent>
        </SafeAreaView>
    )
}

export default Suggest
