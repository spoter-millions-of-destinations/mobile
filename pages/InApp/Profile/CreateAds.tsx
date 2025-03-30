import {
    View,
    Text,
    SafeAreaView,
    CheckBox,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import { AccordionItem } from "../../../components/AccordionItem";
import {
    Add2,
    BackLeftToRight,
    BackRightToLeft,
    Diamond,
    DropDown,
    Pen2,
    Pin4,
    Ruby,
    Wallet2,
} from "../../../../assets/img/Button";
import RadioGroup from "react-native-radio-buttons-group";
import Slider from "@react-native-community/slider";
import stripeService from "../../../../services/stripe.service";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import attractionService from "../../../../services/attraction.service";

const PaymentItem = ({ idPackage }) => {
    const navigation = useNavigation();
    const handlePayment = async () => {
        try {
            const res = await stripeService.CheckoutSession(idPackage);
            console.log(res);
            navigation.navigate("stripe", { uri: res.data.checkoutUrl });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TouchableOpacity onPress={handlePayment} className="ml-5">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-x-3">
                    <Wallet2 />
                    <View>
                        <Text className="text-neutral-600 text-sm font-semibold font-['Montserrat']">
                            Stripe
                        </Text>
                        <Text className="text-neutral-400 text-xs font-normal font-['Montserrat']">
                            Financial Infrastructure
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const PostItem = ({ info, handleChangeInfo }) => {
    return (
        <View className="mt-[15]">
            <View className="flex-row gap-x-5 mb-[20]">
                <Pen2 />
                <TextInput
                    value={info.description}
                    onTextChange={(e) => handleChangeInfo("description", e)}
                    placeholder="Enter your describe"
                />
            </View>
            <View className="flex-row gap-x-5 mb-[20]">
                <Pin4 />
                <TextInput
                    onTextChange={(e) => handleChangeInfo("address", e)}
                    value={info.address}
                    placeholder="Enter your describe"
                />
            </View>
            <View className="items-center justify-center">
                <View className="w-[305px] h-[239px] px-[102px] py-[92px] bg-neutral-200 rounded-[20px] flex-col justify-center items-center">
                    <View className="items-center justify-center">
                        <Add2 />
                        <Text className="w-full">Add pictures/video</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
const ObjectItem = () => {
    const radioSex = React.useMemo(
        () => [
            {
                id: "1", // acts as primary key, should be unique and non-empty string
                label: "All",
                value: "All",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "2",
                label: "Male",
                value: "Male",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "3",
                label: "Female",
                value: "Femail",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
        ],
        []
    );
    const radioLocation = React.useMemo(
        () => [
            {
                id: "1", // acts as primary key, should be unique and non-empty string
                label: "Everyone",
                value: "Everyone",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "2",
                label: "Domestic",
                value: "Domestic",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "3",
                label: "International",
                value: "International",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
        ],
        []
    );
    const radioAge = React.useMemo(
        () => [
            {
                id: "1", // acts as primary key, should be unique and non-empty string
                label: "16-22",
                value: "16-22",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "2",
                label: "23-30 ",
                value: "23-30 ",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "3",
                label: "30-45",
                value: "30-45",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
            {
                id: "4",
                label: "45+",
                value: "45+",
                borderSize: 1,
                size: 16,
                borderColor: "#A3A3A3",
            },
        ],
        []
    );
    const [selectedSexId, setSelectedSexId] = React.useState(1);
    const [selectedAgeId, setSelectedAgeId] = React.useState(1);
    const [selectedLocationId, setSelectedLocationId] = React.useState(1);

    return (
        <View>
            <View>
                <Text>Sex</Text>
                <RadioGroup
                    containerStyle={{
                        flexDirection: "row",
                        marginVertical: 12,
                    }}
                    radioButtons={radioSex}
                    onPress={setSelectedSexId}
                    selectedId={selectedSexId}
                />
            </View>
            <View>
                <Text>Age</Text>
                <View>
                    <RadioGroup
                        containerStyle={{
                            flexDirection: "row",
                            marginVertical: 12,
                        }}
                        radioButtons={radioAge}
                        onPress={setSelectedAgeId}
                        selectedId={selectedAgeId}
                    />
                </View>
            </View>
            <View>
                <Text>Location</Text>
                <RadioGroup
                    containerStyle={{
                        flexDirection: "row",
                        marginVertical: 12,
                    }}
                    radioButtons={radioLocation}
                    onPress={setSelectedLocationId}
                    selectedId={selectedLocationId}
                />
            </View>
        </View>
    );
};
const PackageForm = ({ idPackage, handleSelectPackage }) => {
    const data = [
        { id: 1, image: require("../../../../assets/img/ruby.jpg") },
        { id: 2, image: require("../../../../assets/img/diamond.jpg") },
        { id: 3, image: require("../../../../assets/img/gold.jpg") },
    ];
    return (
        <View className="flex-col items-center">
            {data.map((item) => (
                <TouchableOpacity
                    onPress={() => handleSelectPackage(item.id)}
                    className={`p-[4] rounded-[15px] ${
                        item.id === idPackage ? "border border-neutral-300" : ""
                    } my-2`}
                >
                    <Image
                        className="w-[305px] h-[213px] rounded-[15px] "
                        source={item.image}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const CreateAds = () => {
    const [idPackage, setIdPackage] = React.useState(3);
    const [info, setInfo] = React.useState({});

    const handleSelectPackage = (id) => {
        setIdPackage(id);
    };
    const handleChangeInfo = (name, value) => {
        setInfo({ ...info, [name]: value });
    };
    const handleCreateAttraction = async () => {
        const data = {
            description: info.description,
            address: info.address,
            advertisingPackageId: idPackage,
            images: [
                "https://dulichviet24h.vn/wp-content/uploads/2024/07/z5599338907677_c54961c6ad9b2a61fe9056685a233109.jpg",
            ],
            rate: 5,
        };
        const res = await attractionService.addAttraction(data);
        console.log(res);
        alert("Sucessfully added!");
    };
    return (
        <SafeAreaView className="flex-1 bg-neutral-50">
            <ScrollView className=" px-6">
                <Text className="text-neutral-800 text-2xl font-semibold font-['Montserrat'] mb-[25]">
                    Advertise articles
                </Text>
                <AccordionItem
                    border={true}
                    title={"1. Object"}
                    description="Who will see your advertisement"
                    content={<ObjectItem />}
                />
                <AccordionItem
                    border={true}
                    title={"2. Posts"}
                    description={"Describe your advertisement"}
                    content={
                        <PostItem
                            info={info}
                            handleChangeInfo={handleChangeInfo}
                        />
                    }
                />
                <AccordionItem
                    border={true}
                    title={"3. Advertising package"}
                    description={"Choose the appropriate advertising package"}
                    content={
                        <PackageForm
                            idPackage={idPackage}
                            handleSelectPackage={handleSelectPackage}
                        />
                    }
                />
                <AccordionItem
                    border={true}
                    title={"4. Payment"}
                    description={"Select a payment method"}
                    content={<PaymentItem idPackage={idPackage} />}
                />
                <View className="flex-row justify-between items-center">
                    <Text className="text-neutral-500 text-xs font-medium font-['Montserrat'] ">
                        Final step
                    </Text>
                    <TouchableOpacity className="px-[15px] py-[5px] bg-neutral-200 rounded-[10px] justify-between items-center">
                        <Text className="text-neutral-500 text-xs font-normal font-['Montserrat']">
                            Spread
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateAds;
