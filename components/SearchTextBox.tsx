import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";

const SearchTextBox = ({ prefix, affix }) => {
    return (
        <View className="flex-row px-[20px] py-2 bg-neutral-50 rounded-[35px] shadow items-center w-full justify-between mb-[15]">
            <View className="flex-row justify-center items-center">
                {prefix && prefix}
                <TouchableOpacity
                    className=""
                    onPress={() => navigation.navigate("search-destination")}
                >
                    <TextInput placeholder="Search here..." />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center">
                {affix && affix}
            </View>
        </View>
    );
};

export default SearchTextBox;
