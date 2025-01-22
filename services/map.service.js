// authService.js
import axios from "axios";
import axiosClient from "../configs/axiosClient";

const mapService = {
    findLocationByName: async (name) => {
        const data = await axios.get(
            "https://api.mapbox.com/search/geocode/v6/forward",
            {
                params: {
                    q: name,
                    access_token:
                        "pk.eyJ1IjoicGh1b2NuZ3V5ZW4xMiIsImEiOiJjbHhxeXB1a2MwZng1MnJvb20xbHlnYXpuIn0.MRn9U9_PZ8g2Yhk9nqy5fg",
                    limit: 1,
                },
            }
        );
        return data.data.features;
    },
};

export default mapService;
