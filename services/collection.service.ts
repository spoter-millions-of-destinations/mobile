// authService.js

import { CteCapabilities } from "typeorm/driver/types/CteCapabilities";
import axiosClient from "./axiosClient";
import { Post } from "./post.service";
import { User } from "./user.service";
export type Collection = {
    id: number;
    description: string;
    image: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    collectionItems: Post[];
    isAdded: null;
};
const collectionService = {
    createCollection: (
        data: Pick<Collection, "name" | "image" | "description">
    ): Promise<Collection> => {
        return axiosClient.post("/collections", data);
    },
    getCollectionsOfUser: (
        postId: string,
        limit: string = "0",
        offset: string = "10"
    ): Promise<Collection[]> =>
        axiosClient.get(`/collections`, {
            params: { postId, limit, offset },
        }),
    getCollectionItems: (id: number): Promise<Collection> => {
        return axiosClient.get(`/collections/${id}`);
    },
    getPublicCollections: (
        offset: string = "0",
        limit: string = "10"
    ): Promise<Collection[]> => {
        return axiosClient.get(`/collections/public`, {
            params: { offset, limit },
        });
    },
    addItemToCollection: (data : {
        collectionIds: number[];
        postId: number;
    }) => {
        return axiosClient.post(`/collections/items`, data);
    },
    removeItemFromCollection: (data : {
        collectionId: number;
        postId: number;
    }) => {
        return axiosClient.post(`/collections/items/remove`, data);
    },
    addItemToDefaultCollection: (postId: number) =>
        axiosClient.post(`/collections/items/add-to-default-collection`, {
            postId,
        }),
};

export default collectionService;
