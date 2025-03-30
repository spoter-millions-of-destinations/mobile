import { Image } from "expo-image";
import { HeartCircle, Star, Star1, StarSlash } from "iconsax-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import UserInfo from "./UserInfo";

import { useNavigation } from "@react-navigation/native";
import { BackLeftToRight, Comment, Save, Star2 } from "../../assets/img/Button";
import { Ionicons } from "@expo/vector-icons";
import StartScreen from "../pages/Auth/StartScreen";

const PostMapComponent = ({ data }) => {
    const { id, user, createdAt, description, images, rate } = data;
    const navigation = useNavigation();
    return (
        <View className="w-[400] mb-[16]">
            <View className="flex-row  gap-x-[11]">
                <View className="shadow overflow-hidden">
                    <Image
                        source={images[0]}
                        className="w-[140px] h-[140px] rounded-[25px]"
                        containFit="center"
                    />
                </View>
                <View className="flex-1 flex-col justify-between">
                    <View>
                        <UserInfo
                            textDark
                            userImage={user.avatar}
                            userName={user.name}
                            postTime={createdAt}
                            className="mb-2"
                        />
                        <Text className="text-neutral-500 text-[10px] font-normal font-['Montserrat']">
                            {description}
                        </Text>
                    </View>
                    <View>
                        <View className="h-[0px] border border-neutral-300 mb-[6]" />
                        <View className="flex-row items-center">
                            <View className="flex-row gap-x-1 mr-[100]">
                                <View className="flex-row items-center gap-x-1">
                                    <Ionicons
                                        name={"heart"}
                                        size={24}
                                        color={"red"}
                                    />
                                    <Text>
                                        {Math.floor(Math.random() * 10000)}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("save", {
                                            postImage: images[0],
                                            postId: id,
                                        })
                                    }
                                    className="flex-row items-center gap-x-1"
                                >
                                    <Save width={18} height={18} />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-[#f18047] text-sm font-medium font-['Montserrat']">
                                    {rate}
                                </Text>
                                <Image
                                    source="https://cdn.iconscout.com/icon/free/png-512/free-star-icon-download-in-svg-png-gif-file-formats--like-logo-bookmark-favorite-shape-user-needs-pack-interface-icons-32386.png?f=webp&w=512"
                                    className="w-5 h-5"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PostMapComponent;
