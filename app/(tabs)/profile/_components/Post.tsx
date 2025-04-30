import { calculateTime } from '@/helpers/time'
import { Post as Props } from '@/services/post.service'

import { Image, Text, View } from 'react-native'

export const Post = ({ user, images, description, createdAt }: Props) => {
    return (
        <View className=" flex-row mb-[10]">
            <View className="mr-[15]">
                <Image source={{ uri: user.avatar }} className="w-[46.96px] h-[46.96px] rounded-full" />
            </View>
            <View className="flex-1 gap-y-1">
                <View className="flex-row items-center ">
                    <Text className="text-neutral-900 text-sm font-medium font-['Montserrat'] mr-5">{user.name}</Text>
                    <Text className="text-neutral-900 text-[11px] font-light font-['Montserrat']">
                        {calculateTime(createdAt)}
                    </Text>
                </View>
                <View className="mb-[5]">
                    <Text className="text-black text-[10px] font-light font-['Montserrat']">{description}</Text>
                </View>
                <View>
                    <Image source={{ uri: images[0] }} className="w-[200px] h-[200px] rounded-[15px]" />
                </View>
            </View>
        </View>
    )
}
