import { color } from '@/constants/Colors'
import { calculateTime } from '@/helpers/time'
import { AdvertisingPackage } from '@/services/post.service'
import { User } from '@/services/user.service'
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type UserInfoProps = {
    postTime?: string
    textDark?: boolean
    disableAdd?: boolean
    style?: any
    packageInfo?: AdvertisingPackage
} & { user: Pick<User, 'id' | 'name' | 'avatar'> }

const UserInfo = ({ user, postTime, textDark = false, disableAdd = false, style, packageInfo }: UserInfoProps) => {
    const styles = StyleSheet.create({
        userImage: {
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 10,
        },
        userName: {
            color: textDark ? 'black' : 'white',
            textShadowColor: !textDark ? 'rgba(0, 0, 0, 0.60)' : undefined,
            textShadowOffset: !textDark ? { width: 0, height: 2 } : undefined,
            textShadowRadius: !textDark ? 4 : undefined,
        },
        postTime: {
            letterSpacing: 0.5,
            color: textDark ? 'black' : 'white',
            textShadowColor: !textDark ? 'rgba(0, 0, 0, 0.60)' : undefined,
            textShadowOffset: !textDark ? { width: 0, height: 2 } : undefined,
            textShadowRadius: !textDark ? 4 : undefined,
        },
        follow: {
            position: 'absolute',
            top: 28,
            left: 28,
        },
    })

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: '/(share)/profile/[id]',
                    params: { id: user.id },
                })
            }
        >
            <View className="relative flex-row items-center" style={style}>
                <Image source={{ uri: user.avatar }} style={styles.userImage} />
                {!disableAdd && <Image source={require('@/assets/images/follow-icon.png')} style={styles.follow} />}
                <View>
                    <Text
                        style={styles.userName}
                        className="text-sm font-medium font-['Montserrat'] leading-none tracking-tight mb-1"
                    >
                        {user.name}
                    </Text>

                    {postTime &&
                        (packageInfo ? (
                            <Text
                                className="text-[11px] font-['Montserrat'] font-semibold bg-white/10 px-2 py-0.5 rounded w-fit"
                                style={{
                                    color: color[packageInfo.name],
                                }}
                            >
                                Sponsered
                            </Text>
                        ) : (
                            <Text style={styles.postTime} className="text-[11px] font-['Montserrat']">
                                {calculateTime(postTime)}
                            </Text>
                        ))}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserInfo
