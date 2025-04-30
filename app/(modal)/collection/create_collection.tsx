import { Delete, Email, Message, Pen } from '@/assets/images/Button'
import { imageButton } from '@/assets/images/button-img'
import { _friends } from '@/data/friends'
import collectionService, { Collection } from '@/services/collection.service'
import { useMutation } from '@tanstack/react-query'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Input } from './_components/Input'
import { CameraCapturedPicture } from 'expo-camera'
import fileService from '@/services/file.service'
import { CollectionPeopleListItem } from './_components/CollectionPeople'
const CreateCollection = () => {
    const [data, setData] = React.useState({
        name: '',
        description: '',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/026/631/445/small_2x/add-photo-icon-symbol-design-illustration-vector.jpg',
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Pick<Collection, 'name' | 'description' | 'image'>) =>
            collectionService.createCollection(data),
        onSuccess: () => {
            alert('Collection created')
            router.back()
        },
        onError: (error) => {
            console.error(error)
            alert('Failed to create collection')
        },
    })

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission denied!')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
        })

        if (!result.canceled) {
            const picked = result.assets[0]
            const cameraCaptured: CameraCapturedPicture = {
                uri: picked.uri,
                base64: picked.base64!,
                width: picked.width,
                height: picked.height,
            }

            // Upload lên cloudinary
            const imageUrl = await fileService.uploadFile(cameraCaptured)

            // Cập nhật lại data
            setData((prev) => ({ ...prev, image: imageUrl }))
        }
    }

    return (
        <View className="flex-1 px-6 py-5 bg-neutral-50">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Delete />
                    </TouchableOpacity>

                    <Text className="ml-[15] text-neutral-900 text-base font-medium font-['Montserrat']">
                        Create a collection
                    </Text>
                </View>
                <TouchableOpacity onPress={() => mutate(data)}>
                    <Text className="text-sky-800 text-2xl font-semibold font-['Montserrat']">
                        {isPending ? 'Creating...' : 'Create'}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="flex-1">
                <View className="flex-1 ">
                    <TouchableOpacity
                        onPress={pickImage}
                        className="items-center justify-center mt-[22] mb-[20]"
                        activeOpacity={0.7}
                    >
                        <Image
                            source={data.image}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 15,
                            }}
                        />
                        <Text className="justify-center text-black text-xs font-semibold font-['Montserrat'] leading-none mt-2">
                            {data.image ? 'Change picture' : 'Select picture'}
                        </Text>
                    </TouchableOpacity>
                    <Input
                        title="Name"
                        placeholder="Name"
                        icon={<Message />}
                        value={data.name}
                        onChangeText={(text) => setData({ ...data, name: text })}
                        style={{ marginBottom: 25 }}
                    />

                    {/* Description Input */}
                    <Input
                        title="Description"
                        placeholder="Description"
                        icon={<Pen />}
                        value={data.description}
                        onChangeText={(text) => setData({ ...data, description: text })}
                        style={{ marginBottom: 25 }}
                    />

                    <Text className="text-black text-xs font-medium font-['Montserrat'] mb-1">Invite your friends</Text>
                    <View className="rounded-[10px] px-4 py-4 border border-neutral-200">
                        <Input placeholder="Email/Name" icon={<Email />} style={{ marginBottom: 8 }} />
                        <Text className="text-neutral-400 text-[10px] font-normal font-['Montserrat'] mb-4">
                            Only people invited in this list can access
                        </Text>

                        {_friends.map((friend, index) => (
                            <CollectionPeopleListItem key={index} info={friend.info} role={friend.role} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateCollection
