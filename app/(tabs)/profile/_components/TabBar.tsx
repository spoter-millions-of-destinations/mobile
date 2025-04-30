import { useState } from 'react'
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { Bookmark, Image as ImageIcon, Grid3x3 } from 'lucide-react-native' // hoặc react-native-vector-icons

const TABS = [
    { key: 'Posts', icon: <Grid3x3 size={24} /> },
    { key: 'Images', icon: <ImageIcon size={24} /> },
    { key: 'Collections', icon: <Bookmark size={24} /> },
]

const screenWidth = Dimensions.get('window').width

export const TabBar = ({ activeTab, setActiveTab }: any) => {
    const [translateX] = useState(new Animated.Value(0))

    const handlePress = (index: number, key: string) => {
        Animated.spring(translateX, {
            toValue: (screenWidth / TABS.length) * index,
            useNativeDriver: true,
        }).start()
        setActiveTab(key)
    }

    return (
        <View className="relative flex-row items-center justify-around py-3 bg-white border-b border-gray-300">
            {TABS.map((tab, index) => (
                <TouchableOpacity key={tab.key} onPress={() => handlePress(index, tab.key)}>
                    <View className="items-center">{tab.icon}</View>
                </TouchableOpacity>
            ))}
            <Animated.View
                className="absolute bottom-0 h-1 bg-black rounded-full"
                style={{
                    width: screenWidth / TABS.length - 32,
                    transform: [{ translateX }],
                    marginHorizontal: 16,
                }}
            />
        </View>
    )
}
