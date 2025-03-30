import DetailPostScreen from "@/pages/InApp/DetailPostScreen";
import CollectionSuggestion from "@/pages/InApp/Suggest/CollectionSuggestion";
import DetailPublicSuggestion from "@/pages/InApp/Suggest/DetailPublicSuggestion";
import Suggest from "@/pages/InApp/Suggest/Suggest";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";


const Stack = createStackNavigator();

const SuggestNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="suggests" component={Suggest} />
            <Stack.Screen name="detail-suggest" component={DetailPostScreen} />
            <Stack.Screen
                name="suggest-collections"
                component={CollectionSuggestion}
            />
            <Stack.Screen
                name="detail-suggest-public-collection"
                component={DetailPublicSuggestion}
            />
        </Stack.Navigator>
    );
};

export default SuggestNavigation;
