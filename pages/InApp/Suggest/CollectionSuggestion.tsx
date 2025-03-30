import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React from "react";
import collectionService from "../../../../services/collection.service";

import Loading from "../../../components/Loading";
import { useNavigation } from "@react-navigation/native";
import {
    Collection as CollectionIcon,
    Filter,
    KinhLup,
} from "../../../../assets/img/Button";
import { Icon } from "iconsax-react-native";
import Collection from "../../../components/Collection";

const CollectionSuggestion = () => {
    const [collections, setCollections] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const navigation = useNavigation();
    React.useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data = await collectionService.getPublicCollections(
                    0,
                    100
                );

                setCollections(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    console.log(collections);
    return (
        <SafeAreaView className="flex-1">
            <View className="px-6">
                <View className="flex-row items-center justify-between gap-x-3 mb-5 ">
                    <View className="px-5 py-2 bg-neutral-50 rounded-[35px] border border-neutral-300 flex-row justify-between items-center relative flex-1">
                        <View>
                            <KinhLup class="h-1 w-1" />
                        </View>

                        <TextInput
                            className="ml-5 flex-1"
                            placeholder="Seach here"
                        />
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Filter />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("suggests")}
                            className="w-[50px] h-[50px]  rounded-[25px] border border-neutral-300 flex-col justify-center items-center "
                        >
                            <CollectionIcon />
                        </TouchableOpacity>
                    </View>
                </View>
                {isLoading && collections.length == 0 ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={collections}
                        renderItem={({ item }) => (
                            <Collection
                                data={item}
                                onPress={() =>
                                    navigation.navigate(
                                        "detail-suggest-public-collection",
                                        {
                                            collectionId: item.id,
                                            collectionName: item.name,
                                            collectionDescription:
                                                item.description,
                                        }
                                    )
                                }
                            />
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default CollectionSuggestion;
