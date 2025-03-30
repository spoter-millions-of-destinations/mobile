import React from "react";
import { StyleSheet, View } from "react-native";

const ContainerComponent = (props) => {
    return <View className="flex-1 bg-white px-6">{props.children}</View>;
};

const styles = StyleSheet.create({});

export default ContainerComponent;
