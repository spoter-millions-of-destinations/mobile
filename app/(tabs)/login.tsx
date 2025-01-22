import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Lock, User } from "iconsax-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = () => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<{
        username: string;
        password: string;
    }>({
        username: "",
        password: "",
    });
    const navigation = useNavigation();
    const { updateUser } = useContext(UserContext);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const data = {
                username: userInfo.username.toLowerCase().trim(),
                password: userInfo.password,
            };
            console.log(data);
            const response = await authService.login(
                userInfo.username.toLowerCase(),
                userInfo.password
            );
            console.log(response);
            await setDataStorage("account", response.data);
            navigation.navigate("in-app", { screen: "NewFeedScreen" });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1" style={{ backgroundColor: color.white }}>
            <View className="flex-row justify-center mt-[100] w-full">
                <Image
                    source={require("../../../../assets/img/logo-with-text.png")}
                    className="w-full h-[200]"
                />
            </View>

            <View className="px-5 pt-4 pb-[30.5] bg-white rounded-t-3xl ">
                <Text className="text-black text-2xl font-semibold font-['Montserrat'] leading-normal mb-5">
                    Sign in
                </Text>
                <View>
                    <InputComponent
                        value={userInfo.username}
                        onChangeText={(e) =>
                            setUserInfo({ ...userInfo, username: e })
                        }
                        placeholder="user name"
                        affix={<User size={22} color="gray" />}
                    />
                    <InputComponent
                        isPassword
                        value={userInfo.password}
                        onChangeText={(e) =>
                            setUserInfo({ ...userInfo, password: e })
                        }
                        affix={<Lock size={22} color="gray" />}
                        placeholder="your password"
                    />
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{ backgroundColor: color.primary }}
                        className="mb-7 w-full rounded-xl py-5 "
                    >
                        <Text className="text-center text-white text-base font-medium font-['Montserrat']">
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="w-[294px] h-[0px] border border-neutral-500 mx-auto"></View>
                <View className="mb-3 relative bottom-3 bg-white inline">
                    <Text className=" text-center text-neutral-500 text-sm font-medium font-['Montserrat'] leading-none inline">
                        or log in with
                    </Text>
                </View>

                <View className="flex-row gap-x-3 justify-center mb-[150]">
                    <View>
                        <Facebook />
                    </View>
                    <View>
                        <Google />
                    </View>
                    <View>
                        <Apple />
                    </View>
                    <View>
                        <WhatsApp />
                    </View>
                </View>

                <Text
                    className="text-center text-neutral-400 text-sm font-normal font-['Open Sans'] leading-none tracking-tight"
                    onPress={() => navigation.navigate("register")}
                >
                    Don't have an account yet?
                    <Text
                        style={{ color: color.primary }}
                        className="text-center text-sky-800 text-sm font-normal font-['Open Sans'] underline leading-none tracking-tight"
                    >
                        {" "}
                        Sign up
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default LoginScreen;
