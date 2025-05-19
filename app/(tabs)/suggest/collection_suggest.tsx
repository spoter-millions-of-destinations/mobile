import { View, Text, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import collectionService from '@/services/collection.service'

import Loading from '../../../components/Loading'
import { useNavigation } from '@react-navigation/native'
import { Collection as CollectionIcon, Filter, KinhLup } from '@/assets/images/Button'
import { Icon } from 'iconsax-react-native'
import { router } from 'expo-router'
import { Collection } from '../profile/_components/Collection'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Container } from 'lucide-react-native'
import { ContainerComponent } from '@/components'
const LIMIT = 10
const CollectionSuggestion = () => {
    const { goToDetailCollection } = useNavigatHelper()

    const { data, refetch, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['public_collections'],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const result = await collectionService.getPublicCollections(pageParam, LIMIT)
            return { data: result, nextOffset: pageParam + LIMIT, hasMore: result.length === LIMIT }
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.hasMore) {
                return lastPage.nextOffset
            } else {
                return undefined
            }
        },
    })

    const handleRefresh = async () => {
        await refetch()
    }
    const handleEndReached = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }
    const collections = data?.pages.flatMap((page) => page.data) || []

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ContainerComponent>
                <View className="flex-row items-center justify-between mb-5 gap-x-3 ">
                    <View className="px-5 py-2 bg-neutral-50 rounded-[35px] border border-neutral-300 flex-row justify-between items-center relative flex-1">
                        <View>
                            <KinhLup />
                        </View>
                        <TextInput className="flex-1 ml-5" placeholder="Seach here" />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)/suggest')}
                            className="w-[50px] h-[50px]  rounded-[25px] border border-neutral-300 flex-col justify-center items-center "
                        >
                            <CollectionIcon />
                        </TouchableOpacity>
                    </View>
                </View>

                {isLoading ? (
                    <Loading />
                ) : (
                    <FlatList
                        onRefresh={handleRefresh}
                        data={collections}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Collection data={item} onPress={() => goToDetailCollection(item)} />}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
                        refreshing={isLoading}
                    />
                )}
            </ContainerComponent>
        </SafeAreaView>
    )
}

export default CollectionSuggestion
