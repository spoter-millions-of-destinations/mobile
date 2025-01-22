// authService.js
import axiosClient from "../configs/axiosClient";

const commentService = {
    createComment: (data) => {
        return axiosClient.post("/comments", data);
    },
    getCommentOfPost: (postId, offset, limit) =>
        axiosClient.get(`/comments`, {
            params: {
                postId,
                limit,
                offset,
            },
        }),
};

export default commentService;
