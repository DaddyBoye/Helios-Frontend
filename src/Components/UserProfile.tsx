import React, { useEffect, useState } from 'react';
import { createUser } from '../utils/api';
import moment from 'moment-timezone';

interface User {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    referralToken?: string | null;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [referralToken, setReferralToken] = useState<string | null>(null);

    // Fetch referral token from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('referralToken');
        if (token) {
            setReferralToken(token);
        }
    }, []);

    // Fetch timezone information
    const getUserTimezone = () => {
        const timezone = moment.tz.guess(); // This should return 'Africa/Accra' in Ghana
        return timezone;
    };

    // Handle user creation when Telegram WebApp is available
    useEffect(() => {
        const fetchUserData = async () => {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                const tg = window.Telegram.WebApp;
                tg.ready();

                const userData = tg.initDataUnsafe.user;

                if (userData) {
                    // Wait for referralToken to be set
                    const tokenAvailable = await waitForReferralToken();
                    const timezone = getUserTimezone();
                    await handleUserCreation(userData, tokenAvailable, timezone);
                } else {
                    setError('No user data available');
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [referralToken]);

    // Wait for referralToken to be available
    const waitForReferralToken = (): Promise<boolean> => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (referralToken) {
                    clearInterval(interval);
                    resolve(true);
                }
            }, 1000); // Check every second

            setTimeout(() => {
                clearInterval(interval);
                resolve(false); // Proceed without referralToken after 10 seconds
            }, 5000); // Max wait time
        });
    };

    // Handle user creation with timezone
    const handleUserCreation = async (userData: any, tokenAvailable: boolean, timezone: string) => {
        try {
            // Log the referral token to check if it's passed correctly
            console.log("Creating user with referralToken:", referralToken);

            const user = await createUser({
                telegramId: userData.id,
                telegramUsername: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
                referralToken: tokenAvailable ? referralToken : null, // Pass the referral token if available
                timezone, // Pass the timezone to the backend
            });

            console.log("Created user:", user); // Log created user data
            setUser(user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className='hidden'>Loading...</div>;
    if (error) return <div className="error hidden">{error}</div>;

    return (
        <div className='hidden'>
            <h1>Welcome, {user?.firstName}!</h1>
        </div>
    );
};

export default UserProfile;
