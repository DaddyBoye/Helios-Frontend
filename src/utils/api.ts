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

// Function to update user progress
export const updateUserProgress = async (telegramId: number) => {
    try {
        const response = await axios.post(`${API_URL}/user/progress`, { telegramId });
        return response.data.progress;
    } catch (error) {
        console.error('Error updating progress:', error);
        throw new Error('Error updating progress');
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