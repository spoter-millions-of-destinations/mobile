import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Delete } from "../../../../assets/img/Button";
import { UserContext } from "../../../../context/user";

import Accordion from "../../../components/Accordion";
import ContainerComponent from "../../../components/ContainerComponent";
import UserInfo from "../../../components/UserInfo";
import fileService from "../../../../services/file.service";
const { width } = Dimensions.get("screen");
import * as Location from "expo-location";
import feedService from "../../../../services/feed.service";
const CreatePostScreen = () => {
    const route = useRoute();
    const images = route.params.image;
    const [caption, setCaption] = useState("");
    const { user } = React.useContext(UserContext);
    const navigation = useNavigation();
    const handleCreatePost = async () => {
        try {
            navigation.goBack();
            navigation.navigate("new-feed", {
                screen: "posts",
                params: {
                    isPostSuccess: true,
                },
            });

            // const imageUrl = await fileService.uploadFile(images);

            // let location = await Location.getCurrentPositionAsync({});
            // const data = {
            //     description: caption.length > 0 ? caption : " ",
            //     images: [imageUrl],
            //     longitude: location.coords.longitude,
            //     latitude: location.coords.latitude,
            //     rate: 5,
            // };

            // await feedService.createPost(data);
        } catch (error) {
            console.log(error);
        }

        // const res = await feedService.createPost(data);
    };

    return (
        <ContainerComponent>
            <View className="flex-row justify-between py-5">
                <View className="flex-row gap-x-4 items-center">
                    <TouchableOpacity
                        className="flex-row items-center justify-center"
                        onPress={() => navigation.goBack("take-photo")}
                    >
                        <Delete />
                    </TouchableOpacity>
                    <Text className="text-neutral-900 text-base leading-[18px]">
                        Create a postasdasd
                    </Text>
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
                    <View className="flex-1">
                        <UserInfo
                            disableAdd={true}
                            userName={user.name}
                            textDark={true}
                            userImage={user.avatar}
                        />
                        <TextInput
                            multiline
                            value={caption}
                            className="flex-wrap w-[344px] text-neutral-600 text-xs font-normal font-['Montserrat'] leading-[14px] mb-3 mt-4"
                            placeholder="Add a description..."
                            placeholderTextColor={"#525252"}
                            onChangeText={setCaption}
                        />
                        <View
                            className="rounded-[15px] shadow overflow-hidden"
                            style={{
                                height: width,
                                width: "100%",
                                borderRadius: 15,
                            }}
                        >
                            <Image
                                source={images.uri}
                                style={{
                                    height: width,
                                    width: "100%",
                                    borderRadius: 15,
                                }}
                                className="rounded-[15px] overflow-hidden"
                                containFit="contain"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Accordion images={images} />
        </ContainerComponent>
    );
};

const styles = StyleSheet.create({});

export default CreatePostScreen;
