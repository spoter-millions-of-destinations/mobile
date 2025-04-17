import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Challenge from "@/app/(tabs)/challenge";
import DetailChanllenge from "@/app/(tabs)/challenge/[id]";


const Stack = createNativeStackNavigator();

const ChallengeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="challenges" component={Challenge} />
            <Stack.Screen
                name="detail-challenge"
                component={DetailChanllenge}
            />
        </Stack.Navigator>
    );
};

export default ChallengeNavigation;
