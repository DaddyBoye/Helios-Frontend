import { useEffect, useState } from 'react';

const Earn = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();

        const userData = tg.initDataUnsafe.user;
        if (userData) {
            setTelegramId(userData.id); // Store telegramId in state
            fetchUserProgress(userData.id); // Fetch initial progress
        } else {
            console.error('No user data available');
        }
    } else {
        console.error('This app should be opened in Telegram');
    }
  }, []);

  const fetchUserProgress = async (telegramId: number) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
        const response = await fetch(`https://server.therotrade.tech/api/user/current-progress?telegramId=${telegramId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProgress(data.progress); // Set progress state
    } catch (error: unknown) { // Specify error type here
        if (error instanceof Error) {
            setError(error.message); // Use the message from the Error instance
        } else {
            setError('An unknown error occurred'); // Fallback for unknown error types
        }
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    if (telegramId !== null) {
        // Set up intervals to fetch data every second
        const userProgressIntervalId = setInterval(() => {
            fetchUserProgress(telegramId); // Pass the telegramId
        }, 1000);

        // Cleanup function: clear all intervals on component unmount
        return () => {
            clearInterval(userProgressIntervalId);
        };
    }
}, [telegramId]); // Add telegramId to the dependency array

return (
    <div className="flex flex-col font-sans pb-16 bg-[#185C8D] text-white p-4">
        <h1 className='text-center font-bold font-sans text-2xl'>
            Helios
        </h1>
        <div className='p-8 flex justify-center'>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {progress !== null && <p>Your current progress: {progress}</p>}
            </div>
        </div>
    </div>
  );
};

export default Earn;
