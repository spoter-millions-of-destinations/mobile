import { Add, Checked } from '@/assets/images/Button'
import { useToggle } from '@/hooks'
import collectionService, { Collection } from '@/services/collection.service'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useMemo } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
    data: Collection
    postId: number
}
export const CollectionItem = ({ data, postId }: Props) => {
    const { name, description, image, id } = data
    const isAdded = useMemo(
        () => data.collectionItems.some((item) => item.post.id === postId),
        [data.collectionItems, postId],
    )
    const [checked, setChecked] = useToggle(isAdded, !isAdded)

    const handleClickCollection = async (collectionId: number, type: 'add' | 'remove') => {
        try {
            switch (type) {
                case 'add':
                    await collectionService.addItemToCollection({ postId, collectionIds: [collectionId] })
                    break
                case 'remove':
                    await collectionService.removeItemFromCollection({ collectionId, postId })
                    break
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: '/(share)/collection/[id]',
                    params: {
                        id: JSON.stringify(id),
                        data: JSON.stringify(data),
                    },
                })
            }
            className="flex-row items-center justify-between mb-[20]"
        >
            <View className="flex-row items-center">
                <View className="shadow">
                    <Image
                        source={image}
                        style={{
                            borderRadius: 15,
                            overflow: 'hidden',
                            width: 50,
                            height: 50,
                            marginRight: 12,
                        }}
                    />
                </View>

                <View className="w-2/3">
                    <Text className="text-neutral-700 text-sm font-semibold font-['Montserrat'] mb-[5]">{name}</Text>
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat'] ">{description}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    setChecked()
                    handleClickCollection(id, checked ? 'remove' : 'add')
                }}
            >
                {checked ? <Checked /> : <Add />}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
