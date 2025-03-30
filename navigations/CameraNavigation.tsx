import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Camera from "../pages/InApp/Camera/Camera";
import CreatePostScreen from "../pages/InApp/Camera/CreatePostScreen";

const Stack = createNativeStackNavigator();

const CameraNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="take-photo"
                component={Camera}
                initialParams={{ images: [] }}
            />
            <Stack.Screen
                name="create-post"
                component={CreatePostScreen}
                options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: "fitToContents",
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default CameraNavigation;
