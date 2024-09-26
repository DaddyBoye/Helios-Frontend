import React, { useState, useEffect } from 'react';

interface PopupProps {
  airdropCount: number;
  totalValue: number;
  onConfirm: () => void;
  onClose: () => void;
  telegramId: number | null;
  progress: number; // Add progress prop
}

const Popup: React.FC<PopupProps> = ({ airdropCount, totalValue, onConfirm, onClose, telegramId, progress }) => {
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(60 - progress);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [progress]);


  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Claim Airdrops</h2>
        {airdropCount > 0 ? (
          <>
            <p className="mb-4">Airdrop Count: {airdropCount}</p>
            <p className="mb-4">Total Value: {totalValue}</p>
            <div className="flex justify-end space-x-4">
              <button onClick={onConfirm} className="bg-yellow-500 p-2 rounded-lg">Claim All</button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4">You have no airdrops to claim!</p>
            <p className="mb-4">
              Please come back after: {minutes} {minutes === 1 ? 'minute' : 'minutes'}:
              {seconds < 10 ? `0${seconds}` : seconds} {seconds === 1 ? 'second' : 'seconds'}
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={onClose} className="bg-yellow-500 p-2 rounded-lg">Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
