// authService.js
import axiosClient from "./axiosClient";
import { User } from "./user.service";
export type Comment = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
};
const commentService = {
    createComment: (data: Pick<Comment, "content"> & { postId: number }) => {
        return axiosClient.post("/comments", data);
    },
    getCommentOfPost: (
        postId: number,
        offset: number = 0,
        limit: number = 10
    ): Promise<Comment[]> =>
        axiosClient.get(`/comments`, {
            params: {
                postId,
                limit,
                offset,
            },
        }),
};

export default commentService;
