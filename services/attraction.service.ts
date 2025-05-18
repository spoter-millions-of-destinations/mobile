// authService.js

import axiosClient from './axiosClient'
import { AdvertisingPackage, Post } from './post.service'

export type Attraction = {
    id: number
    name: string
    description: null
    rate: null
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
    advertisingPackage?: AdvertisingPackage 
}

export interface AttractionInfo {
    description: string
    address: string
    advertisingPackageId: number
    images: string[]
    rate: number
    longitude: number
    latitude: number
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

    addAttraction: async (data: AttractionInfo) => {
        return axiosClient.post('/posts', data)
    },
}

export default attractionService
