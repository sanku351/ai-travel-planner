import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const {data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: bl_lat ?? '18.8939566',
                tr_latitude: tr_lat ?? '19.052585',
                bl_longitude: bl_lng ?? '72.7915568',
                tr_longitude: tr_lng ?? '72.9068144',
                limit: '30',
                currency: 'USD',
                lunit: 'km',
                lang: 'en_US'
            },
            headers: {
                'x-rapidapi-key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            },
        });
        
        return data; // Return the response data
    } catch (error) {
        console.error('Error fetching places data:',error); // Log the error for debugging
        return null;
    }
};