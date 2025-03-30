import { Ionicons } from "@expo/vector-icons"; // Thư viện icons
import { Text, View, ImageBackground } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getColors } from "react-native-image-colors";


import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { Post } from "../services/post.service";
import { hexToRgba } from "@/helpers/hexToRgba";
import UserInfo from "./UserInfo";

export const PostCard = ({ post }: { post: Post }) => {
    const {
        id,
        user = "Thao Nguyen",
        createdAt,
        images,
        likes = Math.floor(Math.random() * 10000),
        comments = Math.floor(Math.random() * 10000),
        description,
        attraction = {},
    } = post;
    console.log(post.attraction);
    const [liked, setLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(likes);
    const [colors, setColors] = useState<{
        primary: string;
        detail: string;
    }>({
        primary: "#fff",
        detail: "#fff",
    });

    useEffect(() => {
        (async () => {
            try {
                const color = await getColors(images[0], {
                    fallback: "#fff",
                    cache: true,
                    key: images[0],
                    quality: "highest",
                });
                setColors(color);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [images]);

    const navigation = useNavigation();

    const toggleLike = () => {
        setLikeNumber((cur) => (liked ? cur - 1 : cur + 1));
        setLiked((cur) => !cur);
    };

    return (
        <View className={` mb-5 rounded-3xl overflow-hidden`}>
            <LinearGradient
                dither={true}
                start={{ x: 0, y: 1 }}
                colors={[
                    hexToRgba(colors.primary, 0.25),
                    hexToRgba(colors.detail, 0.25),
                ]}
            >
                <ImageBackground
                    source={{ uri: images[0] }}
                    className="h-[375] p-[14] flex-col justify-between shadow"
                    imageStyle={{ borderRadius: 24 }}
                >
                    <View className="flex-row justify-between">
                        <UserInfo
                            userImage={user.avatar}
                            userName={user.name}
                            postTime={createdAt}
                        />

                        <Ionicons
                            name="ellipsis-horizontal"
                            size={24}
                            color="white"
                        />
                    </View>
                    <View className="flex-row justify-between">
                        <View className="flex-row" style={{ gap: 9 }}>
                            <Button
                                text={likeNumber}
                                onPress={toggleLike}
                                icon={
                                    <Ionicons
                                        name={liked ? "heart" : "heart-outline"}
                                        size={20}
                                        color={liked ? "red" : "white"}
                                    />
                                }
                            />
                            <Button
                                text={comments}
                                onPress={() =>
                                    navigation.navigate("detail-post", { post })
                                }
                                icon={
                                    <Ionicons
                                        name="chatbubble-outline"
                                        size={20}
                                        color="white"
                                    />
                                }
                            />
                        </View>
                        <View className="flex-row" style={{ gap: 9 }}>
                            <Button
                                onPress={() =>
                                    navigation.navigate("map", {
                                        post: [post.longitude, post.latitude],
                                    })
                                }
                                icon={
                                    <Ionicons
                                        name="paper-plane-outline"
                                        size={20}
                                        color="white"
                                    />
                                }
                            />

                            <Button
                                onPress={() =>
                                    navigation.navigate("save", {
                                        postImage: images[0],
                                        postId: id,
                                    })
                                }
                                icon={
                                    <Ionicons
                                        name="bookmark-outline"
                                        size={20}
                                        color="white"
                                    />
                                }
                            />
                        </View>
                    </View>
                </ImageBackground>

                <TouchableOpacity
                    className={`px-6 pt-4 pb-[10]`}
                    onPress={() => navigation.navigate("detail-post", { post })}
                >
                    <Text className="text-black text-[14px] font-normal font-['Montserrat']">
                        {description}
                    </Text>
                    <View className="flex-row justify-end mt-1">
                        <View className="flex-row items-center justify-end">
                            <Pin className="mr-[5]" />
                            <Text className=" text-neutral-600 text-[10px] font-normal font-['Montserrat']">
                                {`${post.attraction?.placeName}, ${post.attraction?.city}, ${post.attraction?.country}`}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};
const Button = ({
    text,
    icon,
    onPress,
}: {
    text?: string | number;
    icon: React.ReactNode;
    onPress: () => void;
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="rounded-[14px] overflow-hidden"
        >
            <BlurView
                intensity={40}
                tint="light"
                className="px-[14] py-[13] flex-row justify-center items-center gap-x-[4] bg-neutral-50/40 "
            >
                {icon}
                {text && (
                    <Text className="text-center text-neutral-50 text-xs font-semibold font-['Montserrat']">
                        {text}
                    </Text>
                )}
            </BlurView>
        </TouchableOpacity>
    );
};
