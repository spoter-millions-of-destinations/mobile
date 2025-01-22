// authService.js
import axiosClient from "../configs/axiosClient";

const feedService = {
    createPost: (data) => {
        return axiosClient.post("/posts", data);
    },
    getAllFeed: (limit, offset) =>
        axiosClient.get(`/posts?limit=${limit}&offset=${offset}`),
};

export default feedService;
