// src/components/UserProgress.tsx
import React, { useEffect, useState, useRef } from 'react';

const API_URL = 'https://server.therotrade.tech/api';

const UserProgress: React.FC = () => {
    const [progress, setProgress] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [telegramId, setTelegramId] = useState<number | null>(null);
    const intervalId = useRef<ReturnType<typeof setInterval> | null>(null); // Reference for the interval

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            const userData = tg.initDataUnsafe.user;
            if (userData) {
                setTelegramId(userData.id);
            } else {
                setError('No user data available');
                setLoading(false);
            }
        } else {
            setError('This app should be opened in Telegram');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchUserProgress = async (telegramId: number) => {
            try {
                const response = await fetch(`${API_URL}/calculate-progress?telegramId=${telegramId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setProgress(data.progress);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        const updateUserProgress = async (telegramId: number) => {
            try {
                const response = await fetch(`${API_URL}/user/progress`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ telegramId }),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setProgress(data.progress); // Update the progress from the response
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred while updating progress');
                }
            }
        };

        if (telegramId) {
            // Fetch initial progress
            fetchUserProgress(telegramId);

            // Set an interval to update progress every second
            intervalId.current = setInterval(() => {
                updateUserProgress(telegramId);
            }, 1000);
        }

        // Cleanup function to clear the interval on component unmount
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [telegramId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h1>Your Current Progress:</h1>
            {progress !== null ? <p>{progress}</p> : <p>No progress data available.</p>}
        </div>
    );
};

export default UserProgress;
