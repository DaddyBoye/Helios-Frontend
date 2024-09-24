// src/utils/api.ts
import axios from 'axios';

const API_URL = 'https://server.therotrade.tech/api'; // Adjust if hosted elsewhere

interface UserData {
    telegramId: number;
    username?: string;
    firstName?: string;
    lastName?: string;
}

export const createUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_URL}/user`, userData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Now TypeScript knows that error is an Axios error
            throw new Error(error.response?.data?.error || 'Error creating user');
        } else {
            // Handle unexpected error types
            throw new Error('Error creating user');
        }
    }
};