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
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: name,
                format: 'json',
                addressdetails: 1,
                limit: 5,
                countrycodes: 'vn', // Giới hạn kết quả ở Việt Nam
            },
            headers: {
                'Accept-Language': 'vi', // Ưu tiên tiếng Việt
                'User-Agent': 'your-app-name (your-email@example.com)', // Nominatim yêu cầu user agent hợp lệ
            },
        })
        console.log(response.data)

        // Chuyển đổi dữ liệu về MapLocation tương tự như từ Mapbox
        return response.data.map((item) => ({
            type: 'Feature',
            id: item.place_id.toString(),
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
            },
            properties: {
                name: item.name || item.display_name.split(',')[0], // fallback nếu không có name
                name_preferred: item.name || item.display_name.split(',')[0],
                full_address: item.display_name,
                place_formatted: item.display_name,
                mapbox_id: `${item.osm_type}_${item.osm_id}`,
                feature_type: item.type || 'address',
                match_code: [], // Nominatim không có match_code — bạn có thể để rỗng
                coordinates: [], // Nếu cần thêm chi tiết có thể truyền bounding box hoặc điểm chính
                context: Object.entries(item.address).map(([k, v]) => ({ [k]: v })),
            },
        }))
    },
    getLocationByAddress: async (
        address: string,
    ): Promise<{
        lat: number
        lng: number
    }> => {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        )
        if (response.data.length > 0) {
            return {
                lat: parseFloat(response.data[0].lat),
                lng: parseFloat(response.data[0].lon),
            }
        }
        throw new Error('No results found')
    },
}

export default mapService
