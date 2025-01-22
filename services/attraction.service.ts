// authService.js

import axiosClient from "./axiosClient";
export type Attraction = {
    id: number;
    description: string;
    images: string[];
    longitude: string;
    latitude: string;
    isFavorite: boolean;
    rate: number;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    attraction: {
        id: number;
        name: string;
        description: string;
        rate: string;
        placeName: string;
        address: string;
        ward: string;
        district: string;
        city: string;
        country: string;
        longitude: string;
        latitude: string;
        createdAt: string;
        updatedAt: string;
    };
};
const attractionService = {
    getAllAttractions: async (
        offset: number,
        limit: number
    ): Promise<Attraction[]> =>
        axiosClient.get("/attractions", {
            params: { offset, limit },
        }),

    getPostsOfAttraction: async (
        offset: string,
        limit: string,
        attractionId: string
    ): Promise<Attraction[]> => {
        return axiosClient.get("/posts", {
            params: { offset, limit, attractionId },
        });
    },

    addAttraction: async (data: {
        description: string;
        images: string[];
        longitude: number;
        latitude: number;
        rate: number;
        advertisingPackageId?: number;
        address: number;
    }) => {
        return axiosClient.post("/posts", data);
    },
};

export default attractionService;
