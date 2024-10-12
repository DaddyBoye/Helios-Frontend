import axios from 'axios';

const API_URL = 'https://server.therotrade.tech/api';

interface UserData {
    telegramId: number;
    telegramUsername?: string;
    firstName?: string;
    lastName?: string;
    referralToken?: string | null;
    timezone: string;
}

export const createUser = async (userData: UserData) => {
    try {
        console.log("Sending user data to API:", userData);
        const response = await axios.post(`${API_URL}/user`, userData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Error creating user');
        } else {
            throw new Error('Unexpected error occurred while creating user');
        }
    }
};

// Check if user exists by telegramId
export const checkUserExists = async (telegramId: number) => {
    try {
        const response = await axios.get(`${API_URL}/user/${telegramId}`);
        return response.data; // Returns user data if found
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return null; // User not found
            }
            throw new Error(error.response?.data?.error || 'Error checking user');
        } else {
            throw new Error('Unexpected error occurred while checking user');
        }
    }
};