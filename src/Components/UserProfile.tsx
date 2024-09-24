// src/components/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { createUser } from '../utils/api';
import { calculateUserProgress } from '../utils/api';

interface User {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [progress, setProgress] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
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

            // After user is created, calculate their progress
            const calculatedProgress = await calculateUserProgress(userData.id);
            setProgress(calculatedProgress); // Set progress in state
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
            {progress !== null && <p>Your current progress: {progress}</p>} {/* Display progress */}
        </div>
    );
};

export default UserProfile;
