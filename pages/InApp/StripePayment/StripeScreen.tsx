import { View, Text, SafeAreaView } from "react-native";
import React from "react";

import { WebView } from "react-native-webview";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
const StripeScreen = () => {
    const navigation = useNavigation()
    const { uri } = useRoute().params;
    useFocusEffect(
        React.useCallback(() => {
            const parentNavigation = navigation.getParent();
            parentNavigation?.setOptions({
                tabBarStyle: { display: "none" },
            });

            return () => {
                parentNavigation?.setOptions({
                    tabBarStyle: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    },
                });
            };
        }, [navigation])
    );
    return (
        <SafeAreaView className="flex-1">
            <WebView source={{ uri: uri }} style={{ flex: 1 }} />
        </SafeAreaView>
    );
};

export default StripeScreen;
