import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import React, { useRef, useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Flash, RotateCamera, TakingPhoto } from '@/assets/images/Button'
import { CloseSquare } from 'iconsax-react-native'

import { useHideBottonTab, useToggle } from '@/hooks'
import { router } from 'expo-router'
import { usePostStore } from '@/store/usePostStore'

const CameraScreen = () => {
    useHideBottonTab()
    const postStore = usePostStore()
    const [facing, toggleFacing] = useToggle<CameraType>('back', 'front')
    const [flash, toggleFlash] = useToggle<'on' | 'off'>('off', 'on')
    const [permission, requestPermission] = useCameraPermissions()
    const [uri, setUri] = useState<string | null>(null)

    const imageRef = useRef<CameraView | null>(null)

    if (!permission) {
        // Camera permissions are still loading.
        return <View />
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        )
    }

    const textPicture = async () => {
        if (imageRef.current) {
            try {
                const photo = await imageRef.current.takePictureAsync({
                    base64: true,
                    quality: 0.7,
                })

                setUri(photo!.uri)
                postStore.setImage(photo)
                router.push('/(tabs)/camera/create-post-screen')
            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <View className="flex-1 bg-black ">
            <View className="justify-center flex-1">
                <View className="relative flex-1">
                    <TouchableOpacity
                        onPress={() => {
                            router.back()
                        }}
                        className="absolute right-[40] top-[70] z-10"
                    >
                        <CloseSquare color="white" />
                    </TouchableOpacity>
                    <CameraView
                        ratio="1:1"
                        enableTorch
                        autofocus="on"
                        flash={flash}
                        style={styles.camera}
                        facing={facing}
                        className="justify-between flex-column"
                        ref={imageRef}
                    />
                </View>

                <View className="bg-white">
                    <View className="flex-row items-center justify-between w-full px-10 py-6">
                        <TouchableOpacity onPress={() => toggleFlash()}>
                            <Flash />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                textPicture()
                            }}
                        >
                            <TakingPhoto />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFacing()}>
                            <RotateCamera />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})

export default CameraScreen
