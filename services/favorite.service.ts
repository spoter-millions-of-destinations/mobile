import axiosClient from "./axiosClient";
export type Favorite = {
    postId: number;
    isFavorite: boolean;
};
const favoriteService = {
    postFavorite: (data: Favorite) => {
        return axiosClient.post("/favorites", data);
    },
};

export default favoriteService;
