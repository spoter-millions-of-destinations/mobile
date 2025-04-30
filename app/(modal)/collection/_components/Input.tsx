import { BackLeftToRight } from '@/assets/images/Button'
import { Text, TextInput, View } from 'react-native'

interface InputProps {
    icon: React.ReactNode
    title?: string
    placeholder: string
    value?: string
    onChangeText?: (text: string) => void
    affix?: boolean
    style?: any
}

export const Input: React.FC<InputProps> = ({ icon, title, placeholder, value, onChangeText, affix, style }) => {
    return (
        <View style={style}>
            {title && <Text className="text-black text-xs font-medium font-['Montserrat'] mb-2">{title}</Text>}
            <View className="flex-row px-5 py-4 rounded-[10px] border border-neutral-200 justify-between items-center">
                <View className="flex-row items-center flex-1">
                    {icon}
                    <TextInput
                        className="flex-1 ml-4 text-sm leading-5 text-black"
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                    />
                </View>
                {affix && <BackLeftToRight />}
            </View>
        </View>
    )
}
