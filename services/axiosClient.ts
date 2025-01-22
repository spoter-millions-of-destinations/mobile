import axios from "axios";

import { getDataFromStorage } from "@/helpers/storage";


const axiosClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "content-type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = await getDataFromStorage("account");
        if (accessToken && accessToken.accessToken) {
            config.headers["Authorization"] =
                "Bearer " + accessToken.accessToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        console.log(error);
        if (error.response) {
            console.error("API error:", error.response.data);
            throw error.response.data;
        } else {
            console.error("API error:", error.message);
            throw error.message;
        }
    }
);

export default axiosClient;
