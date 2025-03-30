import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import UserInfo from "../../components/UserInfo";

import {
    Back,
    Comment,
    Navigation,
    Save,
    Send,
} from "../../../assets/img/Button";

import { Image } from "expo-image";
import CommentComponent from "../../components/Comment";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import commentService from "../../../services/comment.service";
import Loading from "../../components/Loading";
const DetailPostScreen = ({ route }) => {
    const navigation = useNavigation();
    const post = route.params.post;

    const {
        id,
        user,
        createdAt,
        images,

        description,
    } = post;

    const [commentText, setCommentText] = useState("");
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(null);

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
    const createComment = async () => {
        try {
            await commentService.createComment({
                postId: id,
                content: commentText,
            });
            setCommentText("");
            fetchComments();
        } catch (error) {
            console.log(error);
        }
    };
    const fetchComments = async () => {
        try {
            const data = await commentService.getCommentOfPost(id, 0, 100);

            setComments(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleLike = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    return (
        <SafeAreaView
            className="flex-1 bg-white"
            showsVerticalScrollIndicator={false}
        >
            <ScrollView className="px-6">
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center flex-1">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Back />
                        </TouchableOpacity>

                        <UserInfo
                            style={{ marginLeft: 16 }}
                            textDark={true}
                            userImage={user.avatar}
                            userName={user.name}
                            postTime={createdAt}
                        />
                    </View>
                    <View>
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={24}
                            color="black"
                        />
                    </View>
                </View>

                <Text className="text-black text-sm font-normal font-['Montserrat'] leading-none mb-3">
                    {description}
                </Text>
                <Image
                    source={{ uri: images[0] }}
                    style={styles.image}
                    contentFit="cover"
                />
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#D4D4D4",
                        marginTop: 12,
                        marginBottom: 12,
                    }}
                ></View>
                <View className="mb-5 flex-row justify-between">
                    <View className="flex-row gap-x-4 items-center">
                        <View>
                            <TouchableOpacity
                                onPress={toggleLike}
                                className="flex-row items-center"
                            >
                                <Ionicons
                                    name={liked ? "heart" : "heart-outline"}
                                    size={26}
                                    color={liked ? "red" : "black"}
                                />
                                <Text className="ml-2 text-base font-medium font-['Montserrat']">
                                    {useMemo(
                                        () => Math.floor(Math.random() * 10000),
                                        []
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center">
                            <Comment width={26} height={26} />
                            <Text className="ml-2 text-base font-medium font-['Montserrat']">
                                {comments?.length}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-x-4">
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("map", {
                                    post: [post.longitude, post.latitude],
                                })
                            }
                        >
                            <Navigation />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("save", {
                                    postId: id,
                                    postImage: images[0],
                                });
                            }}
                        >
                            <Save />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {comments ? (
                        comments.map((commentInfo, index) => (
                            <CommentComponent key={index} data={commentInfo} />
                        ))
                    ) : (
                        <Loading />
                    )}
                </View>
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="px-4 py-3 bg-white"
            >
                <View className="bg-[#E5E5E5] p-4 rounded-3xl">
                    <TextInput
                        multiline
                        className="w-full mb-[19] text-neutral-600 text-xs font-normal font-['Montserrat'] leading-[14px] tracking-tight"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChangeText={setCommentText}
                        placeholderTextColor={"#525252"}
                    />
                    <View className="flex-row justify-between items-center">
                        <View style={styles.iconContainer} className="gap-2">
                            <TouchableOpacity>
                                <Ionicons
                                    name="happy-outline"
                                    size={20}
                                    color="grey"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="camera-outline"
                                    size={20}
                                    color="grey"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialIcons
                                    name="gif-box"
                                    size={20}
                                    color="grey"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialIcons name="" size={20} color="grey" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={createComment}>
                            <Send />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        borderRadius: 18,
        width: "100%",
        aspectRatio: 1,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 16,
    },
    subActions: {
        flexDirection: "row",
    },
    commentSection: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 8,
    },
    comments: {
        marginLeft: 4,
    },
    commentInputSection: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#d4d4d4",
        padding: 8,
        backgroundColor: "white",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 8,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#f0f0f0",
    },
});

export default DetailPostScreen;
