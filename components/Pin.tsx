import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

const Pin = ({ source }) => {
    console.log(source);
    return (
        <View className="overflow-hidden">
            <Image source={source} className="w-6 h-6" />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Pin;
