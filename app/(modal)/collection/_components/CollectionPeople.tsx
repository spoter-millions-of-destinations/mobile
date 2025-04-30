import { Image } from 'expo-image'
import { Text, View } from 'react-native'

interface CollectionPeopleListItemProps {
    info: {
        avatar: string
        name: string
    }
    role: string
}

export const CollectionPeopleListItem: React.FC<CollectionPeopleListItemProps> = ({ info, role }) => {
    return (
        <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center">
                <Image
                    source={info.avatar}
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: 35,
                        overflow: 'hidden',
                        marginRight: 12,
                    }}
                />
                <Text className="text-black text-xs font-medium font-['Montserrat']">{info.name}</Text>
            </View>
            <View className="flex-row items-center">
                <Text className="text-neutral-500 text-[10px] font-medium font-['Montserrat'] mr-3">{role}</Text>
            </View>
        </View>
    )
}
