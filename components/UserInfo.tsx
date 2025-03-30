import dayjs from "dayjs";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { timeElapsed } from "../../helpers/timeElapsed";
type UserInfoProps = {
    userImage?: string;
    postTime?: string;
    userName: string;
    textDark?: boolean;
    disableAdd?: boolean;
    style?: any;
    isSponser?: boolean;
};
const UserInfo = ({
    userImage = "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",

    postTime,
    userName,
    textDark = false,
    disableAdd = false,
    style,
    isSponser,
}: UserInfoProps) => {
    const styles = StyleSheet.create({
        userImage: {
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 10,
        },

        userName: {
            color: textDark ? "black" : "white",
            textShadowColor: !textDark ? "rgba(0, 0, 0, 0.60)" : undefined,
            textShadowOffset: !textDark ? { width: 0, height: 2 } : undefined,
            textShadowRadius: !textDark ? 4 : undefined,
        },
        postTime: {
            letterSpacing: 0.5,
            color: textDark ? "black" : "white",
            textShadowColor: !textDark ? "rgba(0, 0, 0, 0.60)" : undefined,
            textShadowOffset: !textDark ? { width: 0, height: 2 } : undefined,
            textShadowRadius: !textDark ? 4 : undefined,
        },
        follow: {
            position: "absolute",
            top: 28,
            left: 28,
        },
    });
    return (
        <View className="relative flex-row items-center" style={style}>
            <Image
                source={{
                    uri:
                        userImage ||
                        "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
                }}
                style={styles.userImage}
            />
            {!disableAdd && (
                <Image
                    source={require("../../assets/img/follow-icon.png")}
                    style={styles.follow}
                />
            )}
            <View>
                <Text
                    style={styles.userName}
                    className="text-sm font-medium font-['Montserrat'] leading-none tracking-tight mb-1"
                >
                    {userName}
                </Text>
                {postTime && (
                    <Text
                        style={styles.postTime}
                        className="text-[11px] font-['Montserrat']"
                    >
                        {isSponser ? "Sponsered" : timeElapsed(postTime)}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default UserInfo;
