import React, { useEffect, useState } from 'react';

interface PopupProps {
  airdropCount: number;
  totalValue: number;
  onConfirm: () => void;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ airdropCount, totalValue, onConfirm, onClose }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    if (airdropCount === 0) {
      // Set the time for the countdown (e.g., 2 minutes)
      setTimeRemaining(120); // 120 seconds for demonstration

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0; // Stop at 0
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Clean up the interval on unmount
    }
  }, [airdropCount]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Claim Airdrops</h2>

        {airdropCount > 0 ? (
          <>
            <p className="mb-4">Airdrop Count: {airdropCount}</p>
            <p className="mb-4">Total Value: {totalValue}</p>
            <div className="flex justify-end space-x-4">
              <button onClick={onConfirm} className="bg-yellow-500 p-2 rounded-lg">Confirm</button>
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
