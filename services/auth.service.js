// authService.js
import axiosClient from "../configs/axiosClient";

const authService = {
    login: (username, password) => {
        return axiosClient.post("/auth/login", { username, password });
    },
    register: (userInfo) => {
        return axiosClient.post("/auth/register", userInfo);
    },
    refreshToken: (refreshToken) => {
        return axiosClient.post("/auth/refresh-token", {
            refreshToken,
        });
    },
};

export default authService;
