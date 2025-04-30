type Props = {
    number: number
    content: string
}
import { Text, View } from 'react-native'

export const Number = ({ number, content }: Props) => {
    return (
        <View className="flex-col items-center">
            <Text className="mb-[2] text-center text-sky-950 text-xl font-semibold font-['Montserrat']">{number}</Text>

            <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">{content}</Text>
        </View>
    )
}
