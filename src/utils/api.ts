import axios from 'axios';

const API_URL = 'https://server.therotrade.tech/api';

interface UserData {
    telegramId: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    referralToken?: string | null; // Added referralToken to the interface
}

export const createUser = async (userData: UserData) => {
    try {
        console.log("Sending user data to API:", userData); // Log userData including referralToken
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

// Function to calculate airdrops based on last saved progress
export const calculateAirdrops = async (telegramId: number) => {
    try {
        const response = await axios.get(`${API_URL}/calculate-airdrops`, {
            params: { telegramId },
        });
        return response.data; // Return the response data, including total airdrops added
    } catch (error) {
        console.error('Error calculating airdrops:', error);
        throw new Error('Error calculating airdrops');
    }
};
