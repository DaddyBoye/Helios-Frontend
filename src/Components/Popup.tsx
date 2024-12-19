import React, { useState, useEffect } from 'react';
import { X, Gift, Timer } from 'lucide-react';

interface PopupProps {
  airdropCount: number;
  totalValue: number;
  onConfirm: () => void;
  onClose: () => void;
  progress: number;
}

const Popup: React.FC<PopupProps> = ({ airdropCount, totalValue, onConfirm, onClose, progress }) => {
  const [timeRemaining, setTimeRemaining] = useState(3600);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(3600 - progress);
    }, 500);
    return () => clearInterval(intervalId);
  }, [progress]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg p-4 w-full max-w-sm relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {airdropCount > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Gift className="w-6 h-6 text-emerald-500" />
              <div>
                <h2 className="font-bold text-emerald-500">Claim Rewards</h2>
                <p className="text-sm text-gray-400">{airdropCount} offsetss available</p>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded">
              <div className="text-white font-semibold">{totalValue} Helios</div>
              <div className="text-gray-400 text-sm">≈ {(totalValue / 100).toFixed(1)} kg CO₂</div>
            </div>

            <button
              onClick={onConfirm}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2 px-4 rounded"
            >
              Claim All
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <Timer className="w-10 h-10 text-gray-400 mx-auto" />
            <div>
              <h2 className="font-bold text-gray-300">No Offsetts Available</h2>
              <p className="text-sm text-gray-400">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} remaining
              </p>
            </div>
            <div className="w-full bg-gray-700 h-1 rounded-full">
              <div 
                className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(progress / 3600) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;