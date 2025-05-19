import UserInfo from '@/components/UserInfo'
import { useMemo, useState } from 'react'
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
} from 'react-native'

import { Back, Comment, Navigation, Save, Send } from '@/assets/images/Button'

import { useHideBottonTab } from '@/hooks'
import commentService from '@/services/comment.service'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import Loading from '../../../components/Loading'
import CommentComponent from './_components/Comment'
import { Post } from '@/services/post.service'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'

const DetailPostScreen = () => {
    const { data } = useLocalSearchParams()
    const { goToCollection, goToMap } = useNavigatHelper()
    const post: Post = JSON.parse(data as string)

    const { id, user, createdAt, images, description, attraction } = post

    const [commentText, setCommentText] = useState('')
    const [liked, setLiked] = useState(() => post.isFavorite)

    const { data: comments, isLoading } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const data = await commentService.getCommentOfPost(id, 0, 100)
            return data
        },
    })

    const toggleLike = () => {
        setLiked(!liked)
    }

    const queryClient = useQueryClient()
    const createComment = async () => {
        try {
            await commentService.createComment({
                postId: id,
                content: commentText,
            })
            setCommentText('')
            await queryClient.invalidateQueries({ queryKey: ['comments', id] })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="px-6">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center flex-1">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Back />
                        </TouchableOpacity>

                        <UserInfo
                            style={{ marginLeft: 16 }}
                            textDark={true}
                            user={user}
                            postTime={createdAt}
                            packageInfo={attraction?.advertisingPackage}
                        />
                    </View>
                    <View>
                        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                    </View>
                </View>
                {/* Description */}
                <Text className="text-black text-sm font-normal font-['Montserrat'] leading-none mb-3">
                    {description}
                </Text>
                {/* Image */}

                <Image source={{ uri: images[0] }} style={styles.image} contentFit="cover" />

                <View
                    style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: '#D4D4D4',
                        marginTop: 12,
                        marginBottom: 12,
                    }}
                ></View>

                {/* Like, comment, save */}
                <View className="flex-row justify-between mb-5">
                    <View className="flex-row items-center gap-x-4">
                        <View>
                            <TouchableOpacity onPress={toggleLike} className="flex-row items-center">
                                <Ionicons
                                    name={liked ? 'heart' : 'heart-outline'}
                                    size={26}
                                    color={liked ? 'red' : 'black'}
                                />
                                <Text className="ml-2 text-base font-medium font-['Montserrat']">
                                    {useMemo(() => Math.floor(Math.random() * 10000), [])}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center">
                            <Comment width={26} height={26} />
                            <Text className="ml-2 text-base font-medium font-['Montserrat']">
                                {comments?.length ?? 0}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-x-4">
                        <TouchableOpacity onPress={() => goToMap([+post.longitude, +post.latitude], 'detail_post')}>
                            <Navigation />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                goToCollection(post)
                            }}
                        >
                            <Save />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Comments */}
                <View>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        comments?.map((commentInfo, index) => <CommentComponent key={index} data={commentInfo} />)
                    )}
                </View>
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="px-4 py-3 bg-white"
            >
                <View className="bg-[#E5E5E5] p-4 rounded-3xl">
                    <TextInput
                        multiline
                        className="w-full mb-[19] text-neutral-600 text-xs font-normal font-['Montserrat'] leading-[14px] tracking-tight"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChangeText={setCommentText}
                        placeholderTextColor={'#525252'}
                    />
                    <View className="flex-row items-center justify-between">
                        <View style={styles.iconContainer} className="gap-2">
                            <TouchableOpacity>
                                <Ionicons name="happy-outline" size={20} color="grey" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="camera-outline" size={20} color="grey" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialIcons name="gif-box" size={20} color="grey" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={createComment}>
                            <Send />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    image: {
        borderRadius: 18,
        width: '100%',
        aspectRatio: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 16,
    },
    subActions: {
        flexDirection: 'row',
    },
    commentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    comments: {
        marginLeft: 4,
    },
    commentInputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#d4d4d4',
        padding: 8,
        backgroundColor: 'white',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#d4d4d4',
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f0f0f0',
    },
})
export default DetailPostScreen
