import React, { useEffect, useState, useRef } from 'react';
import { createUser, calculateAirdrops } from '../utils/api';

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
    const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

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

            // After creating the user, check and add airdrops
            await calculateAirdropsOnMount(userData.id);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // New function to calculate and add airdrops on mount
    const calculateAirdropsOnMount = async (telegramId: number) => {
        try {
            // Call the API to calculate and add airdrops for the user
            const result = await calculateAirdrops(telegramId);
            console.log('Airdrops calculated:', result);
        } catch (err: any) {
            console.error('Error calculating airdrops:', err);
            setError('Error calculating airdrops');
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
            {/* Removed progress display as it's no longer calculated */}
        </div>
    );
};

export default UserProfile;
