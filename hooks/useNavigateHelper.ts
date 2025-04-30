import { Attraction } from '@/services/attraction.service'
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

    const goToMap = (data: [number, number], from: string) =>
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
    const showPostPin = (post: Post) =>
        router.push({
            pathname: '/(share)/map/post_pin',
            params: {
                data: JSON.stringify(post),
            },
        })

    const showAttractionPin = (attraction: Attraction) =>
        router.push({
            pathname: '/(share)/map/attraction_pin',
            params: {
                data: JSON.stringify(attraction),
                dataType: 'attraction',
            },
        })

    const goToSearchDestination = () => router.push('/(share)/map/search_map')
    return {
        showPostPin,
        showAttractionPin,
        goToCollection,
        goToPostDetail,
        goToMap,
        goToCreateCollection,
        goToSearchDestination,
    }
}
