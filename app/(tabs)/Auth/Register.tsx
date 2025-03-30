
import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import authService from "../../../services/auth.service";
import { useNavigation } from "@react-navigation/native";
import InputComponent from "../../../components/InputComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import color from "../../../contants/color";
import { Lock, Sms, Unlock, User } from "iconsax-react-native";

const Register = () => {
    const [userInfo, setUserInfo] = useState({});
    const navigation = useNavigation();
    const inputStyle = "p-3 ";
    const handleRegister = async () => {
        try {
            if (userInfo.confirmPassword !== userInfo.password)
                throw "No macth password";
            const { confirmPassword, ...data } = userInfo;
            await authService.register(data);
            navigation.navigate("success");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View
            className="flex-1 justify-end"
            style={{ backgroundColor: color.primary }}
        >
            <View className="flex-row justify-center"></View>

            <View className="p-4 bg-white rounded-t-3xl">
                <Text className="text-center font-bold mb-5 text-2xl ">
                    Create a new account
                </Text>
                <InputComponent
                    value={userInfo.name}
                    onChangeText={(e) => setUserInfo({ ...userInfo, name: e })}
                    placeholder="Full name"
                />
                <InputComponent
                    value={userInfo.username}
                    onChangeText={(e) =>
                        setUserInfo({ ...userInfo, username: e })
                    }
                    placeholder="User name"
                    affix={<User size={22} color="gray" />}
                />
                <InputComponent
                    affix={<Sms size={22} color="gray" />}
                    value={userInfo.username}
                    onChangeText={(e) => setUserInfo({ ...userInfo, email: e })}
                    placeholder="abc@example.com"
                />
                <InputComponent
                    isPassword
                    value={userInfo.password}
                    onChangeText={(e) =>
                        setUserInfo({ ...userInfo, password: e })
                    }
                    affix={<Lock size={22} color="gray" />}
                    placeholder="*********"
                />
                <InputComponent
                    isPassword
                    affix={<Unlock size={22} color="gray" />}
                    value={userInfo.confirmPassword}
                    onChangeText={(e) =>
                        setUserInfo({ ...userInfo, confirmPassword: e })
                    }
                    placeholder="*********"
                />
                <TouchableOpacity
                    className="flex-row justify-center mb-4 py-3 rounded-xl "
                    style={{ backgroundColor: color.primary }}
                    onPress={() => {
                        handleRegister;
                    }}
                >
                    <Text className="text-white font-semibold">Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row justify-center"
                    onPress={() => navigation.navigate("login")}
                >
                    <Text className="text-black font-semibold">
                        Already have an account?
                    </Text>
                    <Text
                        className=" font-semibold"
                        style={[
                            {
                                color: color.primary,
                            },
                        ]}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
