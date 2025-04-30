import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import collectionService from '@/services/collection.service'

import MasonryList from '@react-native-seoul/masonry-list'
import { Image } from 'expo-image'
import { BackRightToLeft, Pin } from '@/assets/images/Button'
import Loading from '@/components/Loading'
import { useLocalSearchParams } from 'expo-router'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { Post } from '@/services/post.service'
// const CollectionItem = () => {
//     const { data } = useLocalSearchParams()
//     const { id: collectionId, name: collectionName, description: collectionDescription } = JSON.parse(data as string)

//     const [collection, setCollection] = React.useState([])
//     const [isLoading, setIsLoading] = React.useState(false)
//     React.useEffect(() => {
//         ;(async () => {
//             try {
//                 setIsLoading(true)
//                 const data = await collectionService.getCollectionItems(collectionId)
//                 setCollection(data.data)
//             } catch (error) {
//                 console.log(error)
//             } finally {
//                 setIsLoading(false)
//             }
//         })()
//     }, [collectionId])

//     return (
//         <SafeAreaView className="flex-1 bg-neutral-50">
//             <View className="flex-1 px-6 ">
//                 <TouchableOpacity className="relative top-[20]" onPress={() => navigation.goBack()}>
//                     <BackRightToLeft />
//                 </TouchableOpacity>

//                 <View className="flex-col items-center mb-[15]">
//                     <Text className=" text-center text-neutral-700 text-2xl font-semibold font-['Montserrat'] ">
//                         {collectionName}
//                     </Text>
//                     <Text className="w-[245px] text-center text-neutral-500 text-xs font-normal font-['Montserrat'] ">
//                         {collectionDescription}
//                     </Text>
//                 </View>
//                 {isLoading ? (
//                     <Loading />
//                 ) : (
//                     <MasonryList
//                         style={{
//                             justifyContent: 'between',
//                         }}
//                         showsVerticalScrollIndicator={false}
//                         numColumns={2}
//                         data={collection.collectionItems || []}
//                         renderItem={({ item }) => <PostItem data={item} />}
//                         estimatedItemSize={200}
//                     />
//                 )}
//             </View>
//         </SafeAreaView>
//     )
// }
export const CollectionItem = ({ data }: { data: Post }) => {
    const { images, description, attraction } = data
    const { goToPostDetail } = useNavigatHelper()
    return (
        <TouchableOpacity onPress={() => goToPostDetail(data)} className="w-full p-[10]">
            <Image
                className="h-[161px] w-full rounded-[15px] mb-[5]"
                source={images[0]}
                style={{
                    borderRadius: 15,
                    height: 161,
                    width: '100%',
                    marginBottom: 5,
                }}
            />
            <Text className="text-neutral-500 text-[10px] font-normal font-['Montserrat'] mb-[5]">{description}</Text>
            <View className="flex-row items-center gap-x-1">
                <Pin />
                <Text className=" text-neutral-600 text-[10px] font-normal font-['Montserrat'] ">
                    {attraction?.city},{attraction?.country}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
