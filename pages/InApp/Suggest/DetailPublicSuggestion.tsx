import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import collectionService from "../../../../services/collection.service";

import MasonryList from "@react-native-seoul/masonry-list";
import { Image } from "expo-image";
import { BackRightToLeft, Pin } from "../../../../assets/img/Button";
import Loading from "../../../components/Loading";
const DetailPublicSuggestion = () => {
    const { collectionId, collectionName, collectionDescription } =
        useRoute().params;
    const navigation = useNavigation();
    const [collection, setCollection] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data = await collectionService.getCollectionItems(
                    collectionId
                );
                setCollection(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [collectionId]);

    return (
        <SafeAreaView className="flex-1 bg-neutral-50">
            <View className="px-6 flex-1 ">
                <TouchableOpacity
                    className="relative top-[20]"
                    onPress={() => navigation.goBack()}
                >
                    <BackRightToLeft />
                </TouchableOpacity>

                <View className="flex-col items-center mb-[15]">
                    <Text className=" text-center text-neutral-700 text-2xl font-semibold font-['Montserrat'] ">
                        {collectionName}
                    </Text>
                    <Text className="w-[245px] text-center text-neutral-500 text-xs font-normal font-['Montserrat'] ">
                        {collectionDescription}
                    </Text>
                </View>
                {isLoading ? (
                    <Loading />
                ) : (
                    <MasonryList
                        style={{
                            justifyContent: "between",
                        }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={collection.collectionItems || []}
                        renderItem={({ item }) => <PostItem data={item} />}
                        estimatedItemSize={200}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};
const PostItem = ({ data }) => {
    const { images, description } = data.post;
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("new-feed", {
                    screen: "detail-post",
                    params: { post: data.post },
                })
            }
            className="w-full p-[10]"
        >
            <Image
                className="h-[161px] w-full rounded-[15px] mb-[5]"
                source={images[0]}
            />
            <Text className="text-neutral-500 text-[10px] font-normal font-['Montserrat'] mb-[5]">
                {description}
            </Text>
            <View className="flex-row gap-x-1 items-center">
                <Pin />
                <Text className=" text-neutral-600 text-[10px] font-normal font-['Montserrat'] ">
                    Vietnam
                </Text>
            </View>
        </TouchableOpacity>
    );
};
export default DetailPublicSuggestion;
