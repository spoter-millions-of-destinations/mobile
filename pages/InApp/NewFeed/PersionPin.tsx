import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import UserInfo from "../../../components/UserInfo";
import { Image } from "expo-image";
import { Rating } from "react-native-ratings";
import { BackLeftToRight } from "../../../../assets/img/Button";
import {
    Bookmark,
    BookSaved,
    Heart,
    Icon,
    Message,
} from "iconsax-react-native";

import CommentComponent from "../../../components/Comment";
import PostMapComponent from "../../../components/PostMapComponent";
import commentService from "../../../../services/comment.service";
import Loading from "../../../components/Loading";

const PersionPin = ({ data }) => {
    const { post, isPersional } = useRoute().params;

    const { user, images, rate, createdAt, description } = post;
    const [isLoading, setIsLoading] = React.useState(false);
    const [comments, setcomments] = React.useState([]);
    const getComments = async () => {
        try {
            setIsLoading(true);
            const data = await commentService.getCommentOfPost(post.id, 0, 2);
            setcomments(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    React.useEffect(() => {
        getComments();
    }, []);
    return (
        <View className="flex-1">
            <View className="p-5">
                <PostMapComponent data={post} />
                <View className="mt-6">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        comments.map((comment) => (
                            <CommentComponent
                                key={comment.id}
                                data={comment}
                            />
                        ))
                    )}
                </View>
            </View>
        </View>
    );
};

export default PersionPin;
