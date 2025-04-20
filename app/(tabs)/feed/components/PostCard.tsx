import { Ionicons } from '@expo/vector-icons' // Thư viện icons
import { Text, View, ImageBackground } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getColors, ImageColorsResult } from 'react-native-image-colors'

import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

import { Post } from '@/services/post.service'
import { hexToRgba } from '@/helpers/hexToRgba'
import UserInfo from '@/components/UserInfo'
import { Pin } from '@/assets/images/Button'
import { useRouter } from 'expo-router'
import { useToggle } from '@/hooks'
import { ButtonOnPost } from './ButtonOnPost'

const PostCard = ({ post }: { post: Post }) => {
    const router = useRouter()
    const {
        id,
        user,
        createdAt,
        images,
        likes = Math.floor(Math.random() * 10000),
        comments = Math.floor(Math.random() * 10000),
        description,
        attraction = {},
    } = post

    const [liked, toggleLike] = useToggle(post.isFavorite, !post.isFavorite)
    const [likeNumber, setLikeNumber] = useState(likes)
    const [colors, setColors] = useState({
        primary: '#ffffff',
        detail: '#ffffff',
    })

    useEffect(() => {
        ;(async () => {
            try {
                const result = await getColors(images[0], {
                    fallback: '#fff',
                    cache: true,
                    key: images[0],
                    quality: 'highest',
                })

                if (result.platform === 'ios') {
                    setColors({
                        primary: result.primary,
                        detail: result.detail,
                    })
                } else if (result.platform === 'android') {
                    setColors({
                        primary: result.dominant || '#ffffff',
                        detail: result.average || '#ffffff',
                    })
                } else {
                    // web fallback
                    setColors({
                        primary: result.dominant || '#ffffff',
                        detail: result.darkVibrant || '#ffffff',
                    })
                }
            } catch (error) {
                console.error('Lỗi khi lấy màu sắc:', error)
            }
        })()
    }, [images])

    const navigation = useNavigation()

    const handleGoToDetailPost = () =>
        router.push({
            pathname: '/(tabs)/feed/[id]',
            params: {
                id: post.id,
                post: JSON.stringify(post),
                from: 'feeds',
            },
        })

    const handleToggleLink = () => {
        setLikeNumber((cur) => (liked ? cur - 1 : cur + 1))
        toggleLike()
    }

    return (
        <View className={` mb-5 rounded-3xl overflow-hidden`}>
            <LinearGradient
                dither={true}
                start={{ x: 0, y: 1 }}
                colors={[hexToRgba(colors.primary, 0.25), hexToRgba(colors.detail, 0.25)]}
            >
                <ImageBackground
                    source={{ uri: images[0] }}
                    className="h-[375] p-[14] flex-col justify-between shadow"
                    imageStyle={{ borderRadius: 24 }}
                >
                    <View className="flex-row justify-between">
                        <UserInfo user={user} postTime={createdAt} />

                        <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                    </View>
                    <View className="flex-row justify-between">
                        <View className="flex-row" style={{ gap: 9 }}>
                            <ButtonOnPost
                                text={likeNumber}
                                onPress={handleToggleLink}
                                icon={
                                    <Ionicons
                                        name={liked ? 'heart' : 'heart-outline'}
                                        size={20}
                                        color={liked ? 'red' : 'white'}
                                    />
                                }
                            />
                            <ButtonOnPost
                                text={comments}
                                onPress={handleGoToDetailPost}
                                icon={<Ionicons name="chatbubble-outline" size={20} color="white" />}
                            />
                        </View>
                        <View className="flex-row" style={{ gap: 9 }}>
                            <ButtonOnPost
                                onPress={() =>
                                    navigation.navigate('map', {
                                        post: [post.longitude, post.latitude],
                                    })
                                }
                                icon={<Ionicons name="paper-plane-outline" size={20} color="white" />}
                            />

                            <ButtonOnPost
                                onPress={() =>
                                    navigation.navigate('save', {
                                        postImage: images[0],
                                        postId: id,
                                    })
                                }
                                icon={<Ionicons name="bookmark-outline" size={20} color="white" />}
                            />
                        </View>
                    </View>
                </ImageBackground>
                <View className="px-5 py-4">
                    <TouchableOpacity onPress={handleGoToDetailPost}>
                        <Text className="text-black text-[14px] font-normal font-['Montserrat'] mb-2">
                            {description}
                        </Text>
                        <View className="flex-row justify-end mt-1">
                            <View className="flex-row items-center justify-end gap-1">
                                <Pin className="mr-[5]" />
                                <Text className=" text-neutral-600 text-[10px] font-normal font-['Montserrat']">
                                    {`${post.attraction?.placeName}, ${post.attraction?.city}, ${post.attraction?.country}`}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}


export default PostCard
