import React, { useEffect, useState } from 'react';
import { createUser } from '../utils/api';

interface User {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    points: number;
}

// Define the structure of the Telegram user data
interface TelegramUserData {
    id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            const userData = tg.initDataUnsafe?.user as TelegramUserData | undefined;

            if (userData) {
                handleUser(userData);
            } else {
                setError('No user data available from Telegram');
                setLoading(false); // Stop loading when there's an error
            }
        } else {
            setError('This app should be opened in Telegram');
            setLoading(false); // Stop loading in case the app is opened outside of Telegram
        }
    }, []);

    const handleUser = async (userData: TelegramUserData) => {
        try {
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
            });
            setUser(user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false); // Ensure loading stops whether the request succeeds or fails
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h1>Welcome, {user?.firstName}!</h1>
            <p>Your current points: {user?.points ?? 0}</p> {/* Default to 0 if points is undefined */}
        </div>
    );
};

export default UserProfile;
