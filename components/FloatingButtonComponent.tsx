import React from "react";
import { TouchableOpacity } from "react-native";

const FloatingButtonComponent = ({ icon, onPress, style }) => {
    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
            className="w-[50px] h-[50px] bg-neutral-50 rounded-full shadow flex-row justify-center items-center"
        >
            {icon}
        </TouchableOpacity>
    );
};

export default FloatingButtonComponent;
