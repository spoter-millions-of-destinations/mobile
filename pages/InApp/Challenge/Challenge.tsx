import { Image, ImageBackground } from "expo-image";

import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { BackLeftToRight, Challenge as ChallengeIcon, Coin, Wallet } from "../../../../assets/img/Button";
import missions from "../../../../data/missions";
import MissionComponent from "../../../components/MissionComponent";
const Challenge = () => {
    return (
        <View className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    className="h-[210] rounded-bl-[50] rounded-br-[50] justify-center p-6  mb-[73]"
                    source={require("../../../../assets/img/bg-challenge.jpg")}
                >
                    <View className="relative">
                        <Text className="text-neutral-50 text-2xl font-semibold font-['Montserrat'] ">
                            Congratulation!
                        </Text>
                        <Text className="text-neutral-50 text-xs font-normal font-['Montserrat'] ">
                            You got a new Mission
                        </Text>
                        <View className="h-[100px] w-full bg-neutral-50 rounded-[15px] shadow items-center flex-row justify-between px-5 mb-5 absolute bottom-[-300%] transform -translate-x-1/2 ">
                            <View className="flex-row gap-x-4">
                                <ChallengeIcon />
                                <Text className="text-black text-sm font-semibold font-['Montserrat'] leading-none">
                                    Rewards
                                </Text>
                            </View>
                            <View className="flex-col ">
                                <View className="flex-row items-center">
                                    <Text className="text-right text-black text-2xl font-semibold font-['Montserrat']">
                                        23.425
                                    </Text>
                                    <Image
                                        style={{
                                            width: 40,
                                            height: 40,
                                        }}
                                        resizeMode="cover"
                                        source={require("../../../../assets/img/token.jpg")}
                                    />
                                </View>
                                <Text className="text-black text-[10px] font-normal font-['Montserrat']">
                                    Equals 23,425 VNĐ
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View className="flex-1 px-6">
                    <View className="flex-row justify-between mb-[20]">
                        <Button
                            onPress={() => {}}
                            icon={<Coin />}
                            text={"Wallet"}
                        />
                        <Button
                            onPress={() => {}}
                            icon={<Wallet />}
                            text={"Recharge"}
                        />
                    </View>
                    <View>
                        <View className="mb-[15]">
                            <Text className="text-black text-2xl font-semibold font-['Montserrat'] leading-7">
                                Missions
                            </Text>
                        </View>
                        {missions.map((mission, index) => (
                            <MissionComponent key={index} info={mission} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const Button = ({ icon, text, onPress }) => {
    return (
        <TouchableOpacity
            className="px-[22] py-[27] flex-row justify-between items-center h-[130px] bg-white rounded-[25px] shadow border border-neutral-300 w-[45%]"
            onPress={onPress}
        >
            <View>
                {icon}
                <Text className="mt-[22] text-neutral-800 text-base font-semibold font-['Montserrat'] leading-[18px]">
                    {text}
                </Text>
            </View>
            <BackLeftToRight />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default Challenge;
