import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState, useCallback } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CloseSquare, FlashCircle } from "iconsax-react-native";
import {
    Flash,
    RotateCamera,
    TakingPhoto,
} from "@/assets/images/Button";

const Camera = () => {
    const [facing, setFacing] = useState("back");
    const [flash, setFlash] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [images, setImages] = useState({});

    const imageRef = useRef(null);
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            const parentNavigation = navigation.getParent();
            parentNavigation?.setOptions({
                tabBarStyle: { display: "none" },
            });

            return () => {
                parentNavigation?.setOptions({
                    tabBarStyle: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    },
                });
            };
        }, [navigation])
    );
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }
    const textPicture = async () => {
        if (imageRef.current) {
            try {
                const photo = await imageRef.current.takePictureAsync({
                    base64: true,
                    quality: 0.7,
                });
                setImages(photo);
                navigation.navigate("create-post", {
                    image: photo,
                });
            } catch (e) {
                console.error(e);
            }
        }
    };
    const toggleFlash = () => {
        setFlash(!flash);
    };

    return (
        <View className="flex-1  bg-black">
            <View className="flex-1 justify-center">
                <View className="flex-1 relative">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        className="absolute right-[40] top-[70] z-10"
                    >
                        <CloseSquare color="white" />
                    </TouchableOpacity>
                    <CameraView
                        flash={flash}
                        cameraRatio="1:1"
                        style={styles.camera}
                        facing={facing}
                        className="flex-column justify-between"
                        ref={imageRef}
                    ></CameraView>
                </View>

                <View className="bg-white">
                    <View className="flex-row justify-between items-center w-full py-6 px-10">
                        <TouchableOpacity onPress={toggleFlash}>
                            <Flash />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                textPicture();
                            }}
                        >
                            <TakingPhoto />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleCameraFacing}>
                            <RotateCamera />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});

export default Camera;
