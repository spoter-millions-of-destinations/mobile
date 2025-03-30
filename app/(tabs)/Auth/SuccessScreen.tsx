import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const SuccessScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableHighlight onPress={() => navigation.navigate("login")}>
                <Text>Success!</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({});

export default SuccessScreen;
