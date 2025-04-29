import { Image } from 'expo-image'
import { Text, View } from 'react-native'

export const Star = ({ number }: { number: number }) => (
    <View className="flex-row items-center gap-x-1">
        <Text className="text-orange-400 text-sm font-medium font-['Montserrat']">{number}</Text>
        <Image
            source="https://cdn.iconscout.com/icon/free/png-512/free-star-icon-download-in-svg-png-gif-file-formats--like-logo-bookmark-favorite-shape-user-needs-pack-interface-icons-32386.png?f=webp&w=512"
            style={{
                width: 16,
                height: 16,
            }}
        />
    </View>
)
