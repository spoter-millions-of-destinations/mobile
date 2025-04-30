import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { useNavigation, useRoute } from '@react-navigation/native'
import collectionService, { Collection } from '@/services/collection.service'
import { BackRightToLeft } from '@/assets/images/Button'
import { Image } from 'expo-image'
import ContainerComponent from '../../../components/ContainerComponent'
import { router, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '@/components'
import { CollectionItem } from './_components/CollectionItem'

const DetailCollection = () => {
    const { data } = useLocalSearchParams()
    const collection: Collection = JSON.parse(data as string)

    const { id: collectionId, user, createdAt, description } = collection
    const { data: collectionData, isLoading } = useQuery({
        queryKey: ['detail_collection', collectionId],
        queryFn: async () => {
            const response = await collectionService.getCollectionItems(collectionId)

            return response
        },
        staleTime: 1000 * 60 * 5,
    })

    return (
        <SafeAreaView className="flex-1 bg-neutral-50 ">
            <ContainerComponent>
                <View className="flex-row items-center justify-between mb-2">
                    <TouchableOpacity onPress={() => router.back()}>
                        <BackRightToLeft />
                    </TouchableOpacity>
                    <View className="flex-col items-center">
                        <Text className="justify-center text-neutral-700 text-2xl font-semibold font-['Montserrat']">
                            {collection.name}
                        </Text>
                        <Text className="text-center justify-start text-neutral-500 text-s font-normal font-['Montserrat']">
                            {collection.description}
                        </Text>
                        <Text className="text-neutral-400 text-xs font-normal font-['Montserrat']">
                            {collection.collectionItems.length} posts saved
                        </Text>
                    </View>
                    <View></View>
                </View>
                {isLoading ? (
                    <Loading />
                ) : (
                    <FlashList
                        data={collectionData!.collectionItems}
                        renderItem={({ item }) => <CollectionItem data={item.post} />}
                        numColumns={2}
                        estimatedItemSize={200}
                    />
                )}
            </ContainerComponent>
        </SafeAreaView>
    )
}

export default DetailCollection
