

import axiosClient from "./axiosClient";

export type User = {
    id: number;
    email: string;
    name: string;
    username: string;
    avatar: string;
    roles: string[];
    isLocked: boolean;
    createdAt: string;
    updatedAt: string;
};
const userService = {
    getMyInfo: (): Promise<User> => {
        return axiosClient.get("/users/me");
    },
};

export default userService;
