import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React from "react";
import SearchTextBox from "../../../components/SearchTextBox";
import ContainerComponent from "../../../components/ContainerComponent";
import {
    BackRightToLeft,
    Building,
    Clock,
    Coffee,
    Hotel,
    Info,
    Mark,
    Microphone,
} from "../../../../assets/img/Button";
import { Home } from "iconsax-react-native";
import _maps from "../../../../data/map";
import { useNavigation } from "@react-navigation/native";
import mapService from "../../../../services/map.service";

const SearchDestinationScreen = () => {
    const navigation = useNavigation();
    const [inputSearch, setInputSearch] = React.useState("");
    const handleSearch = async () => {
        try {
            const data = await mapService.findLocationByName(inputSearch);
            const coordinates = data[0].geometry.coordinates;
            navigation.navigate("map", { post: coordinates });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-neutral-50 ">
            <View className="px-6">
                <View className="px-5 py-4 bg-neutral-50 rounded-[35px] border border-neutral-300 justify-between items-center flex-row mb-[23]">
                    <View className="flex-row justify-center items-center">
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <BackRightToLeft className="mr-6" />
                        </TouchableOpacity>

                        <TextInput
                            value={inputSearch}
                            onChangeText={setInputSearch}
                            multiline
                            placeholder="Search here..."
                            returnKeyType="search"
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSearch}>
                        <View className="flex-row justify-center items-center">
                            <Microphone />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="mb-[22] flex-row items-center">
                    <ScrollView horizontal>
                        {_itemSave.map((item, index) => (
                            <ItemSave key={index} data={item} />
                        ))}
                    </ScrollView>
                    <View className="p-4">
                        <Mark />
                    </View>
                </View>

                <View className="flex-row justify-between items-center mb-[29]">
                    <Text className="text-neutral-800 text-sm font-normal font-['Montserrat']">
                        Recently
                    </Text>
                    <Info />
                </View>

                <FlatList
                    data={_searchHistory}
                    renderItem={({ item }) => <RecenlyResult data={item} />}
                />
            </View>
        </SafeAreaView>
    );
};
const _itemSave = [
    {
        icon: <Hotel />,
        title: "Hotel",
        number: 5,
    },
    {
        icon: <Coffee />,
        title: "Hotel",
        number: 23,
    },
    {
        icon: <Building />,
        title: "Hotel",
        number: 15,
    },
];
const _searchHistory = [
    {
        title: "Bach Dang Riverside",
        position: "Hai Chau District, Da Nang City, Vietnam",
    },
    {
        title: "Han River Swing Bridge",
        position: "Hai Chau District, Da Nang City, Vietnam",
    },
    {
        title: "Dragon Bridge",
        position: "Hai Chau District, Da Nang City, Vietnam",
    },
    {
        title: "Bach Dang Riverside",
        position: "Hai Chau District, Da Nang City, Vietnam",
    },
    {
        title: "Hilton Da Nang Hotel",
        position: "50 Bach Dang St., Hai Chau District, Da Nang City, Vietnam",
    },
];
const ItemSave = ({ data }) => {
    const { icon, title, number } = data;
    return (
        <View className="flex-row items-center mr-[25]">
            <View className="w-10 h-10 bg-sky-100 rounded-full mr-[10] items-center justify-center">
                {icon}
            </View>
            <View>
                <Text class="text-neutral-800 text-sm font-medium font-['Montserrat']">
                    {title}
                </Text>
                <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">
                    {number} place
                </Text>
            </View>
        </View>
    );
};
const RecenlyResult = ({ data }) => {
    const { title, position } = data;
    return (
        <View className="mb-[15]">
            <View className="flex-row items-center mb-[15]">
                <Clock />
                <View className="ml-5">
                    <Text className="text-neutral-800 text-sm font-normal font-['Montserrat'] tracking-tight">
                        {title}
                    </Text>
                    <Text className="text-neutral-500 text-xs font-normal font-['Montserrat'] ">
                        {position}
                    </Text>
                </View>
            </View>
            <View className="w-full h-[0px] border border-neutral-300" />
        </View>
    );
};
export default SearchDestinationScreen;
