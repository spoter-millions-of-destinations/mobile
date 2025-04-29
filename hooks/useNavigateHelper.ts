import { Post } from '@/services/post.service'
import { useRouter } from 'expo-router'

export const useNavigatHelper = () => {
    const router = useRouter()
    const goToPostDetail = (post: Post) =>
        router.push({
            pathname: `/(share)/feed/[id]`,
            params: {
                id: post.id,
                data: JSON.stringify(post),
            },
        })
    const goToCreateCollection = () => router.push('/(modal)/collection/create_collection')
    const goToMap = (data: Post, from: string) =>
        router.push({
            pathname: '/(share)/map',
            params: {
                from: from,
                data: JSON.stringify(data),
            },
        })
    const goToCollection = (post: Post) =>
        router.push({
            pathname: '/(modal)/collection/save',
            params: {
                data: JSON.stringify(post),
            },
        })
    return {
        goToCollection,
        goToPostDetail,
        goToMap,
        goToCreateCollection,
    }
}
