import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TouchableOpacity, View } from "react-native";

import ContainerComponent from "../../../components/ContainerComponent";
import Loading from "../../../components/Loading";
import { PostCard } from "../../../components/PostCard";
import NotificationComponent from "../../../components/NotificationComponent";
import postService, { Post } from "@/services/post.service";
import { NewPostLogo } from "@/assets/images/Button";
import { color } from "@/constants/Colors";
import { FlashList } from '@shopify/flash-list';

const NewFeed = () => {
    const [loading, setLoading] = React.useState(false);
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [page, setPage] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await postService.getAllFeed(10, page);
            setPosts([...posts, ...data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, [page]);
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-white pt-14 ">
            <View className="px-6 py-1 flex-row justify-between items-center">
                <NewPostLogo />
                <View className="flex-row items-centers gap-x-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("notification")}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color={color.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("map")}
                    >
                        <Ionicons
                            name="map-outline"
                            size={24}
                            color={color.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {loading ? (
                <View className="w-full h-full flew-col flex-1 justify-center items-center">
                    <Loading />
                </View>
            ) : (
                <ContainerComponent>
                    <FlashList
                        showsVerticalScrollIndicator={false}
                        data={posts}
                        renderItem={({ item }: { item: Post }) => (
                            <PostCard post={item} />
                        )}
                        estimatedItemSize={10}
                    />
                    <NotificationComponent
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                    />
                </ContainerComponent>
            )}
        </View>
    );
};

export default NewFeed;
