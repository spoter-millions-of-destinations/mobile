import { Text, TouchableOpacity, View } from "react-native";
import { BackLeftToRight } from "../../assets/img/Button";

import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

export default Collection = ({ data, onPress }) => {
    const navigation = useNavigation();

    return (
        <View className="mb-5 w-full">
            <TouchableOpacity
                onPress={onPress}
                className="flex-row items-center justify-between px-[26] mb-[16]"
            >
                <View>
                    <Text className="mb-[5] text-neutral-700 text-sm font-semibold font-['Montserrat']">
                        {data?.name}
                    </Text>
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">
                        {data?.description}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackLeftToRight />
                </TouchableOpacity>
            </TouchableOpacity>
            <View className="flex-row items-center justify-start flex-wrap gap-2">
                {data?.collectionItems?.map((post, index) => (
                    <Image
                        key={index}
                        source={post.post.images[0]}
                        className="w-[100] h-[100] rounded-[10px]"
                    />
                ))}
            </View>
        </View>
    );
};
