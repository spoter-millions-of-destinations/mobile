import { BackLeftToRight } from '@/assets/images/Button'
import { Text, TouchableOpacity, View } from 'react-native'
type ButtonProps = {
    icon: React.ReactNode
    text: string
    onPress: () => void
}
export const Button = ({ icon, text, onPress }: ButtonProps) => {
    return (
        <View className="px-[22] py-[27] flex-row justify-between items-center h-[130px] bg-white rounded-[25px] shadow border border-neutral-300 w-[45%]">
            <TouchableOpacity
                onPress={onPress}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            >
                <View>
                    {icon}
                    <Text className="mt-[22] text-neutral-800 text-base font-semibold font-['Montserrat'] leading-[18px]">
                        {text}
                    </Text>
                </View>
                <BackLeftToRight />
            </TouchableOpacity>
        </View>
    )
}
