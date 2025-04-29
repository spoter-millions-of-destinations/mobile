import Loading from '@/components/Loading'
import { UserContext } from '@/context/AuthContext'
import collectionService from '@/services/collection.service'
import { Post } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useContext } from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CollectionItem } from './components/CollectionItem'
import { SaveHeader } from './components/SaveHeader'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'

const SaveScreen = () => {
    const { data } = useLocalSearchParams()
    const { goToCreateCollection } = useNavigatHelper()
    const { id: postId, images: postImages }: Post = JSON.parse(data as string)
    const { user } = useContext(UserContext)

    const { data: collections, isLoading } = useQuery({
        queryKey: ['collections_of_user', user!.id],
        queryFn: async () => {
            const data = await collectionService.getCollectionsOfUser(user!.id, 10, 0)
            console.log('data', data)

            return data
        },
    })

    React.useEffect(() => {
        ;(() => {
            try {
                if (postId) collectionService.addItemToDefaultCollection(postId)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [postId])

    return (
        <View className="flex-1 bg-neutral-50">
            <SaveHeader image={postImages[0]} />

            <View className="flex-1 px-6 bg-neutral-50">
                <View className="flex-row justify-between items-center mb-6 mt-[25]">
                    <Text className="text-neutral-700 text-xl font-semibold font-['Montserrat']">Collections</Text>
                    <TouchableOpacity onPress={() => goToCreateCollection()}>
                        <Text className="text-sky-900 text-sm font-normal font-['Montserrat']">New collection</Text>
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={collections}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <CollectionItem data={item} postId={postId} />}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    )
}

export default SaveScreen
