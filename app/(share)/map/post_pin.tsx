import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import UserInfo from '@/components/UserInfo'
import { Image } from 'expo-image'
import { Rating } from 'react-native-ratings'
import { BackLeftToRight } from '@/assets/images/Button'
import { Bookmark, BookSaved, Heart, Icon, Message } from 'iconsax-react-native'

import CommentComponent from '@/app/(share)/feed/components/Comment'
import PostMapComponent from '@/app/(share)/map/components/PostMapComponent'
import commentService from '@/services/comment.service'
import Loading from '@/components/Loading'
import { useLocalSearchParams } from 'expo-router'
import { Post } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'

const PersionPin = () => {
    const { data } = useLocalSearchParams()

    const post: Post = React.useMemo(() => {
        try {
            return typeof data === 'string' ? JSON.parse(data) : {}
        } catch (e) {
            console.error('Invalid data param:', e)
            return {}
        }
    }, [data])

    const {
        data: comments,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['post_comments', post.id],
        queryFn: () => commentService.getCommentOfPost(post.id, 100).then((res) => res),
        enabled: !!post, // chỉ chạy khi có id
    })
    return (
        <View className="flex-1">
            <View className="p-5">
                <PostMapComponent data={post} showButton showImage showRating={false} />
                <View className="mt-6">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        comments!.map((comment) => <CommentComponent key={comment.id} data={comment} />)
                    )}
                </View>
            </View>
        </View>
    )
}

export default PersionPin
