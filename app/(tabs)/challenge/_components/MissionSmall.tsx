import { CalenderGray } from '@/assets/images/Button'
import { Mission } from '@/data/missions'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export const MissionSmallComponent = ({ info }: { info: Mission }) => {
    const { image, title, time } = info
    const { goToDetailMission } = useNavigatHelper()
    return (
        <TouchableOpacity
            className="mb-5 w-[48%] p-[12] bg-white rounded-[15px] shadow"
            onPress={() =>
                router.replace({
                    pathname: '/(tabs)/challenge/[id]',
                    params: {
                        id: info.id,
                        data: JSON.stringify(info),
                    },
                })
            }
        >
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
        </TouchableOpacity>
    )
}
