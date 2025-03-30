import DetailCollection from "@/pages/InApp/DetailCollection";
import DetailPostScreen from "@/pages/InApp/DetailPostScreen";
import AttractionPin from "@/pages/InApp/NewFeed/AttractionPin";
import CreateCollection from "@/pages/InApp/NewFeed/CreateCollection";
import MapScreen from "@/pages/InApp/NewFeed/MapScreen";
import NewFeed from "@/pages/InApp/NewFeed/NewFeed";
import NotificationScreen from "@/pages/InApp/NewFeed/NotificationScreen";
import PersionPin from "@/pages/InApp/NewFeed/PersionPin";
import SaveScreen from "@/pages/InApp/NewFeed/SaveScreen";
import SearchDestinationScreen from "@/pages/InApp/NewFeed/SearchDestinationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const NewFeedStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="posts"
                component={NewFeed}
                initialParams={{
                    isPostSuccess: false,
                }}
            />
            <Stack.Screen name="detail-post" component={DetailPostScreen} />
            <Stack.Screen name="map" component={MapScreen} />
            <Stack.Screen name="notification" component={NotificationScreen} />
            <Stack.Screen
                name="search-destination"
                component={SearchDestinationScreen}
            />
            <Stack.Screen
                screenOptions={{
                    fotterShown: false,
                }}
                name="save"
                component={SaveScreen}
                options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: "all",
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="create-collection"
                component={CreateCollection}
                options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: "large",
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="persion-pin"
                component={PersionPin}
                options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: "all",
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="attraction-pin"
                component={AttractionPin}
                options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: "medium",
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="detail-collection"
                component={DetailCollection}
            />
        </Stack.Navigator>
    );
};

export default NewFeedStack;
