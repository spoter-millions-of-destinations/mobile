import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { Bookmark2 } from "iconsax-react-native";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import color from "../../../contants/color";
import collectionService from "../../../../services/collection.service";
import {
    Add,
    Checked,
    Save,
    SaveFullFill,
} from "../../../../assets/img/Button";
import Loading from "../../../components/Loading";

const SaveScreen = () => {
    const [collections, setCollection] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const { postImage, postId } = useRoute().params;
    const navigation = useNavigation();

    const featchData = async () => {
        try {
            const data = postId
                ? await collectionService.getCollectionsOfUser(postId, 10, 0)
                : await collectionService.getCollectionsOfUser(0, 10, 0);

            setCollection(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                if (postId)
                    await collectionService.addItemToDefaultCollection(postId);
                await featchData();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [postId]);
    return (
        <SafeAreaView className="flex-1 bg-neutral-50 ">
            <ScrollView>
                {postImage && (
                    <View className="bg-neutral-200 rounded-tl-[25px] rounded-tr-[25px] px-6">
                        <SavedComponent image={postImage} />
                    </View>
                )}

                <View className="bg-neutral-50 px-6 flex-1">
                    <View className="flex-row justify-between items-center mb-6 mt-[25]">
                        <Text className="text-neutral-700 text-xl font-semibold font-['Montserrat']">
                            Collections
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("create-collection")
                            }
                        >
                            <Text className="text-sky-900 text-sm font-normal font-['Montserrat']">
                                New collection
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {isLoading ? (
                        <Loading />
                    ) : (
                        collections.map((item) => (
                            <UnsavedComponent
                                key={item.id}
                                data={item}
                                fetchData={featchData}
                                postId={postId}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const SavedComponent = ({ image }) => {
    return (
        <View className="flex-row items-center justify-between my-5">
            <View className="flex-row items-center">
                <View className="shadow">
                    <Image
                        source={image}
                        className="w-20 h-20 rounded-[15px] mr-[25]"
                    />
                </View>

                <View>
                    <Text className=" text-neutral-700 text-2xl font-semibold font-['Montserrat']">
                        Saved to
                    </Text>
                    <Text className="text-neutral-500 text-sm font-normal font-['Montserrat']">
                        Your private collection
                    </Text>
                </View>
            </View>
            <SaveFullFill />
        </View>
    );
};
const UnsavedComponent = ({ data, postId, fetchData }) => {
    const { name, description, image, isAdded, id } = data;
    const [checked, setChecked] = React.useState(isAdded);
    const navigation = useNavigation();
    const handleAdd = async () => {
        try {
            const data = {
                postId,
                collectionIds: [id],
            };
            await collectionService.addItemToCollection(data);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = async () => {
        try {
            const res = await collectionService.removeItemFromCollection(
                id,
                postId
            );

            fetchData();
        } catch (err) {
            console.log(err);
        } finally {
        }
    };
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("detail-collection", {
                    collectionId: id,
                    collectionName: name,
                })
            }
            className="flex-row items-center justify-between mb-[20]"
        >
            <View className="flex-row items-center">
                <View className="shadow">
                    <Image
                        source={image}
                        className="w-20 h-20 rounded-[15px]  mr-[25]"
                    />
                </View>

                <View className="w-2/3">
                    <Text className="text-neutral-700 text-sm font-semibold font-['Montserrat'] mb-[5]">
                        {name}
                    </Text>
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat'] ">
                        {description}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    setChecked(!checked);
                    checked ? handleRemove() : handleAdd();
                }}
            >
                {checked ? <Checked /> : <Add />}
            </TouchableOpacity>
        </TouchableOpacity>
    );
};
export default SaveScreen;
