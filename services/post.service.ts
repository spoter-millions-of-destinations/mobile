// authService.js
import axiosClient from './axiosClient'
import { User } from './user.service'
export type Post = {
    id: number
    description: string
    images: string[]
    longitude: string | number
    latitude: string | number
    isFavorite: boolean
    rate: number
    createdAt: string
    updatedAt: string
    user: Pick<User, 'id' | 'name' | 'avatar'>
    likes?: number
    comments?: number
    attraction: {
        id: number
        name: string
        description: string
        rate: string
        placeName: string
        address: string
        ward: string
        district: string
        city: string
        country: string
        longitude: string | number
        latitude: string | number
        createdAt: string
        updatedAt: string
    } | null
}
export type PostsQuery = {
    limit: number
    offset: number
    userId?: number
    attractionId?: string
    search?: string
    longitude?: string | number
    latitude?: string | number
    radius?: number
    rate?: number
}
const postService = {
    createPost: (data: Pick<Post, 'description' | 'images' | 'longitude' | 'latitude' | 'rate'>) => {
        return axiosClient.post('/posts', data)
    },
    getAllFeed: (limit: number, offset: number): Promise<Post[]> =>
        axiosClient.get(`/posts?limit=${limit}&offset=${offset}`),

    getPostsOfUser: (userId: number, offset: number = 0, limit: number = 10): Promise<Post[]> => {
        return axiosClient.get('/posts', {
            params: { userId, offset, limit },
        })
    },

    getAllFeedByQuery: (query: PostsQuery): Promise<Post[]> => axiosClient.get(`/posts`, { params: query }),

    getPostsOfAttraction: async (offset: string, limit: string, attractionId: string): Promise<Post[]> => {
        return axiosClient.get('/posts', {
            params: { offset, limit, attractionId },
        })
    },
}

export default postService
