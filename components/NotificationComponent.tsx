import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ImageBackground,
} from "react-native";
import React from "react";
import { Image } from "expo-image";

const NotificationComponent = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                className="flex-row items-center px-[13] py-[12] bg-neutral-50 rounded-[15px] shadow relative top-[60] mx-6"
            >
                <Image
                    source="https://media-api.advertisingvietnam.com/oapi/v1/media?uuid=79734d27-4cb1-4fe2-98d6-828aefee2527&resolution=1440x756&type=image"
                    className="w-[60.17px] h-[60px] rounded-[10px]"
                />
                <View className="w-[220.57px] ml-3">
                    <Text className="text-neutral-800 text-base font-semibold font-['Montserrat'] ">
                        Mission completed!
                    </Text>
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">
                        Now you will be reward 1 token
                    </Text>
                </View>
                <Text className="font-['Montserrat'] font-500 text-xl">+1</Text>
                <ImageBackground
                    source={require("../../assets/img/token.jpg")}
                    className="flex-row items-center justify-center w-[50] h-[50] "
                ></ImageBackground>
            </TouchableOpacity>
        </Modal>
    );
};

export default NotificationComponent;
