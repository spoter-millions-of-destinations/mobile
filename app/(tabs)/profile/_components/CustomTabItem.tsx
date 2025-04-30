import { Bookmark } from 'iconsax-react-native'
import { Album, BookCopy, BookMarked, Grid2x2, Grid3x3, ImageIcon, LayoutGrid } from 'lucide-react-native'
import { GestureResponderEvent } from 'react-native'
import { MaterialTabItemProps } from 'react-native-collapsible-tab-view'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export const CustomTabItem = ({
    name,
    onPress,
    onLayout,
    tabIndex,
    activeTab,
}: MaterialTabItemProps<string> & { tabIndex: number; activeTab: number }) => {
    const isFocused = activeTab === tabIndex

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(isFocused ? 1.2 : 1, { duration: 200 }) }],
    }))

    const icons = {
        Posts: <BookCopy color={isFocused ? '#404040' : '#A3A3A3'} size={24} />,
        Images: <LayoutGrid color={isFocused ? '#404040' : '#A3A3A3'} size={24} />,
        Collections: <BookMarked color={isFocused ? '#404040' : '#A3A3A3'} size={24} />,
    }

    const handlePress = (event: GestureResponderEvent) => {
        onPress(name)
    }

    return (
        <Animated.View
            onLayout={onLayout}
            onTouchEnd={handlePress}
            style={[
                {
                    paddingVertical: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flex: 1,
                },
                animatedStyle,
            ]}
        >
            {icons[name as keyof typeof icons]}
        </Animated.View>
    )
}
