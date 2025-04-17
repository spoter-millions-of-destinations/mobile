import { Image } from 'expo-image'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ads, Follow, LineProfile, Share } from '@/assets/images/Button'

import { color } from '@/constants/Colors'

import { useNavigation } from '@react-navigation/native'
import { UserContext } from '@/context/AuthContext'
import posts from '@/data/posts'
import collectionService, { Collection } from '@/services/collection.service'
import Loading from '@/components/Loading'
import { Collection as CollectionComponent } from '@/components/Collection'
import UserProfile from './components/UserProfile'





const Profile = () => {
    return (
        <View className="flex-1">
            <ScrollView className="flex-1 bg-neutral-50">
                <UserProfile />
                <View className="-mt-[29] px-6 flex-1 h-[1000] bg-neutral-50 ">
                    <Tab.Navigator
                        className="bg-neutral-50 "
                        screenOptions={({ route }) => ({
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName
                                let iconSize = 24
                                switch (route.name) {
                                    case 'user-posts':
                                        iconName = focused ? 'apps' : 'apps-outline'
                                        break
                                    case 'user-images':
                                        iconName = focused ? 'image' : 'image-outline'
                                        break
                                    case 'user-collections':
                                        iconName = focused ? 'bookmark' : 'bookmark-outline'
                                        break
                                    default:
                                        iconName = focused ? 'bookmark' : 'bookmark-outline'
                                }
                                return <Icon name={iconName} size={iconSize} color={color} />
                            },
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: 'gray',
                            tabBarStyle: {
                                backgroundColor: 'transparent',
                            },

                            tabBarIndicatorStyle: {
                                backgroundColor: '#404040',
                                width: 40,
                                left: '16.75%',
                                marginLeft: -20,
                            },
                        })}
                    >
                        <Tab.Screen name="user-posts" component={UserPosts} />
                        <Tab.Screen name="user-images" component={UserImages} />
                        <Tab.Screen name="user-collections" component={UserCollections} />
                    </Tab.Navigator>
                </View>
            </ScrollView>
        </View>
    )
}



const Number = ({ number, content }) => {
    return (
        <View className="flex-col items-center">
            <Text className="mb-[2] text-center text-sky-950 text-xl font-semibold font-['Montserrat']">{number}</Text>

            <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">{content}</Text>
        </View>
    )
}



export default Profile
