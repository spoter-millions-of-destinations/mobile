import { TouchableOpacity, View } from "react-native";
import posts from "../../../../data/posts";
import { Image } from "expo-image";

export default UserImages = () => {
    return (
        <View className="pt-[15] flex-1 flex-row flex-wrap justify-between bg-neutral-50">
            {posts.map((post, index) => (
                <TouchableOpacity key={index}>
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 10,
                            marginBottom: 15,
                        }}
                        source={post.postImage}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};
