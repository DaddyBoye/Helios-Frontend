import axios from 'axios';

const VITE_SERVER2_URL = import.meta.env.VITE_SERVER2_URL;

interface UserData {
    telegramId: number;
    telegramUsername: string | null;
    firstName?: string;
    lastName?: string;
    referralToken?: string | null;
    timezone: string;
}

export const createUser = async (userData: UserData) => {
    try {
        console.log("Sending user data to API:", userData);
        const response = await axios.post(`${VITE_SERVER2_URL}/api/user`, userData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Error creating user');
        } else {
            throw new Error('Unexpected error occurred while creating user');
        }
    }
};
