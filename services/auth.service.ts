// authService.js

import axiosClient from "./axiosClient";

export type Auth = {
    username: string;
    password: string;
    email: string;
    name: string;
};

const authService = {
    login: ({ username, password }: Pick<Auth, "username" | "password">) => {
        return axiosClient.post("/auth/login", { username, password });
    },
    register: (userInfo: Auth) => {
        return axiosClient.post("/auth/register", userInfo);
    },
    refreshToken: (refreshToken: string) => {
        return axiosClient.post("/auth/refresh-token", {
            refreshToken,
        });
    },
};

export default authService;
