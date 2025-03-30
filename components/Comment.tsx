import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { timeElapsed } from "../../helpers/timeElapsed";

const CommentComponent = ({ data }) => {
    console.log(data);
    const { user, content, createdAt } = data;
    return (
        <View className="flex-row item-start justify-center mb-4">
            <Image
                source={{ uri: user.avatar }}
                style={{
                    height: 40,
                    width: 40,
                    marginRight: 12,
                    borderRadius: 40,
                }}
                resizeMode="cover"
            />
            <View className="flex-1">
                <Text className="text-black text-xs font-normal font-['Montserrat'] leading-[14px] tracking-tight mb-1">
                    {content}
                </Text>
                <View className="flex-row gap-3">
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat'] leading-[14px]">
                        {timeElapsed(createdAt)}
                    </Text>
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat'] leading-[14px]">
                        Reply
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CommentComponent;
