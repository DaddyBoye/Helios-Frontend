import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://server.therotrade.tech/api';

interface UserProgressProps {
    telegramId: number;
    isLoggedIn: boolean; // New prop to determine if user is logged in
}

const UserProgress: React.FC<UserProgressProps> = ({ telegramId, isLoggedIn }) => {
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            setProgress(0); // Reset progress if not logged in
            return; // Exit if user is not logged in
        }

        const fetchProgress = async () => {
            try {
                const response = await axios.post(`${API_URL}/user/progress`, { telegramId });
                setProgress(response.data.progress);
            } catch (err: any) {
                setError('Error updating progress');
            }
        };

        // Fetch progress every 5 seconds instead of every second
        const intervalId = setInterval(fetchProgress, 5000);

        // Initial fetch on mount
        fetchProgress();

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [telegramId, isLoggedIn]);

    if (error) return <div>{error}</div>;

    return <div>Current Progress: <p className='text-2xl font-bold text-[#DCAA19]'>{progress}</p></div>;
};


export default UserProgress;
