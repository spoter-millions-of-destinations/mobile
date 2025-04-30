// authService.js

import axiosClient from './axiosClient'
import { Post } from './post.service'
export type Attraction = {
    name: string
    id: number
    description: string
    images: string[]
    longitude: string
    latitude: string
    isFavorite: boolean
    rate: number
    createdAt: string
    updatedAt: string
    user: {
        id: string
        name: string
        avatar: string
    }
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
        longitude: string
        latitude: string
        createdAt: string
        updatedAt: string
    }
}
const attractionService = {
    getAllAttractions: async (offset: number, limit: number): Promise<Attraction[]> =>
        axiosClient.get('/attractions', {
            params: { offset, limit },
        }),

    getPostsOfAttraction: async (offset: number, limit: number, attractionId: number): Promise<Post[]> => {
        return axiosClient.get('/posts', {
            params: { offset, limit, attractionId },
        })
    },

    addAttraction: async (data: {
        description: string
        images: string[]
        longitude: number
        latitude: number
        rate: number
        advertisingPackageId?: number
        address: number
    }) => {
        return axiosClient.post('/posts', data)
    },
}

export default attractionService
