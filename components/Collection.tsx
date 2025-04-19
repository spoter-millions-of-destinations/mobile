import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { BackLeftToRight } from '@/assets/images/Button'

import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Post } from '@/services/post.service'
import { Collection as CollectionType } from '@/services/collection.service'
import { ChevronRight } from 'lucide-react-native'

type Props = {
    data: CollectionType
    onPress: () => void
}
const SPACING = 6
const PADDING_HORIZONTAL = 24
export const Collection = ({ data, onPress }: Props) => {
    const { width } = useWindowDimensions()
    const imageSize = (width - PADDING_HORIZONTAL * 2 - SPACING * 2) / 3

    return (
        <View className="w-full mb-5">
            {/* header */}
            <TouchableOpacity onPress={onPress} className="items-center justify-between px-[26] mb-[4] flex-row ">
                <View>
                    <Text className=" text-sm font-semibold font-['Montserrat'] text-neutral-700">{data.name}</Text>
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">{data.description}</Text>
                </View>
                <View className="mr-[54px]">
                    <TouchableOpacity onPress={onPress}>
                        <ChevronRight />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* images */}
            <View className="flex-row flex-wrap items-center justify-start">
                {data.collectionItems.slice(0, 6).map((post, index) => (
                    <Image
                        key={index}
                        source={post.post.images[0]}
                        style={{
                            width: imageSize,
                            height: imageSize,
                            margin: SPACING / 2,
                            borderRadius: 10,
                        }}
                    />
                ))}
            </View>
        </View>
    )
}
