import axios from 'axios';

const API_URL = 'https://server.therotrade.tech/api'; // Adjust if hosted elsewhere

interface UserData {
    telegramId: number;
    username?: string;
    firstName?: string;
    lastName?: string;
}

// Create or login user
export const createUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_URL}/user`, userData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Error creating user');
        } else {
            throw new Error('Error creating user');
        }
    }
};

// Fetch user progress
export const fetchProgress = async (telegramId: number) => {
    try {
        const response = await axios.get(`${API_URL}/progress/${telegramId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Error fetching progress');
        } else {
            throw new Error('Error fetching progress');
        }
    }
};

// Logout user
export const logoutUser = async (telegramId: number) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, { telegramId });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Error logging out');
        } else {
            throw new Error('Error logging out');
        }
    }
};
