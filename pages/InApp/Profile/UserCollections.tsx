import React from "react";
import collectionService from "../../../../services/collection.service";
import { View } from "react-native";
import Loading from "../../../components/Loading";
import Collection from "../../../components/Collection";
import { useNavigation } from "@react-navigation/native";

export default UserCollections = () => {
    const [collections, setCollections] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation();
    React.useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data = await collectionService.getCollectionsOfUser(
                    0,
                    10,
                    0
                );
                setCollections(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <View className="flex-1 pt-[25]  bg-neutral-50">
            {isLoading ? (
                <Loading />
            ) : (
                collections.map((collection, index) => (
                    <Collection
                        key={index}
                        data={collection}
                        onPress={() =>
                            navigation.navigate("detail-collection", {
                                collectionId: collection.id,
                                collectionName: collection.name,
                            })
                        }
                    />
                ))
            )}
        </View>
    );
};
