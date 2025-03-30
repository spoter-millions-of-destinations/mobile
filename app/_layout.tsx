import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { fonts } from "@/assets/fonts/fonts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "@/navigations/AppNavigation";
import { UserProvider } from "@/context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const queryClient = useQueryClient();
    const colorScheme = useColorScheme();
    const [loaded] = useFonts(fonts);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView className="flex-1">
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    <UserProvider>
                        <AppNavigation />
                    </UserProvider>
                </ThemeProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
