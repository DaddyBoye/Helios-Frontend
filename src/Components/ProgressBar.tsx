import Coin from '../images/dollar-coin.png';
import Hamster from '../icons/Hamster';
import { useState, useEffect } from 'react';
import { updateUserProgress } from '../utils/api';

interface ProgressBarProps {
  progress: number;
  telegramId: number | null; 
  telegramUsername: string | null; 
}

const ProgressBar = ({ progress, telegramId, telegramUsername }: ProgressBarProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const CYCLE_DURATION = 60;

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  };

  useEffect(() => {
    setTimeRemaining(CYCLE_DURATION - progress);
  }, [progress]);

  useEffect(() => {
    if (telegramId !== null) {
      const triggerAirdropIntervalId = setInterval(() => {
        triggerAirdrop();
      }, 500);

      return () => {
        clearInterval(triggerAirdropIntervalId);
      };
    }
  }, [telegramId]);

  useEffect(() => {
    if (telegramId) {
      const id = setInterval(async () => {
        // Check if the document is visible before updating progress
        if (!document.hidden) {
          try {
            const updatedProgress = await updateUserProgress(telegramId);
            setTimeRemaining(CYCLE_DURATION - updatedProgress);
          } catch (error) {
            console.error('Error updating progress:', error);
          }
        }
      }, 1000);

      // Cleanup function: clear the interval on component unmount
      return () => {
        clearInterval(id);
      };
    }
  }, [telegramId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Document is hidden, updates will be paused.");
      } else {
        console.log("Document is visible, updates will resume.");
        if (telegramId) {
          updateUserProgress(telegramId).then(updatedProgress => {
            setTimeRemaining(CYCLE_DURATION - updatedProgress);
          }).catch(error => {
            console.error('Error updating progress on visibility change:', error);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [telegramId]);

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
