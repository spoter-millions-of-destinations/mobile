import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image, ImageBackground } from "expo-image";
import { Pin } from "../../assets/img/Button";
import { useNavigation } from "@react-navigation/native";

const MissionComponent = ({ info }) => {
    const { image, title, time, position, process } = info;
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            className="bg-neutral-50 rounded-[15px] shadow border border-neutral-300 py-[11] pl-[11] pr-[40] flex-row mb-[15] relative"
            onPress={() => navigation.navigate("detail-challenge", { info })}
        >
            <View className="shadow h-[80] w-[80]  mr-[20]">
                <Image
                    source={image}
                    className="w-full h-full rounded-[10px]"
                />
            </View>
            <View className="flex-1">
                <View className="mb-2">
                    <Text className="text-sky-800 text-base font-semibold font-['Montserrat']">
                        {time}
                    </Text>
                </View>

                <View className="mb-2">
                    <Text className="text-neutral-800 text-xs font-normal font-['Montserrat'] ">
                        {title}
                    </Text>
                </View>

                <View className="flex-row items-center w-full">
                    <Pin className="mr-2" />
                    <Text className="text-neutral-400 text-[10px] font-normal font-['Montserrat'] flex-1">
                        {position}
                    </Text>
                </View>
            </View>
            <ImageBackground
                source={require("../../assets/img/process.jpg")}
                className="flex-row items-center justify-center w-[30] h-[30] absolute bottom-2 right-2"
            >
                <Text className="text-sky-800 text-[8px] font-normal font-['Montserrat']">
                    {process}%
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default MissionComponent;
