import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { Post } from '@/services/post.service'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { Dimensions, TouchableOpacity, View } from 'react-native'
type Props = {
    i: number
    item: Post
    posts: Post[]
}
export const ImageCard = ({ i, item, posts }: Props) => {
    const { goToPostDetail } = useNavigatHelper()
    const _width = Dimensions.get('screen').width
    const lastNumber = Number(i.toString()[i.toString().length - 1])

    if (lastNumber == 3 || lastNumber == 6) return null
    if (lastNumber == 1 || lastNumber == 4)
        return (
            <View className="flex-row">
                <TouchableOpacity
                    className="rounded-[15] w-1/2 overflow-hidden p-1"
                    onPress={() => goToPostDetail(item)}
                >
                    <Image
                        style={{
                            borderRadius: 20,
                            width: '100%',
                            minHeight: 100,
                        }}
                        placeholder={'loading...'}
                        source={item?.images[0]}
                        contentFit="cover"
                        transition={1000}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-[15] w-1/2 overflow-hidden p-1"
                    onPress={() => goToPostDetail(posts[i + 1])}
                >
                    <Image
                        style={{
                            borderRadius: 20,
                            width: '100%',
                            minHeight: 100,
                        }}
                        placeholder={'loading...'}
                        source={posts[i + 2]?.images[0]}
                        contentFit="cover"
                        transition={1000}
                    />
                </TouchableOpacity>
            </View>
        )

    return (
        <TouchableOpacity className="rounded-[30] w-full overflow-hidden p-1" onPress={() => goToPostDetail(item)}>
            <Image
                style={{
                    borderRadius: 20,
                    width: '100%',
                    minHeight: 200,
                }}
                placeholder={'loading...'}
                source={item?.images[0]}
                contentFit="cover"
                transition={1000}
            />
        </TouchableOpacity>
    )
}
