import Coin from '../images/dollar-coin.png';
import Hamster from '../icons/Hamster';
import { useState, useEffect } from 'react';
import { updateUserProgress } from '../utils/api'; // Import the function

interface ProgressBarProps {
  progress: number; // Use the progress passed as a prop
  telegramId: number | null; 
  telegramUsername: string | null; 
}

const ProgressBar = ({ progress, telegramId, telegramUsername }: ProgressBarProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const CYCLE_DURATION = 60;

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
          console.error(error.message); // Log error
        }
      }
    }
  };

  useEffect(() => {
    setTimeRemaining(CYCLE_DURATION - progress); // Update remaining time whenever progress changes
  }, [progress]);

  useEffect(() => {
    if (telegramId !== null) {
      // Trigger airdrop check every half second (500ms)
      const triggerAirdropIntervalId = setInterval(() => {
        triggerAirdrop(); // Call airdrop check every 0.5 seconds
      }, 500);

      // Cleanup function: clear intervals on component unmount
      return () => {
        clearInterval(triggerAirdropIntervalId); // Clear airdrop interval
      };
    }
  }, [telegramId]);

  // Interval to update user progress every second
  useEffect(() => {
    const progressIntervalId = setInterval(async () => {
      if (telegramId) {
        try {
          const updatedProgress = await updateUserProgress(telegramId); // Call the function to update progress
          setTimeRemaining(CYCLE_DURATION - updatedProgress); // Update remaining time
        } catch (error) {
          console.error('Error updating progress:', error);
        }
      }
    }, 1000); // Update progress every second

    // Cleanup function: clear the interval on component unmount
    return () => {
      clearInterval(progressIntervalId);
    };
  }, [telegramId]);

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
          <p id="timer" className="text-sm my-auto">
            {minutes}m:{seconds < 10 ? `0${seconds}` : seconds}s
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
