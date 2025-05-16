import { Ionicons } from '@expo/vector-icons' // Thư viện icons
import { ImageBackground, Text, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getColors } from 'react-native-image-colors'

import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

import { Pin } from '@/assets/images/Button'
import UserInfo from '@/components/UserInfo'
import { hexToRgba } from '@/helpers/hexToRgba'
import { useToggle } from '@/hooks'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { Post } from '@/services/post.service'

const PostCard = ({ post }: { post: Post }) => {
    const { goToPostDetail, goToCollection, goToMap } = useNavigatHelper()
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
        let mounted = true

        ;(async () => {
            try {
                const result = await getColors(images[0])
                if (!mounted) return

                const newColors =
                    result.platform === 'ios'
                        ? { primary: result.primary, detail: result.detail }
                        : result.platform === 'android'
                        ? {
                              primary: result.dominant || '#ffffff',
                              detail: result.average || '#ffffff',
                          }
                        : {
                              primary: result.dominant || '#ffffff',
                              detail: result.darkVibrant || '#ffffff',
                          }

                if (newColors.primary !== colors.primary || newColors.detail !== colors.detail) {
                    setColors(newColors)
                }
            } catch (error) {
                console.warn('getColors error:', error)
            }
        })()

        return () => {
            mounted = false
        }
    }, [colors, images[0]])

    const handleToggleLink = () => {
        setLikeNumber((cur) => (liked ? cur - 1 : cur + 1))
        toggleLike()
    }

    return (
        <View className={` mb-5 rounded-3xl overflow-hidden`}>
            <View>
                <LinearGradient
                    dither={true}
                    start={{ x: 0, y: 1 }}
                    colors={[hexToRgba(colors.primary, 0.25), hexToRgba(colors.detail, 0.25)]}
                >
                    <ImageBackground
                        key={images[0]}
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
                                <Button
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
                                <Button
                                    text={comments}
                                    onPress={() => goToPostDetail(post)}
                                    icon={<Ionicons name="chatbubble-outline" size={20} color="white" />}
                                />
                            </View>
                            <View className="flex-row" style={{ gap: 9 }}>
                                <Button
                                    onPress={() => goToMap([+post.longitude, +post.latitude], 'detail_post')}
                                    icon={<Ionicons name="paper-plane-outline" size={20} color="white" />}
                                />
                                <Button
                                    onPress={() => goToCollection(post)}
                                    icon={<Ionicons name="bookmark-outline" size={20} color="white" />}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                    <View className="px-5 py-4">
                        <TouchableOpacity onPress={() => goToPostDetail(post)}>
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
        </View>
    )
}

const Button = ({ text, icon, onPress }: { text?: string | number; icon: React.ReactNode; onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} className="rounded-[14px] overflow-hidden">
            <BlurView
                intensity={40}
                tint="light"
                className=" px-3 py-3.5 bg-neutral-50/40 rounded-2xl backdrop-blur-[1.50px] flex-row justify-start items-center gap-2.5 overflow-hidden"
            >
                {icon}
                {text && (
                    <Text className="text-center text-neutral-50 text-xs font-semibold font-['Montserrat']">
                        {text}
                    </Text>
                )}
            </BlurView>
        </TouchableOpacity>
    )
}

export default PostCard
