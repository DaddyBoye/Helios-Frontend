import Coin from '../images/dollar-coin.png';
import Hamster from '../icons/Hamster';
import { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null);
  const CYCLE_DURATION = 60;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const userData = tg.initDataUnsafe.user;
      if (userData) {
        setTelegramId(userData.id);
        setTelegramUsername(userData.username);
      } else {
        console.error('No user data available');
      }
    } else {
      console.error('This app should be opened in Telegram');
    }
  }, []);

  const fetchUserProgress = async (telegramId: number) => {
    setError(null); // Reset error state
    try {
      const response = await fetch(`https://server.therotrade.tech/api/user/current-progress?telegramId=${telegramId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProgress(data.progress); // Set progress state
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Use the message from the Error instance
      } else {
        setError('An unknown error occurred'); // Fallback for unknown error types
      }
    }
  };

  // Function to trigger the airdrop check
  const triggerAirdrop = async () => {
    if (telegramId && telegramUsername) {
      try {
        const response = await fetch('https://server.therotrade.tech/api/add-airdrop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegramId, telegramUsername }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        // Optionally handle success response
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message); // Handle error if needed
        }
      }
    }
  };

  useEffect(() => {
    if (telegramId !== null) {
      // Fetch user progress every second
      const userProgressIntervalId = setInterval(() => {
        fetchUserProgress(telegramId); // Fetch progress every 1 second
      }, 1000);
  
      // Trigger airdrop check every half second (500ms)
      const triggerAirdropIntervalId = setInterval(() => {
        triggerAirdrop(); // Call airdrop check every 0.5 seconds
      }, 500);
  
      // Cleanup function: clear intervals on component unmount
      return () => {
        clearInterval(userProgressIntervalId); // Clear progress interval
        clearInterval(triggerAirdropIntervalId); // Clear airdrop interval
      };
    }
  }, [telegramId]);  

  useEffect(() => {
    setTimeRemaining(CYCLE_DURATION - progress); // Update remaining time whenever progress changes
  }, [progress]);

  // Format timeRemaining into minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <div className="w-11/12 overflow-hidden bg-gray-600 text-white flex flex-row rounded-2xl mx-auto h-16 relative">
        <div
          className="bg-gradient-to-r from-[#25F503] to-[#C5D327] h-16 rounded-l-2xl"
          style={{ width: `${(progress / CYCLE_DURATION) * 100}%` }}
        ></div>
        <div className="z-40 absolute flex flex-row h-16 text-md my-auto p-3 pl-6">
          <Hamster className="w-5 h-5 mr-3 my-auto" />
          <div className="flex my-auto text-sm flex-row gap-1">
            Mining...
          </div>
          <img src={Coin} className="my-auto w-4 mr-0.5 h-4 ml-3" alt="Coin" />
          <p className="text-sm w-10 mr-1 my-auto">123</p>
          <p id="timer" className=" text-sm my-auto">
            {minutes}m:{seconds < 10 ? `0${seconds}` : seconds}s
          </p>
        </div>
      </div>
      {error && <p className="error text-red-600">{error}</p>} {/* Show error visibly */}
    </div>
  );
};

export default ProgressBar;
