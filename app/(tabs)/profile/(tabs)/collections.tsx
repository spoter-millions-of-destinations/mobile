import Loading from '@/components/Loading'
import collectionService from '@/services/collection.service'
import React from 'react'

import { Collection as CollectionComponent } from '@/components/Collection'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Tabs } from 'react-native-collapsible-tab-view'
type Props = {
    userId: number
}
const PAGE_SIZE = 10
const UserCollections = ({ userId }: Props) => {
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['collections', userId],
        staleTime: 1000 * 60 * 5,
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const collections = await collectionService.getCollectionsOfUser(userId, PAGE_SIZE, pageParam)

            return collections
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) {
                return undefined
            }
            return allPages.length * PAGE_SIZE
        },
    })

    const collections = data?.pages.flat() ?? []
    console.log('collections', collections)
    if (isLoading) {
        return <Loading />
    }
    return (
        <Tabs.FlatList
            className="py-6"
            data={collections}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <CollectionComponent
                    key={item.id}
                    data={item}
                    // onPress={() =>
                    //     router.push('detail-collection', {
                    //         collectionId: collection.id,
                    //         collectionName: collection.name,
                    //     })
                    // }
                />
            )}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
        />
    )
}

export default UserCollections
