import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    BackRightToLeft,
    Calender,
    CalenderGray,
    PinChallenge,
} from "../../../../assets/img/Button";
import missions from "../../../../data/missions";

const DetailChanllenge = () => {
    const { title, image, time, position, host, hostImage, description } =
        useRoute().params.info;
    const navigation = useNavigation();
    return (
        <ScrollView className="flex-1  bg-neutral-50">
            <View className="rounded-bl-[20px] rounded-br-[20px] overflow-hidden mb-[25.3] relative">
                <Image source={image} className="w-full h-[250] " />
                <TouchableOpacity
                    className="absolute left-[24] top-[50] w-[50px] h-[50px] justify-center items-center flex-row bg-neutral-50 rounded-full shadow"
                    onPress={() => navigation.goBack()}
                >
                    <BackRightToLeft />
                </TouchableOpacity>
            </View>
            <View className="px-6">
                <View className="mb-[30]">
                    <Text className="text-neutral-800 text-[26px] font-semibold font-['Montserrat']  tracking-wide">
                        {title}
                    </Text>
                </View>
                <View>
                    <Info
                        title={time}
                        description={"32 days remaining"}
                        icon={<Calender />}
                    />
                    <Info
                        title={position}
                        description={"23km near here"}
                        icon={<PinChallenge />}
                    />
                    <Info
                        title={host}
                        description={"Organizer"}
                        icon={
                            <Image
                                source={hostImage}
                                className="w-full h-full"
                            />
                        }
                        prefix={
                            <TouchableOpacity className="px-[13px] py-2 bg-sky-100 rounded-[10px] justify-center items-center inline-flex">
                                <Text className="text-sky-900 text-[10px] font-normal font-['Montserrat'] leading-[10px]">
                                    Follow
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                </View>

                <View className="mb-[60]">
                    <Text className="text-neutral-800 text-xl font-normal  leading-tight">
                        About event
                    </Text>
                    <Text numberOfLines={3} ellipsizeMode="tail">
                        {description}
                    </Text>
                </View>
                <View className="flex-row flex-wrap flex-1 justify-between">
                    {missions.map((mision, index) => (
                        <MissionSmallComponent key={index} info={mision} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};
const MissionSmallComponent = ({ info }) => {
    const { image, title, time } = info;
    return (
        <View className="mb-5 w-[180] p-[6] bg-white rounded-[15px] shadow">
            <View className=" mb-2">
                <Image
                    source={image}
                    className="w-full  h-[115px] rounded-[15px]"
                />
            </View>
            <Text className="text-black text-xs font-medium font-['Montserrat'] mb-2">
                {title}
            </Text>
            <View className="flex-row items-center">
                <CalenderGray className="mr-[5]" />
                <Text className="text-neutral-400 text-[10px] font-medium font-['Montserrat']">
                    {time}
                </Text>
            </View>
        </View>
    );
};
const Info = ({ icon, title, description, prefix }) => {
    return (
        <View className="flex-row mb-[25] items-center justify-between">
            <View className="flex-row items-center flex-1">
                <View className="w-[60px] h-[60px] bg-sky-100 rounded-[10px] mr-5 flex-row items-center justify-center overflow-hidden">
                    {icon}
                </View>
                <View className="flex-1">
                    <Text className="text-neutral-800 text-base font-semibold font-['Montserrat'] ">
                        {title}
                    </Text>
                    <Text className="text-neutral-400 text-sm font-normal font-['Montserrat'] ">
                        {description}
                    </Text>
                </View>
            </View>
            <View>{prefix}</View>
        </View>
    );
};
const styles = StyleSheet.create({});

export default DetailChanllenge;
