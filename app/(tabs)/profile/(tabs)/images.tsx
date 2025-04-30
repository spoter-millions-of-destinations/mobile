import { Loading } from '@/components'
import { usePostQuery } from '@/hooks/usePostsOfUserQuery'
import { Image } from 'expo-image'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
const SPACING = 6
const PADDING_HORIZONTAL = 24

const UserImages = ({ userId }: { userId: number }) => {
    const { width } = useWindowDimensions()
    const imageSize = (width - PADDING_HORIZONTAL * 2 - SPACING * 2) / 3

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostQuery(userId)

    if (isLoading) {
        return <Loading />
    }
    const posts = data?.pages.flat() ?? []

    return (
        <Tabs.FlatList
            className="pt-6 "
            data={posts}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity>
                    <Image
                        source={item.images[0]}
                        style={{
                            width: imageSize,
                            height: imageSize,
                            margin: SPACING / 2,
                            borderRadius: 8,
                        }}
                    />
                </TouchableOpacity>
            )}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
        />
    )
}

export default UserImages
