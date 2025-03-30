import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";




import CameraNavigation from "./CameraNavigation";
import FeedNavigation from "./FeedNavigation";

// Import SVG icons
import { View } from "react-native";

import ChallengeNavigation from "./ChallengeNavigation";
import SuggestNavigation from "./SuggestNavigation";
import { useNavigation } from "@react-navigation/native";
import ProfileNavigation from './ProfileNavigation';
import { UserContext } from "@/context/AuthContext";
import userService from "@/services/user.service";
import Camera from "@/pages/InApp/Camera/Camera";
import { color } from "@/constants/Colors";
import { NewFeedIcon, SuggestIcon } from "@/assets/images/Button";

const Tab = createBottomTabNavigator();

const TabArr = [
    {
        route: "new-feed",
        label: "New Feed",
        icon: NewFeedIcon,
        component: FeedNavigation,
        badge: false,
    },
    {
        route: "suggest",
        label: "Suggest",
        icon: SuggestIcon,
        component: SuggestNavigation,

        badge: false,
    },
    {
        route: "camera",
        label: "Camera",
        icon: CameraIcon,
        component: CameraNavigation,
        badge: false,
    },
    {
        route: "challenge",
        label: "Challenge",
        icon: ChallengeIcon,
        component: ChallengeNavigation,

        badge: true,
    },
    {
        route: "my-profile",
        label: "Profile",
        icon: ProfileIcon,
        component: ProfileNavigation,
    },
];

const InAppNavigation = () => {
    const navigation = useNavigation();
    const { updateUser } = React.useContext(UserContext);
    React.useEffect(() => {
        (async () => {
            try {
                const data = await userService.getMyInfo();
                updateUser(data);
            } catch (error) {
                navigation.navigate("login");
            }
        })();
    }, []);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => {
                    const { icon: Icon } = TabArr.find(
                        (tab) => tab.route === route.name
                    );
                    if (route.name === "camera")
                        return (
                            <View className="w-[52px] h-[47px] left-0 bg-sky-900 rounded-[22px] flex-row items-center justify-center ">
                                <Camera />
                            </View>
                        );
                    return <Icon />;
                },
                tabBarActiveTintColor: color.primary,
                tabBarInactiveTintColor: "white",
                tabBarStyle: {
                    flexDirection: "row",
                    alignItems: "center",
                },
            })}
        >
            {TabArr.map((tab, index) => (
                <Tab.Screen
                    screenOptions={{
                        headerShown: false,
                    }}
                    key={index}
                    name={tab.route}
                    component={tab.component}
                    options={{
                        tabBarLabel: tab.label,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default InAppNavigation;
