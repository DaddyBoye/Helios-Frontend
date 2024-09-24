// src/components/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { createUser, calculateUserProgress, updateUserProgress } from '../utils/api';

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
            // Step 1: Create the user
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            setUser(user);

            // Step 2: Calculate the initial progress (wait for this to finish)
            const initialProgress = await calculateUserProgress(userData.id);
            setProgress(initialProgress);

            // Step 3: Only start the interval for updating progress after the initial progress is set
            const interval = setInterval(async () => {
                try {
                    // Fetch the updated progress from the backend after each interval
                    const updatedProgress = await updateUserProgress(userData.id);
                    setProgress(updatedProgress); // Update the state with the new progress
                } catch (err) {
                    console.error('Error updating progress:', err);
                }
            }, 1000); // Update every second

            // Cleanup the interval when the component unmounts
            return () => clearInterval(interval);
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
