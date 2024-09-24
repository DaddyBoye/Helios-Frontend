import axios from 'axios';

const API_URL = 'https://server.therotrade.tech/api';

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
            throw new Error(error.response?.data?.error || 'Error creating user');
        } else {
            throw new Error('Unexpected error occurred while creating user');
        }
    }
};

// Save progress on logout
export const saveUserProgress = async (telegramId: number, progress: number) => {
    try {
        const response = await axios.post(`${API_URL}/save-progress`, {
            telegramId,
            progress,
        });
        return response.data;
    } catch (error) {
        throw new Error('Error saving progress');
    }
};

// Calculate progress on login
export const calculateUserProgress = async (telegramId: number) => {
    try {
        const response = await axios.get(`${API_URL}/calculate-progress`, {
            params: { telegramId },
        });
        return response.data.progress; // Return calculated progress
    } catch (error) {
        throw new Error('Error calculating progress');
    }
};