import postService from '@/services/post.service'
import { useInfiniteQuery } from '@tanstack/react-query'
const PAGE_SIZE = 10
export const usePostQuery = (userId: number) => {
    return useInfiniteQuery({
        queryKey: ['posts', userId],
        staleTime: 1000 * 60 * 5,
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const posts = await postService.getPostsOfUser(userId, pageParam, PAGE_SIZE)
            return posts
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) {
                return undefined
            }
            return allPages.length * PAGE_SIZE
        },
    })
}
