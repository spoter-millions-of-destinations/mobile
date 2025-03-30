import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";
import Collapsible from "react-native-collapsible";
import RadioGroup from "react-native-radio-buttons-group";
import { ArrowDown, ArrowRightToLeft } from "../../assets/img/Button";
import _countries from "../../data/contries";
import Rating from "./Rating";

const AccordionItem = ({ title, content, icon, description, border }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <View
            className={`my-4 ${
                border ? "rounded-[10px] border border-neutral-200 p-5" : ""
            }`}
        >
            <TouchableOpacity
                className="flex-row items-center justify-between"
                onPress={() => setIsCollapsed(!isCollapsed)}
            >
                <View className="flex-row items-center">
                    {icon && <View className="mr-3">{icon}</View>}

                    <View className="flex-col ">
                        <Text className=" text-neutral-600 text-sm font-medium font-['Montserrat']">
                            {title}
                        </Text>
                        {description && (
                            <Text className=" text-neutral-400 text-[10px] font-normal font-['Montserrat']">
                                {description}
                            </Text>
                        )}
                    </View>
                </View>
                {isCollapsed ? <ArrowDown /> : <ArrowRightToLeft />}
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View className="py-3">{content}</View>
            </Collapsible>
        </View>
    );
};
const DistanceCollapsible = () => {
    const [valueDistance, setValueDistance] = useState(1);
    return (
        <>
            <Text className="text-center text-neutral-700 text-sm font-medium font-['Montserrat']">
                {valueDistance} km
            </Text>
            <Slider
                value={valueDistance}
                onValueChange={(e) => setValueDistance(Math.floor(e))}
                style={{ width: "100%", height: 100 }}
                minimumValue={0}
                lowerLimit={1}
                maximumValue={50}
                minimumTrackTintColor="#4371E8"
                maximumTrackTintColor="#E2EFFC"
            />
        </>
    );
};
const CountryCollapsible = () => {
    const [country, setCountry] = useState("1");
    const [query, setQuery] = useState("");
    return (
        <View className="ml-[30]">
            <Text className="text-neutral-600 text-[14px] font-normal font-['Montserrat'] mb-[15]">
                Find the country
            </Text>
            <View>
                {_countries.map((country, index) => (
                    <View className="flex-row gap-x-2 items-center mb-[13]">
                        <Image
                            className="w-6 h-3.5 rounded-sm"
                            source={country.image}
                        />
                        <Text className="text-neutral-600 text-xs font-normal font-['Montserrat'] ">
                            {country.lable}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};
const PersionReview = () => {
    const radioButtons = React.useMemo(
        () => [
            {
                id: "1", // acts as primary key, should be unique and non-empty string
                label: (
                    <View className="ml-5">
                        <Rating isDisabled={true} defaultRating={1} />
                    </View>
                ),
                value: "1",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "2", // acts as primary key, should be unique and non-empty string
                label: (
                    <View className="ml-5">
                        <Rating isDisabled={true} defaultRating={2} />
                    </View>
                ),
                value: "2",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "3", // acts as primary key, should be unique and non-empty string
                label: (
                    <View className="ml-5">
                        <Rating isDisabled={true} defaultRating={3} />
                    </View>
                ),
                value: "3",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "4", // acts as primary key, should be unique and non-empty string
                label: (
                    <View className="ml-5">
                        <Rating isDisabled={true} defaultRating={4} />
                    </View>
                ),
                value: "4",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "5", // acts as primary key, should be unique and non-empty string
                label: (
                    <View className="ml-5">
                        <Rating isDisabled={true} defaultRating={5} />
                    </View>
                ),
                value: "5",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
        ],
        []
    );

    const [selectedId, setSelectedId] = useState();

    return (
        <View>
            <RadioGroup
                borderSize={1}
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
            />
        </View>
    );
};
export {
    AccordionItem,
    CountryCollapsible,
    DistanceCollapsible,
    PersionReview,
};
