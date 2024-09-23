import React from 'react';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io('https://server.therotrade.tech');

interface PopupProps {
  airdropCount: number;
  totalValue: number;
  onConfirm: () => void;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ airdropCount, totalValue, onConfirm, onClose}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeRemaining(60 - progress); // Update remaining time whenever progress changes
  }, [progress]);

  // Format timeRemaining into minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    // Listen for progress updates
    socket.on('progressUpdate', (data) => {
      setProgress(data.progress);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('progressUpdate');
    };
  }, []);

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
}
export default Popup;
