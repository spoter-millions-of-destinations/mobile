import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import React, { useCallback, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { BackLeftToRight } from '@/assets/images/Button'
import Rating from './Rating'
import UserInfo from './UserInfo'

const BottomSheetMap = ({ info }) => {
    const { images, userName = 'Thao nguyen', createdAt, avatar, description } = info
    // ref
    const navigation = useNavigation()
    const bottomSheetRef = useRef(null)

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index)
    }, [])

    // renders
    return (
        <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} snapPoints={[215]} enablePanDownToClose>
            <BottomSheetView className="flex-1 bg-transparent">
                <View className="flex-row p-5 gap-x-[11]">
                    <View className="overflow-hidden shadow">
                        <Image source={images[0]} className="w-[140px] h-[140px] rounded-[25px]" />
                    </View>
                    <View className="flex-col justify-between flex-1">
                        <View>
                            <UserInfo
                                textDark
                                userImage={avatar}
                                userName={userName}
                                postTime={createdAt}
                                className="mb-2"
                            />
                            <Text className="text-neutral-500 text-[10px] font-normal font-['Montserrat']">
                                {description}
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Rating isDisabled={true} />
                            <TouchableOpacity
                                className="flex-row justify-end"
                                onPress={() =>
                                    navigation.navigate('detail-post', {
                                        post: info,
                                    })
                                }
                            >
                                <BackLeftToRight className="w-[30] h-[30] mr-4" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default BottomSheetMap
