import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";

import AuthNavgation from "./AuthNavigation";
import InAppNavigation from "./InAppNavigation";

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="auth" component={AuthNavgation} />
                <Stack.Screen name="in-app" component={InAppNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default AppNavigation;
