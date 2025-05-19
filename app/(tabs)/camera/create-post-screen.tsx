import Accordion from '@/app/(tabs)/camera/components/Accordion'
import { Delete } from '@/assets/images/Button'
import ContainerComponent from '@/components/ContainerComponent'
import UserInfo from '@/components/UserInfo'
import { color } from '@/constants/Colors'
import { UserContext } from '@/context/AuthContext'
import { useHideBottonTab } from '@/hooks'
import fileService from '@/services/file.service'
import postService from '@/services/post.service'
import { User } from '@/services/user.service'
import { usePostStore } from '@/store/usePostStore'
import { Image } from 'expo-image'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import { scheduleNotificationAsync } from 'expo-notifications'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

const CreatePostScreen = () => {
    const [caption, setCaption] = useState('')
    const { user } = React.useContext(UserContext)
    const postStore = usePostStore()

    useHideBottonTab()
    const handleCreatePost = async () => {
        try {
            router.dismiss()
            router.replace('/(tabs)/feed')
            setTimeout(() => {
                Toast.show({
                    type: 'info',
                    text1: 'Thông báo bài viết 🎉',
                    text2: 'Bài viết của bạn đang được đăng!',
                    position: 'top',
                    visibilityTime: 2000,
                    autoHide: true,
                })
            }, 200) // hoặc 200ms nếu cần chắc chắn
            if (!postStore.image) {
                return
            }
            const imageUrl = await fileService.uploadFile(postStore.image)
            const { status } = await requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.warn('Permission to access location was denied')
                return
            }
            let location = await getCurrentPositionAsync({})
            const data = {
                description: caption.length > 0 ? caption : ' ',
                images: [imageUrl],
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                rate: 5,
            }

            await postService.createPost(data)

            Toast.show({
                type: 'success',
                text1: 'Đăng bài thành công 🎉',
                text2: 'Bài viết của bạn đã được chia sẻ!',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
            })
            postStore.clear()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ContainerComponent>
            <View className="flex-row justify-between py-5 overflow-hidden rounded-3xl ">
                <View className="flex-row items-center gap-x-4">
                    <TouchableOpacity
                        className="flex-row items-center justify-center"
                        onPress={() => {
                            postStore.clear()
                            router.back()
                        }}
                    >
                        <Delete />
                    </TouchableOpacity>
                    <Text className="text-neutral-900 text-base leading-[18px]">Create a post</Text>
                </View>

                <TouchableOpacity onPress={handleCreatePost}>
                    <Text
                        className=" text-2xl  font-semibold font-['Montserrat'] leading-7"
                        style={{
                            color: color.primary,
                        }}
                    >
                        POST
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View className="flex-col justify-between flex-1">
                    <View className="flex-1 mb-3">
                        <UserInfo disableAdd={true} user={user as User} textDark={true} />
                        <TextInput
                            multiline
                            value={caption}
                            className="flex-wrap w-[344px] text-neutral-600 text-[14px] font-normal font-['Montserrat'] leading-6 mb-3 min-h-[50px]"
                            placeholder="Add a description..."
                            placeholderTextColor={'#525252'}
                            onChangeText={setCaption}
                        />
                        <View className="rounded-2xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] items-center flex-row justify-center w-full">
                            <Image
                                source={{ uri: postStore.image?.uri }}
                                style={{
                                    borderRadius: 16,
                                    width: '100%',
                                    aspectRatio: 1,
                                }}
                                contentFit="cover"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Accordion />
        </ContainerComponent>
    )
}

export default CreatePostScreen
