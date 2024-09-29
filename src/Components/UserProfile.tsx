import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { createUser, calculateAirdrops } from '../utils/api';

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
    const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
    const [localTelegramId, setLocalTelegramId] = useState<string | null>(null);
    const [referralToken, setReferralToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
    
            const userData = tg.initDataUnsafe.user;
    
            // Extract the referral token from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const referralToken = urlParams.get('start'); // `start` is the parameter in the URL
    
            console.log("Referral Token from URL:", referralToken); // Log to ensure it's captured
    
            if (referralToken) {
                setReferralToken(referralToken); // Store referral token in state
            }
    
            if (userData) {
                handleUserCreation(userData); // Proceed to create user with referral token
            } else {
                setError('No user data available');
                setLoading(false);
            }
        }
    }, []);

    const handleUserCreation = async (userData: any) => {
        try {
            const telegramId = userData.id.toString(); // Ensure it's a string
            Cookies.set('telegramId', telegramId, { expires: 1 }); // Set cookie to expire after 1 day
    
            // Log the referral token to check if it's passed correctly
            console.log("Creating user with referralToken:", referralToken);
    
            const user = await createUser({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name,
                referralToken: referralToken // Pass the referral token here
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
        // Fetch the telegramId from cookies when the component mounts
        const storedTelegramId = Cookies.get('telegramId') || null; // Use `null` if not found
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
            const storedTelegramId = Cookies.get('telegramId'); // Get it again when visibility changes
            if (storedTelegramId) {
                console.log('Telegram ID from cookies:', storedTelegramId);
                calculateAirdropsOnMount(parseInt(storedTelegramId));
            } else {
                console.log('No Telegram ID found in cookies');
            }
        }
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Set up an interval to recalculate airdrops periodically
        if (user) {
            intervalId.current = setInterval(() => {
                calculateAirdropsOnMount(user.id);
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
        <div className='hidden'>
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
