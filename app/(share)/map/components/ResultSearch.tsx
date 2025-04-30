import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { MapLocation } from '@/services/map.service'

import { Text, TouchableOpacity, View } from 'react-native'

export const SearchResult = ({
    data,
    icon,
    onPress,
}: {
    data: MapLocation
    icon: JSX.Element
    onPress: (data: MapLocation) => void
}) => {
    const { goToMap } = useNavigatHelper()

    const handleSelectLocation = (item: MapLocation) => {
        const [longitude, latitude] = item.geometry.coordinates
        goToMap([longitude, latitude], 'search')
        onPress(item)
    }
    return (
        <View className="flex-1 w-full ">
            <TouchableOpacity key={data.id} onPress={() => handleSelectLocation(data)}>
                <View className="flex-row items-center mb-[12]">
                    {icon}
                    <View className="flex-1 ml-4">
                        <Text className="text-neutral-800 text-sm font-normal font-['Montserrat'">
                            {data.properties.name}
                        </Text>
                        <Text className="text-neutral-500 text-xs font-normal font-['Montserrat'] mb-2">
                            {data.properties.full_address}
                        </Text>
                        <View className="w-full h-[0px] border border-neutral-200" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
