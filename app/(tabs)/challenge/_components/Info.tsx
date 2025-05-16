import { View, Text } from 'react-native'
type Props = {
    icon: React.ReactNode
    title: string
    description: string
    prefix?: React.ReactNode
}
export const Info = ({ icon, title, description, prefix }: Props) => {
    return (
        <View className="flex-row mb-[25] items-center justify-between">
            <View className="flex-row items-center flex-1">
                <View className="w-[60px] h-[60px] bg-sky-100 rounded-[10px] mr-5 flex-row items-center justify-center overflow-hidden">
                    {icon}
                </View>
                <View className="flex-1">
                    <Text className="text-neutral-800 text-base font-semibold font-['Montserrat'] ">{title}</Text>
                    <Text className="text-neutral-400 text-sm font-normal font-['Montserrat'] ">{description}</Text>
                </View>
            </View>
            <View>{prefix}</View>
        </View>
    )
}
