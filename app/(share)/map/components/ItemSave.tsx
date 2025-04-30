import { Text, View } from 'react-native'

export const ItemSave = ({ title, number, icon }: { title: string; number: number; icon: JSX.Element }) => {
    return (
        <View className="flex-row items-center mr-[25]">
            <View className="w-12 h-12 bg-sky-100 rounded-full mr-[10] items-center justify-center">{icon}</View>
            <View>
                <Text className="text-neutral-800 text-sm font-medium font-['Montserrat']">{title}</Text>
                <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">{number} place</Text>
            </View>
        </View>
    )
}
