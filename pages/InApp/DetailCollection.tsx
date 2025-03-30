import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import collectionService from "../../../services/collection.service";
import { BackRightToLeft } from "../../../assets/img/Button";
import { Image } from "expo-image";
import ContainerComponent from "../../components/ContainerComponent";

const DetailCollection = () => {
    const { collectionId, collectionName } = useRoute().params;
    const [collection, setCollection] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation();
    React.useEffect(() => {
        (async () => {
            try {
                const data = await collectionService.getCollectionItems(
                    collectionId
                );
                console.log(data);
                setCollection(data.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [collectionId]);
    return (
        <SafeAreaView className="flex-1 bg-neutral-50 ">
            <ContainerComponent>
                <View className="flex-row justify-between items-center py-[15]">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackRightToLeft />
                    </TouchableOpacity>
                    <View className="flex-col items-center">
                        <Text className="text-neutral-900 text-base font-semibold font-['Montserrat']">
                            {collectionName}
                        </Text>
                        <Text className="text-neutral-400 text-xs font-normal font-['Montserrat']">
                            {collection?.collectionItems?.length} posts saved
                        </Text>
                    </View>
                    <View></View>
                </View>

                <FlashList
                    data={collection.collectionItems}
                    renderItem={({ item }) => (
                        <Image
                            source={item.post.images[0]}
                            className="w-28 h-[110px] rounded-[10px]"
                        />
                    )}
                    numColumns={3}
                    estimatedItemSize={200}
                />
            </ContainerComponent>
        </SafeAreaView>
    );
};

export default DetailCollection;
