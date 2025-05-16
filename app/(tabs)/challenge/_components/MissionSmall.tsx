import { CalenderGray } from '@/assets/images/Button'
import { Mission } from '@/data/missions'
import { Image } from 'expo-image'
import { Text, View } from 'react-native'

export const MissionSmallComponent = ({ info }: { info: Mission }) => {
    const { image, title, time } = info
    return (
        <View className="mb-5 w-[48%] p-[12] bg-white rounded-[15px] shadow">
            <View className="mb-2 ">
                <Image
                    source={image}
                    style={{
                        width: '100%',
                        height: 115,
                        borderRadius: 15,
                    }}
                />
            </View>
            <Text className="text-black text-xs font-medium font-['Montserrat'] mb-2">{title}</Text>
            <View className="flex-row items-center gap-x-1">
                <CalenderGray className="mr-[5]" />
                <Text className="text-neutral-400 text-[10px] font-medium font-['Montserrat']">{time}</Text>
            </View>
        </View>
    )
}
