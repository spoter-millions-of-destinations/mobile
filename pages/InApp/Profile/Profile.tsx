import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image } from "expo-image";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Ads, Follow, LineProfile, Share } from "../../../../assets/img/Button";
import { UserContext } from "../../../../context/user";
import color from "../../../contants/color";

import Icon from "react-native-vector-icons/Ionicons";
import UserCollections from "./UserCollections";
import UserImages from "./UserImages";
import UserPosts from "./UserPosts";
import { useNavigation } from "@react-navigation/native";
const Tab = createMaterialTopTabNavigator();

function UserProfile() {
    const { user } = React.useContext(UserContext);
    const navigation = useNavigation()
    return (
        <View>
            <View className="relative">
                <TouchableOpacity onPress={()=>navigation.navigate("create-ads")} className="absolute z-20 right-[24] top-[60]">
                    <Ads />
                </TouchableOpacity>
                <Image
                    className="w-full h-[223px] rounded-bl-[25px] rounded-br-[25px]"
                    source={
                        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/anh-nen-cute.jpg"
                    }
                />
            </View>
            <View className="px-[42] -top-[50] relative">
                <View className="justify-center items-center ">
                    <Image
                        source={user.avatar}
                        className="w-[100] h-[100] rounded-full"
                    />
                </View>
                <View className="mb-2">
                    <Text className="text-center text-neutral-800 text-2xl font-semibold font-['Montserrat']">
                        {user.name}
                    </Text>
                </View>
                <View className="flex-row mb-[15] items-center justify-between">
                    <Number number={870} content={"Following"} />
                    <LineProfile />
                    <Number number={11.1911} content={"Followers"} />
                    <LineProfile />
                    <Number number={250.302} content={"Likes"} />
                </View>
                <View className="mb-3">
                    <Text className="mb-1 text-center text-neutral-800 text-sm font-normal font-['Montserrat']">
                        I’m a positive person. I love to travel and eat. Always
                        available for chat
                    </Text>
                    <Text className="text-center text-neutral-600 text-xs font-normal font-['Montserrat']">
                        Los Angeles, CA
                    </Text>
                </View>
                <View className="flex-row items-center justify-center gap-x-2">
                    <TouchableOpacity
                        style={{
                            backgroundColor: color.primary,
                        }}
                        className="px-[47px] py-[15px] rounded-[100px] justify-center items-center"
                    >
                        <Text className="text-center text-neutral-50 text-base font-semibold font-['Montserrat'] stracking-wide">
                            Messsage
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-[15] py-[15] rounded-full border border-neutral-200 justify-center items-center">
                        <Follow />
                    </TouchableOpacity>
                    <TouchableOpacity className="px-[15] py-[15] rounded-full border border-neutral-200 justify-center items-center">
                        <Share />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

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
                                let iconName;
                                let iconSize = 24;
                                switch (route.name) {
                                    case "user-posts":
                                        iconName = focused
                                            ? "apps"
                                            : "apps-outline";
                                        break;
                                    case "user-images":
                                        iconName = focused
                                            ? "image"
                                            : "image-outline";
                                        break;
                                    case "user-collections":
                                        iconName = focused
                                            ? "bookmark"
                                            : "bookmark-outline";
                                        break;
                                    default:
                                        iconName = focused
                                            ? "bookmark"
                                            : "bookmark-outline";
                                }
                                return (
                                    <Icon
                                        name={iconName}
                                        size={iconSize}
                                        color={color}
                                    />
                                );
                            },
                            tabBarActiveTintColor: "black",
                            tabBarInactiveTintColor: "gray",
                            tabBarStyle: {
                                backgroundColor: "transparent",
                            },

                            tabBarIndicatorStyle: {
                                backgroundColor: "#404040",
                                width: 40,
                                left: "16.75%",
                                marginLeft: -20,
                            },
                        })}
                    >
                        <Tab.Screen name="user-posts" component={UserPosts} />
                        <Tab.Screen name="user-images" component={UserImages} />
                        <Tab.Screen
                            name="user-collections"
                            component={UserCollections}
                        />
                    </Tab.Navigator>
                </View>
            </ScrollView>
        </View>
    );
};
const Number = ({ number, content }) => {
    return (
        <View className="flex-col items-center">
            <Text className="mb-[2] text-center text-sky-950 text-xl font-semibold font-['Montserrat']">
                {number}
            </Text>

            <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">
                {content}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({});

export default Profile;
