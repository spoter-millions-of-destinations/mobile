// authService.js
import axios from 'axios'
export interface MapLocation {
    geometry: {
        coordinates: [number, number]
        type: 'Point'
    }
    id: string
    properties: {
        context: ['Object']
        coordinates: ['Object']
        feature_type: 'address'
        full_address: string
        mapbox_id: string
        match_code: ['Object']
        name: string
        name_preferred: string
        place_formatted: string
    }
    type: 'Feature'
}
const mapService = {
    findLocationByName: async (name: string): Promise<MapLocation[]> => {
        const data = await axios.get('https://api.mapbox.com/search/geocode/v6/forward', {
            params: {
                q: encodeURIComponent(name),
                access_token:
                    'pk.eyJ1IjoicGh1b2NuZ3V5ZW4xMiIsImEiOiJjbTZxbGZxcmQwZm52Mm5zYmJ4b2Z0YXk0In0.naqLpD_iEu4oAJVM_CWZFQ',
                limit: 5,
            },
        })
        console.log(data.data.features)

        return data.data.features
    },
}

export default mapService
