import { Ads, Follow, LineProfile, Share } from "@/assets/images/Button"
import { UserContext } from "@/context/AuthContext"
import { Image } from "expo-image"
import { useContext } from "react"
import { Text, TouchableOpacity, View } from "react-native"

function UserProfile() {
    const { user } = useContext(UserContext)
    
    return (
        <View>
            <View className="relative">
                <TouchableOpacity
                    onPress={() => navigation.navigate('create-ads')}
                    className="absolute z-20 right-[24] top-[60]"
                >
                    <Ads />
                </TouchableOpacity>
                <Image
                    className="w-full h-[223px] rounded-bl-[25px] rounded-br-[25px]"
                    source={'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/anh-nen-cute.jpg'}
                />
            </View>
            <View className="px-[42] -top-[50] relative">
                <View className="justify-center items-center ">
                    <Image source={user.avatar} className="w-[100] h-[100] rounded-full" />
                </View>
                <View className="mb-2">
                    <Text className="text-center text-neutral-800 text-2xl font-semibold font-['Montserrat']">
                        {user.name}
                    </Text>
                </View>
                <View className="flex-row mb-[15] items-center justify-between">
                    <Number number={870} content={'Following'} />
                    <LineProfile />
                    <Number number={11.1911} content={'Followers'} />
                    <LineProfile />
                    <Number number={250.302} content={'Likes'} />
                </View>
                <View className="mb-3">
                    <Text className="mb-1 text-center text-neutral-800 text-sm font-normal font-['Montserrat']">
                        I’m a positive person. I love to travel and eat. Always available for chat
                    </Text>
                    <Text className="text-center text-neutral-600 text-xs font-normal font-['Montserrat']">
                        Los Angeles, CA
                    </Text>
                </View>
                <View className="flex-row items-center justify-center gap-x-2">
                    <TouchableOpacity
                        style={{
                            backgroundColor: color.primary,
                        }}
                        className="px-[47px] py-[15px] rounded-[100px] justify-center items-center"
                    >
                        <Text className="text-center text-neutral-50 text-base font-semibold font-['Montserrat'] stracking-wide">
                            Messsage
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-[15] py-[15] rounded-full border border-neutral-200 justify-center items-center">
                        <Follow />
                    </TouchableOpacity>
                    <TouchableOpacity className="px-[15] py-[15] rounded-full border border-neutral-200 justify-center items-center">
                        <Share />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default UserProfile