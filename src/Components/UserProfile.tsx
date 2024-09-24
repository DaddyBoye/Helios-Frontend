// src/components/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { createUser, calculateUserProgress } from '../utils/api'; // Make sure to implement the API functions.

interface User {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentProgress, setCurrentProgress] = useState<number>(0);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;

        if (tg) {
            tg.ready();

            const userData = tg.initDataUnsafe.user;
            if (userData) {
                handleUser(userData);
            } else {
                setError('No user data available');
            }
        } else {
            setError('This app should be opened in Telegram');
        }
    }, []);

    const handleUser = async (userData: any) => {
        try {
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            setUser(user);
            // After user creation, calculate the progress
            await fetchProgress(user.telegramId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProgress = async (telegramId: number) => {
        try {
            const response = await calculateUserProgress(telegramId); // Implement this API call to hit the /calculate-progress endpoint.
            setCurrentProgress(response.progress);
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Your current progress: {currentProgress}</p>
        </div>
    );
};

export default UserProfile;
