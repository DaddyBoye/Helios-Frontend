import React, { useEffect, useState } from 'react';
import { createUser, fetchProgress, logoutUser } from '../utils/api';

interface User {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    points: number;
    progress: number;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0); // For progress tracking

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

            // Handle logout automatically when the user closes the web app
            window.onbeforeunload = () => {
                handleLogout();
            };
        } else {
            setError('This app should be opened in Telegram');
        }

        return () => {
            // Clean up when component unmounts
            window.onbeforeunload = null;
        };
    }, []);

    // Handle user creation and fetching data
    const handleUser = async (userData: any) => {
        try {
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            setUser(user);
            startPollingProgress(user.id); // Start polling progress after login
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Polling function to fetch progress every second
    const startPollingProgress = (telegramId: number) => {
        const intervalId = setInterval(async () => {
            try {
                const progressData = await fetchProgress(telegramId); // Fetch progress from the backend
                setProgress(progressData.progress);
            } catch (err) {
                console.error('Error fetching progress:', err);
            }
        }, 1000); // Poll every second

        // Clear interval when the component unmounts or user logs out
        return () => clearInterval(intervalId);
    };

    // Logout function to be triggered on page unload
    const handleLogout = async () => {
        if (user) {
            try {
                await logoutUser(user.id); // Call logout API
                setUser(null); // Clear user state
                setProgress(0); // Reset progress
                console.log('User logged out');
            } catch (err) {
                setError('Error logging out');
                console.error('Logout error:', err);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Your current points: {user?.points}</p>
            <p>Your progress: {progress}</p>
        </div>
    );
};

export default UserProfile;
