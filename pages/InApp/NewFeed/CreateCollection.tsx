import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    BackLeftToRight,
    Delete,
    Email,
    Message,
    Pen,
} from "../../../../assets/img/Button";
import imageButton from "../../../../assets/img/button-img/index";
import { _friends } from "../../../../data/friends";
import collectionService from "../../../../services/collection.service";
const CreateCollection = () => {
    const [data, setData] = React.useState({
        name: "",
        description: "",
        image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg",
    });
    const navigation = useNavigation();
    const handleCreate = async () => {
       
        const res = await collectionService.createCollection(data);
        alert("Collection created")
    };
    return (
        <View className="flex-1 px-6 bg-neutral-50 py-5">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Delete />
                    </TouchableOpacity>

                    <Text className="ml-[15] text-neutral-900 text-base font-medium font-['Montserrat']">
                        Create a collection
                    </Text>
                </View>
                <TouchableOpacity onPress={handleCreate}>
                    <Text className="text-sky-800 text-2xl font-semibold font-['Montserrat']">
                        Create
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="flex-1">
                <View className=" flex-1">
                    <View className="items-center justify-center mt-[22] mb-[40]">
                        <Image
                            source={imageButton.imageInput}
                            className="w-[115px] h-[115px] mb-[3]"
                        />
                        <Text className="text-black text-xs font-semibold font-['Montserrat']">
                            Select picture
                        </Text>
                    </View>
                    <Input
                        data={data.name}
                        onChangeText={(e) => setData({ ...data, name: e })}
                        icon={<Message />}
                        title={"Name"}
                        placeholder={"Name"}
                        style={{ marginBottom: 25 }}
                    />
                    <Input
                        data={data.description}
                        onChangeText={(e) =>
                            setData({ ...data, description: e })
                        }
                        icon={<Pen />}
                        title={"Description"}
                        placeholder={"Description"}
                        style={{ marginBottom: 25 }}
                    />
                    <Text className="text-black text-xs font-medium font-['Montserrat'] mb-1">
                        Invite your friends
                    </Text>
                    <View className="rounded-[10px] px-[14]  border border-neutral-200">
                        <Input
                            icon={<Email />}
                            placeholder={"Email/Name"}
                            style={{ marginBottom: 8 }}
                        />
                        <Text className="text-neutral-400 text-[10px] font-normal font-['Montserrat'] mb-[15]">
                            Only people invited in this list can access
                        </Text>
                        {_friends.map((friend, index) => (
                            <CollectionPeopleListItem
                                key={index}
                                info={friend.info}
                                role={friend.role}
                                icon={friend.icon}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
const Input = ({ icon, title, affix, placeholder, style, onChangeText }) => {
    return (
        <View style={style}>
            <Text className="text-black text-xs font-medium font-['Montserrat'] mb-2">
                {title}
            </Text>
            <View className="flex-row px-5 py-4 rounded-[10px] border border-neutral-200 justify-between items-center">
                <View className="flex-row items-center ">
                    {icon}
                    <TextInput
                        onChangeText={onChangeText}
                        className="ml-[15]"
                        placeholder={placeholder}
                    />
                </View>
                {affix && <BackLeftToRight />}
            </View>
        </View>
    );
};
const CollectionPeopleListItem = ({ info, role, icon }) => {
    return (
        <View className="flex-row items-center justify-between mb-[18]">
            <View className="flex-row items-center">
                <Image
                    source={info.avatar}
                    className="w-[35px] h-[35px] rounded-full mr-[10]"
                />
                <Text className="text-black text-xs font-medium font-['Montserrat']">
                    {info.name} {role === "Full access" && "(you)"}
                </Text>
            </View>

            <View className="flex-row items-center">
                <Text className="text-neutral-500 text-[10px] font-medium font-['Montserrat'] mr-3">
                    {role}
                </Text>
                {icon}
            </View>
        </View>
    );
};
export default CreateCollection;
