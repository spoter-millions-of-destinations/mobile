// authService.js
import axiosClient from "./axiosClient";
import { User } from "./user.service";
export type Post = {
    id: number;
    description: string;
    images: string[];
    longitude: string;
    latitude: string;
    isFavorite: boolean;
    rate: number;
    createdAt: string;
    updatedAt: string;
    user: Pick<User, "id" | "name" | "avatar">;
    likes: number;
    comments: number;
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
const postService = {
    createPost: (
        data: Pick<
            Post,
            "description" | "images" | "longitude" | "latitude" | "rate"
        >
    ) => {
        return axiosClient.post("/posts", data);
    },
    getAllFeed: (limit: number, offset: number): Promise<Post> =>
        axiosClient.get(`/posts?limit=${limit}&offset=${offset}`),
    getPostsOfAttraction: async (
        offset: string,
        limit: string,
        attractionId: string
    ): Promise<Post[]> => {
        return axiosClient.get("/posts", {
            params: { offset, limit, attractionId },
        });
    },
};

export default postService;
