import AsyncStorage from "@react-native-async-storage/async-storage";

const getDataFromStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.error("Error getting data from storage", error);
    }
};
const setDataStorage = async <T>(key: string, value: T) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error setting data to storage", error);
    }
};
export { getDataFromStorage, setDataStorage };
