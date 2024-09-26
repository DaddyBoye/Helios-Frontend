// src/components/UserProfile.tsx
import React, { useEffect, useState, useRef } from 'react';
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
    const intervalId = useRef<ReturnType<typeof setInterval> | null>(null); // Reference for the interval
    const intervalSet = useRef<boolean>(false); // Flag to check if interval is set

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            const userData = tg.initDataUnsafe.user;
            if (userData) {
                handleUserCreation(userData); // Call the user creation function
            } else {
                setError('No user data available');
            }
        } else {
            setError('This app should be opened in Telegram');
        }
    }, []);

    const handleUserCreation = async (userData: any) => {
        try {
            // Create the user
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            setUser(user);

            // After creating the user, calculate initial progress
            await calculateInitialProgress(userData.id);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateInitialProgress = async (telegramId: number) => {
        try {
            // Get initial progress
            const initialProgress = await calculateUserProgress(telegramId);
            setProgress(initialProgress);

            // Start the interval for updating progress if not already set
            if (!intervalSet.current) {
                intervalId.current = setInterval(async () => {
                    try {
                        const updatedProgress = await updateUserProgress(telegramId);
                        setProgress(updatedProgress); // Update the state with the new progress
                    } catch (err) {
                        console.error('Error updating progress:', err);
                    }
                }, 1000); // Update every second
                intervalSet.current = true; // Set the flag to true
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Cleanup the interval when the component unmounts
    useEffect(() => {
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, []);

    if (loading) return <div className='hidden'>Loading...</div>;
    if (error) return <div className="error hidden">{error}</div>;

    return (
        <div className='hidden'>
            <h1>Welcome, {user?.firstName}!</h1>
            {progress !== null && <p>Your current progress: {progress}</p>} {/* Display progress */}
        </div>
    );
};

export default UserProfile;
