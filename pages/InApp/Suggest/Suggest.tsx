import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    TextInput,
    Modal,
    Text,
} from "react-native";
import { Image } from "expo-image";

import InputComponent from "../../../components/InputComponent";
import MasonryList from "@react-native-seoul/masonry-list";

import Filter from "../../../../assets/img/Button/filter.svg";
import KinhLup from "../../../../assets/img/Button/kinhlup.svg";

import ContainerComponent from "../../../components/ContainerComponent";
import { useNavigation } from "@react-navigation/native";

import color from "../../../contants/color";

import _countries from "../../../../data/contries";
import {
    Collection,
    Distance,
    Line,
    PersonReview,
    Pin,
    Pin2,
    PinFilter,
    Star,
} from "../../../../assets/img/Button";
import {
    AccordionItem,
    CountryCollapsible,
    DistanceCollapsible,
    PersionReview,
} from "../../../components/AccordionItem";
import feedService from "../../../../services/feed.service";
import Loading from "../../../components/Loading";
import { isLoading } from "../../../../../node_modules/expo-font/build/Font";
import FloatingButtonComponent from "../../../components/FloatingButtonComponent";
const Suggest = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await feedService.getAllFeed(10, 0);
            setPosts(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView className="px-6 bg-white flex-1">
            <ContainerComponent>
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
                            onPress={() =>
                                navigation.navigate("suggest-collections")
                            }
                            className="w-[50px] h-[50px] px-3.5 py-[15px] rounded-[25px] border border-neutral-300 flex-col justify-between items-center inline-flex"
                        >
                            <Collection />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-1">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <MasonryList
                            data={posts}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => (
                                <ImageCard i={i} item={item} posts={posts} />
                            )}
                        />
                    )}
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className="flex-1 absolute right-[24] top-[110]">
                        <View className="w-[282px] max-h-[530] bg-neutral-50 rounded-[25px] shadow border border-neutral-200 backdrop-blur-sm px-[30] py-4">
                            <View className="flex-row items-center justify-between mb-4">
                                <Star />
                                <Text className="text-neutral-500 text-xs font-medium font-['Montserrat']">
                                    Describle what you want to filter
                                </Text>
                            </View>
                            <Line />
                            <ScrollView>
                                <AccordionItem
                                    icon={<Distance />}
                                    title={"Distance/Radius"}
                                    content={<DistanceCollapsible />}
                                />

                                <AccordionItem
                                    icon={
                                        <Pin
                                            height={20}
                                            width={20}
                                            fill="#525252"
                                        />
                                    }
                                    title={"Country"}
                                    content={<CountryCollapsible />}
                                />
                                <AccordionItem
                                    icon={<PersonReview />}
                                    title={"Persion review"}
                                    content={<PersionReview />}
                                />
                            </ScrollView>
                            <View className="flex-row justify-end items-center">
                                <TouchableOpacity
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
                                    className="px-4 py-2 border rounded-[10px] border-neutral-300 mr-2"
                                >
                                    <Text className="text-black text-right">
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: color.primary,
                                    }}
                                    className="px-4 py-2 rounded-[10px]"
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
                                >
                                    <Text className="text-white text-right">
                                        Find
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ContainerComponent>
        </SafeAreaView>
    );
};
const ImageCard = ({ i, item, posts }) => {
    const navigation = useNavigation();
    const _width = Dimensions.get("screen").width;
    const lastNumber = i.toString()[i.toString().length - 1];

    if (lastNumber == 3 || lastNumber == 6) return null;
    if (lastNumber == 1 || lastNumber == 4)
        return (
            <View className="flex-row">
                <TouchableOpacity
                    className="rounded-[15] w-1/2 overflow-hidden p-1"
                    onPress={() =>
                        navigation.navigate("detail-suggest", {
                            post: item,
                        })
                    }
                >
                    <Image
                        style={{
                            borderRadius: 15,
                            width: "100%",
                            minHeight: 100,
                        }}
                        placeholder={"loading..."}
                        source={item.images[0]}
                        contentFit="cover"
                        transition={1000}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-[15] w-1/2 overflow-hidden p-1"
                    onPress={() =>
                        navigation.navigate("suggest", {
                            screen: "detail-suggest",
                            params: {
                                post: item,
                            },
                        })
                    }
                >
                    <Image
                        style={{
                            borderRadius: 15,
                            width: "100%",
                            minHeight: 100,
                        }}
                        placeholder={"loading..."}
                        source={posts[i + 2].images[0]}
                        contentFit="cover"
                        transition={1000}
                    />
                </TouchableOpacity>
            </View>
        );

    return (
        <TouchableOpacity
            className="rounded-[30] w-full overflow-hidden p-1"
            onPress={() =>
                navigation.navigate("suggest", {
                    screen: "detail-suggest",
                    params: {
                        post: item,
                    },
                })
            }
        >
            <Image
                style={{
                    borderRadius: 15,
                    width: "100%",
                    minHeight: 200,
                }}
                placeholder={"loading..."}
                source={item.images[0]}
                contentFit="cover"
                transition={1000}
            />
        </TouchableOpacity>
    );
};
export default Suggest;
