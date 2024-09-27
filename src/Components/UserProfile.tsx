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
    const [localTelegramId, setLocalTelegramId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            const userData = tg.initDataUnsafe.user;
            if (userData) {
                handleUserCreation(userData);
            } else {
                setError('No user data available');
                setLoading(false); // Update loading state
            }
        } else {
            setError('This app should be opened in Telegram');
            setLoading(false); // Update loading state
        }
    }, []);

    const handleUserCreation = async (userData: any) => {
        try {
            localStorage.setItem('telegramId', userData.id);
            // Create the user...
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            setUser(user);
            await calculateAirdropsOnMount(userData.id);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch the telegramId from localStorage when the component mounts
        const storedTelegramId = localStorage.getItem('telegramId');
        setLocalTelegramId(storedTelegramId);
    }, []);

    const calculateAirdropsOnMount = async (telegramId: number) => {
        try {
            const result = await calculateAirdrops(telegramId);
            console.log('Airdrops calculated:', result);
        } catch (err: any) {
            console.error('Error calculating airdrops:', err);
            setError('Error calculating airdrops');
        }
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && user) {
            if (localTelegramId) {
                console.log('Telegram ID from localStorage:', localTelegramId);
                calculateAirdropsOnMount(parseInt(localTelegramId));
            } else {
                console.log('No Telegram ID found in localStorage');
            }
        }
    };
    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Optional: Add interval to recalculate airdrops periodically while visible
        if (user) {
            intervalId.current = setInterval(() => {
                calculateAirdropsOnMount(user.id);
            }, 30000); // Adjust the interval as needed (e.g., every 30 seconds)
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [user]);

    if (loading) return <div className='hidden'>Loading...</div>; // Remove 'hidden' class
    if (error) return <div className="error hidden">{error}</div>; // Remove 'hidden' class

    return (
        <div>
            <h1 className='hidden'>Welcome, {user?.firstName}!</h1>
            <h1>{localTelegramId}</h1>
        </div>
    );
};

export default UserProfile;
