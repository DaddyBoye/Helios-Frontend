import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://server.therotrade.tech/api';


const UserProgress: React.FC<{ telegramId: number }> = ({ telegramId }) => {
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.post(`${API_URL}/user/progress`, { telegramId });
                setProgress(response.data.progress);
            } catch (err: any) {
                setError('Error updating progress');
                clearInterval(intervalId); // Stop the loop if there's an error
            }
        }, 1000); // Call API every second to increment progress

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [telegramId]);

    if (error) return <div>{error}</div>;

    return <div>Current Progress: <p className='text-2xl font-bold text-[#DCAA19]'>{progress}</p></div>;
};

export default UserProgress;
