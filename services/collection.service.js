// authService.js
import { BoxAdd } from "iconsax-react-native";
import axiosClient from "../configs/axiosClient";

const collectionService = {
    createCollection: (data) => {
        return axiosClient.post("/collections", data);
    },
    getCollectionsOfUser: (postId, limit, offset) =>
        axiosClient.get(`/collections`, {
            params: { postId, limit, offset },
        }),
    getCollectionItems: (id) => {
        return axiosClient.get(`/collections/${id}`);
    },
    getPublicCollections: (offset, limit) => {
        return axiosClient.get(`/collections/public`, {
            offset,
            limit,
        });
    },
    addItemToCollection: (data) => {
        return axiosClient.post(`/collections/items`, data);
    },
    removeItemFromCollection: (collectionId, postId) => {
        return axiosClient.post(`/collections/items/remove`, {
            collectionId,
            postId,
        });
    },
    addItemToDefaultCollection: (postId) =>
        axiosClient.post(`/collections/items/add-to-default-collection`, {
            postId,
        }),
};

export default collectionService;
