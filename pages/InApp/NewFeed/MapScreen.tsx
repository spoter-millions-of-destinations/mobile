import { MAPBOX_API_PUBLIC_KEY } from "@env";
import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import Mapbox, {
    Images,
    LocationPuck,
    ShapeSource,
    SymbolLayer,
    Image as ImageMB,
    UserTrackingMode,
    PointAnnotation,
    Annotation,
} from "@rnmapbox/maps";
import * as Location from "expo-location";
import React, { useEffect, useState, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import userService from "../../../../services/user.service";

import {
    BackRightToLeft,
    LineDart,
    Microphone,
    Navigation,
    Pin,
    Pin2,
    Pin3,
    Pin4,
    Pin5,
    PinChallenge,
    PinMap,
    Save,
} from "../../../../assets/img/Button";
import BottomSheetMap from "../../../components/BottomSheetMap";

import { ImageBackground } from "react-native";
import feedService from "../../../../services/feed.service";
import FloatingButtonComponent from "../../../components/FloatingButtonComponent";
import SelectMapModal from "../../../components/SelectMapModal";
import { UserContext } from "../../../../context/user";
import { featureCollection, point } from "@turf/helpers";
import _posts from "../../../../data/posts";
import PinImage from "../../../../assets/img/token.jpg";

import { Image } from "expo-image";
import attractions from "../../../../data/attraction";
import attractionService from "../../../../services/attraction.service";

Mapbox.setAccessToken(MAPBOX_API_PUBLIC_KEY || "");

const MapScreen = () => {
    const post = useRoute()?.params?.post;

    const navigation = useNavigation();
    const [userLocation, setUserLocation] = useState(null);
    const { user } = React.useContext(UserContext);
    const [selectedLoaction, setSelectedLoaction] = useState(null);
    const [urlMap, setUrlMap] = useState(
        "mapbox://styles/phuocnguyen12/clz04sn5800gn01pheoolchfd"
    );
    const [posts, setPost] = useState(null);
    const [attractions, setAttractions] = useState([]);
    const fecthData = async () => {
        try {
            const data = await feedService.getAllFeed(100, 0);

            setPost(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAttractions = async () => {
        try {
            const data = await attractionService.getAllAttractions(0, 100);

            setAttractions(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const setCurrentLocationOfUser = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation([location.coords.longitude, location.coords.latitude]);
    };

    useFocusEffect(
        useCallback(() => {
            const parentNavigation = navigation.getParent();
            parentNavigation?.setOptions({
                tabBarStyle: { display: "none" },
            });

            return () => {
                parentNavigation?.setOptions({
                    tabBarStyle: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    },
                });
            };
        }, [navigation])
    );

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }
        })();
    }, []);

    useEffect(() => {
        if (post) {
            setUserLocation([+post[0], +post[1]]);
        } else {
            setCurrentLocationOfUser();
        }
    }, []);
    useEffect(() => {
        getAttractions();
        fecthData();
    }, []);

    return (
        <View className="flex-1">
            <Mapbox.MapView
                className="flex-1"
                zoomEnabled={true}
                rotateEnabled={true}
                styleURL={urlMap}
            >
                <SafeAreaView className="z-20">
                    <View className=" px-6 flex-col justify-between items-end">
                        <View>
                            <View className="flex-row px-[20px] py-2 bg-neutral-50 rounded-[35px] shadow items-center w-full justify-between mb-[15]">
                                <View className="flex-row justify-center items-center">
                                    <PinMap className="mr-5" />
                                    <TouchableOpacity
                                        className=""
                                        onPress={() =>
                                            navigation.navigate(
                                                "search-destination"
                                            )
                                        }
                                    >
                                        <Text className="text-neutral-500 text-sm font-normal font-['Montserrat']">
                                            Search here...
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row justify-center items-center">
                                    <Microphone className="mr-5" />
                                    <Image
                                        source={user.avatar}
                                        className="w-[40] h-[40] rounded-full"
                                    />
                                </View>
                            </View>
                            <View className="flex-row justify-between">
                                <FloatingButtonComponent
                                    icon={<BackRightToLeft />}
                                    onPress={() => navigation.navigate("posts")}
                                />
                                {selectedLoaction && (
                                    <View className="w-[181px] h-[54px] px-5 py-[11px] bg-neutral-50 rounded-[15px] shadow justify-between items-center flex-row">
                                        <TouchableOpacity>
                                            <Text className="text-center text-[#4371e8] text-base font-semibold font-['Montserrat']">
                                                Post
                                            </Text>
                                        </TouchableOpacity>
                                        <LineDart />
                                        <TouchableOpacity>
                                            <Text className="text-center text-neutral-500 text-sm font-normal font-['Montserrat']">
                                                Infomation
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <SelectMapModal
                                    urlMap={urlMap}
                                    setUrlMap={setUrlMap}
                                />
                            </View>
                        </View>
                        <View className="relative z-20 top-[600]">
                            <FloatingButtonComponent
                                style={{
                                    marginBottom: 20,
                                }}
                                icon={<Save />}
                                onPress={() => navigation.navigate("save", {})}
                            />

                            <FloatingButtonComponent
                                onPress={() => setCurrentLocationOfUser()}
                                icon={<Navigation />}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                {posts &&
                    posts.map((post, index) => (
                        <PointAnnotation
                            key={`point-${index}`}
                            id={`point-${index}`}
                            coordinate={[+post.longitude, +post.latitude]}
                            onSelected={() => {
                                setSelectedLoaction(post);
                                navigation.navigate("persion-pin", {
                                    post,
                                    isPersional: true,
                                });
                            }}
                        >
                            <ImageBackground
                                className="w-[30] h-[30] rounded-full overflow-hidden border-[#fafafa]"
                                style={{
                                    borderWidth: 2,
                                }}
                                source={{ uri: post.images[0] }}
                            ></ImageBackground>
                        </PointAnnotation>
                    ))}

                {attractions &&
                    attractions.map((attraction, index) => (
                        <PointAnnotation
                            draggable={false}
                            key={`point-${index}`}
                            id={`point-${index}`}
                            coordinate={[
                                +attraction.longitude,
                                +attraction.latitude,
                            ]}
                            onSelected={() =>
                                navigation.navigate("attraction-pin", {
                                    data: attraction,
                                    isPersional: false,
                                })
                            }
                        >
                            <View className="relative">
                                <Pin5 width={40} height={40} />
                                <Text className="z-10 absolute top-[9] left-[8] text-white text-xs font-bold font-['Montserrat']">
                                    {Math.round(Math.random() * 1000)}
                                </Text>
                            </View>
                        </PointAnnotation>
                    ))}

                {userLocation && (
                    <>
                        <Mapbox.Camera
                            zoomLevel={17}
                            // centerCoordinate={[108.2234, 16.0605]}
                            centerCoordinate={userLocation}
                            animationMode="flyTo"
                            animationDuration={6000}
                            pitch={60}
                        />
                        <LocationPuck
                            puckBearingEnabled={true}
                            puckBrearing="heading"
                            visible={true}
                            pulsing={{
                                isEnabled: true,
                                color: "teal",
                                radius: 50.0,
                            }}
                        />
                    </>
                )}
            </Mapbox.MapView>
            {/* {selectedLoaction && <BottomSheetMap info={selectedLoaction} />} */}
        </View>
    );
};

export default MapScreen;
