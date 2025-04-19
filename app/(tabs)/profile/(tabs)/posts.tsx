import { Loading } from '@/components'
import { usePostQuery } from '@/hooks/usePostsQuery'
import { Post } from '@/services/post.service'
import { Tabs } from 'react-native-collapsible-tab-view'
import { Post as PostComponent } from '../components/Post'

function UserPosts({ userId }: { userId: number }) {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostQuery(userId)

    if (isLoading) {
        return <Loading />
    }
    const posts = data?.pages.flat() ?? []
    return (
        <Tabs.FlatList
            className="pt-6"
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: { item: Post }) => <PostComponent {...item} />}
            onEndReached={() => {
                if (hasNextPage) fetchNextPage()
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
        />
    )
}

export default UserPosts
