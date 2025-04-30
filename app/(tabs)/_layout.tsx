import { Tabs } from 'expo-router'
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export const tabBarStyle: ViewStyle = {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
}
export default function TabsLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#0c4a6e',
                    tabBarStyle: tabBarStyle,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '500',
                    },
                }}
            >
                <Tabs.Screen
                    name="feed"
                    options={{
                        title: 'Feed',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="suggest"
                    options={{
                        title: 'Suggest',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="camera"
                    options={{
                        title: '',
                        tabBarIcon: ({ focused }) => (
                            <View className="w-[52px] h-[47px] left-0 bg-sky-900 rounded-[22px] flex-row items-center justify-center">
                                <Ionicons name={focused ? 'camera' : 'camera-outline'} size={32} color="#FFFFFF" />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="challenge"
                    options={{
                        title: 'Challenge',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? 'trophy' : 'trophy-outline'} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    )
}
