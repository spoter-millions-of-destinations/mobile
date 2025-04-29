import React from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'
type Props = {
    icon: React.ReactNode
    onPress: () => void
    style?: StyleProp<ViewStyle>
}
const FloatingButtonComponent = ({ icon, onPress, style }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                className="w-[50px] h-[50px] bg-neutral-50 rounded-full shadow flex-row justify-center items-center"
                style={style}
            >
                {icon}
            </View>
        </TouchableOpacity>
    )
}

export default FloatingButtonComponent
