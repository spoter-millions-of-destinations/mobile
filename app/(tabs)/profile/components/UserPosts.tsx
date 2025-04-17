import { UserContext } from "@/context/AuthContext"
import { Image } from "expo-image"
import { useContext } from "react"
import { Text, View } from "react-native"

function UserPosts() {
    const Post = ({ data }) => {
        const { postTime, caption, postImage } = data
        const { user } = useContext(UserContext)
        return (
            <View className=" flex-row mb-[10]">
                <View className="mr-[15]">
                    <Image source={user.avatar} className="w-[46.96px] h-[46.96px] rounded-full" />
                </View>
                <View className="flex-1">
                    <View className="flex-row items-center ">
                        <Text className="text-neutral-900 text-sm font-medium font-['Montserrat'] mr-5">
                            {user.name}
                        </Text>
                        <Text className="text-neutral-900 text-[11px] font-light font-['Montserrat']">{postTime}</Text>
                    </View>
                    <View className="mb-[5]">
                        <Text className="text-black text-[10px] font-light font-['Montserrat']">{caption}</Text>
                    </View>
                    <View>
                        <Image source={postImage} className="w-[200px] h-[200px] rounded-[15px]" />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View className="pt-5 bg-neutral-50">
            {posts.map((post, index) => (
                <Post data={post} key={index} />
            ))}
        </View>
    )
}

export default UserPosts