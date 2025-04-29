// authService.js

import axiosClient from './axiosClient'
import fileService from './file.service'
import { Post } from './post.service'
import { User } from './user.service'
import { create } from 'zustand'
export type Collection = {
    id: number
    description: string
    image: string
    name: string
    createdAt: Date
    updatedAt: Date
    user: User
    collectionItems: [
        {
            id: number
            createdAt: Date
            updatedAt: Date
            post: Post
        },
    ]
}
const collectionService = {
    createCollection: async (data: Pick<Collection, 'name' | 'image' | 'description'>): Promise<Collection> => {
        return axiosClient.post('/collections', data)
    },
    getCollectionsOfUser: (userId: number, limit: number = 10, offset: number = 0): Promise<Collection[]> =>
        axiosClient.get(`/collections/collections-of-user/${userId}`, {
            params: { limit, offset },
        }),
    getCollectionItems: (id: number): Promise<Collection> => {
        return axiosClient.get(`/collections/${id}`)
    },
    getPublicCollections: (offset: string = '0', limit: string = '10'): Promise<Collection[]> => {
        return axiosClient.get(`/collections/public`, {
            params: { offset, limit },
        })
    },
    addItemToCollection: (data: { collectionIds: number[]; postId: number }) => {
        return axiosClient.post(`/collections/items`, data)
    },
    removeItemFromCollection: (data: { collectionId: number; postId: number }) => {
        return axiosClient.post(`/collections/items/remove`, data)
    },
    addItemToDefaultCollection: (postId: number) =>
        axiosClient.post(`/collections/items/add-to-default-collection`, {
            postId,
        }),
}

export default collectionService
