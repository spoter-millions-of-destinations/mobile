// authService.js
import axiosClient from "../configs/axiosClient";

const fileService = {
    uploadFile: async (source) => {
        
        let base64Img = `data:image/jpg;base64,${source.base64}`;
        let apiUrl = "https://api.cloudinary.com/v1_1/dnauqbonl/image/upload";

        const res = await fetch(apiUrl, {
            body: JSON.stringify({
                file: base64Img,
                upload_preset: "spoter",
            }),
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
        });
        const data = await res.json();
        return data.url;
    },
};

export default fileService;
