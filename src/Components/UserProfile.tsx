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
        // Check if the app is opened in Telegram Web App
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            const userData = tg.initDataUnsafe.user;
            if (userData) {
                handleUserCreation(userData);
            } else {
                setError('No user data available');
                setLoading(false);
            }
        } else {
            setError('This app should be opened in Telegram');
            setLoading(false);
        }
    }, []);

    const handleUserCreation = async (userData: any) => {
        try {
            const telegramId = userData.id.toString(); // Store as string for localStorage
            localStorage.setItem('telegramId', telegramId); // Save to local storage

            // Create the user...
            const user = await createUser({
                telegramId,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            setUser(user);
            await calculateAirdropsOnMount(telegramId);
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

    const calculateAirdropsOnMount = async (telegramId: string) => {
        try {
            const result = await calculateAirdrops(parseInt(telegramId));
            console.log('Airdrops calculated:', result);
        } catch (err: any) {
            console.error('Error calculating airdrops:', err);
            setError('Error calculating airdrops');
        }
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && user) {
            const storedTelegramId = localStorage.getItem('telegramId');
            if (storedTelegramId) {
                console.log('Telegram ID from localStorage:', storedTelegramId);
                calculateAirdropsOnMount(storedTelegramId);
            } else {
                console.log('No Telegram ID found in localStorage');
            }
        }
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Set up an interval to recalculate airdrops periodically
        if (user) {
            intervalId.current = setInterval(() => {
                calculateAirdropsOnMount(user.id.toString());
            }, 30000);
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [user]);

    if (loading) return <div className='hidden'>Loading...</div>;
    if (error) return <div className="error hidden">{error}</div>;

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
            {localTelegramId ? (
                <p>Telegram ID: {localTelegramId}</p>
            ) : (
                <p>No Telegram ID found</p>
            )}
            {/* Other component content goes here */}
        </div>
    );
};

export default UserProfile;
