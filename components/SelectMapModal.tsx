import React, { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Delete, Filter } from "../../assets/img/Button";
import FloatingButtonComponent from "./FloatingButtonComponent";

import { Image } from "expo-image";
import _maps from "../../data/map";

const SelectMapModal = ({ urlMap, setUrlMap }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const ImageMap = ({ source, title, mapUrl }) => {
        return (
            <TouchableOpacity onPress={() => setUrlMap(mapUrl)} className={``}>
                <View
                    className={` rounded-xl shadow-inner p-1 mb-[6] ${
                        urlMap === mapUrl ? "border-2 border-blue-500" : ""
                    }`}
                >
                    <Image
                        source={source}
                        className={` w-20 h-20 rounded-lg shadow-inner `}
                    />
                </View>

                <Text
                    className={`text-center 
                    ${
                        urlMap === mapUrl
                            ? "text-blue-500 font-bold "
                            : "text-neutral-400 font-normal"
                    } text-[10px] font-['Open Sans']`}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <View>
            <FloatingButtonComponent
                icon={<Filter />}
                onPress={() => setModalVisible(true)}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="relative flex-1 bg-transparent justify-end pb-6">
                    <View className="flex-row justify-center items-end ">
                        <View style={styles.modalView}>
                            <View className="flex-row justify-between items-center mb-2">
                                <View className="flex-1">
                                    <Text className="text-neutral-800 text-sm font-medium font-['Montserrat']">
                                        Kinds of Map
                                    </Text>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setModalVisible(!modalVisible)
                                        }
                                    >
                                        <Delete />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                horizontal={false}
                                numColumns={3}
                                data={_maps}
                                columnWrapperStyle={{
                                    gap: 15,
                                }}
                                renderItem={({ item }) => (
                                    <ImageMap
                                        source={item.image}
                                        title={item.title}
                                        mapUrl={item.mapUrl}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default SelectMapModal;
