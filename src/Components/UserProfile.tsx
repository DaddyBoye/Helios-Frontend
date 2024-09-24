import React, { useEffect, useState } from 'react';
import { createUser, calculateUserProgress, saveUserProgress } from '../utils/api';
import UserProgress from './UserProgress';

interface User {
    telegramId: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    points: number;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Effect to handle user login
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            const userData = tg.initDataUnsafe?.user;
            if (userData) {
                handleUser(userData);
            } else {
                setError('No user data available');
                setLoading(false);
            }
        } else {
            setError('This app should be opened in Telegram');
            setLoading(false);
        }
    }, []);

    // Handle user creation and progress calculation
    const handleUser = async (userData: any) => {
        try {
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            
            const calculatedProgress = await calculateUserProgress(user.telegramId);
            setUser({
                ...user,
                points: calculatedProgress,
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle saving user progress on logout
    const handleLogout = async () => {
        if (user) {
            try {
                await saveUserProgress(user.telegramId, user.points);
                console.log('Progress saved on logout');
            } catch (error) {
                console.error('Error saving progress on logout:', error);
            }
        }
    };

    // Effect to save progress on unmount
    useEffect(() => {
        return () => {
            handleLogout();
        };
    }, [user]);

    // Loading and error handling
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Your current points: {user?.points}</p>

            {/* Automatically start counting progress when user is logged in */}
            {user && <UserProgress telegramId={user.telegramId} />} 
        </div>
    );
};

export default UserProfile;
