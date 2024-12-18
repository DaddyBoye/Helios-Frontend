import Coin from '../icons/Solis-coin.svg';
import Solis from '../icons/Solis-raw2.svg';
import { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
  minerate: number;
}


const ProgressBar = ({ progress, minerate }: ProgressBarProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const CYCLE_DURATION = 3600;

  useEffect(() => {
    setTimeRemaining(CYCLE_DURATION - progress);
  }, [progress]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <div className="w-11/12 overflow-hidden bg-gray-600 text-white flex flex-row rounded-2xl mx-auto h-16 relative">
        <div
          className="bg-gradient-to-r from-[#25F503] to-[#C5D327] h-16 rounded-l-2xl"
          style={{ width: `${(progress / CYCLE_DURATION) * 100}%` }}
        ></div>
    <div className="z-40 absolute flex flex-row items-center justify-between w-full h-16 px-3">
      <div className="flex items-center space-x-2">
        <img 
          src={Solis} 
          className="w-10 h-10 animate-spinZoomGlow"
        />
        <span className="text-sm font-medium">Offsetting...</span>
      </div>
      <div className="flex">
          <img src={Coin} className="my-auto w-8 h-8 " alt="Coin" />
            <p className="text-sm w-12 -ml-1.5 my-auto">
              {(progress / 3600 * minerate).toFixed(2)}
            </p>
            </div>
            <div className="flex items-center space-x-1 tabular-nums">
          <span className="text-sm font-medium">
            {minutes}m:{seconds < 10 ? `0${seconds}` : seconds}s
          </span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
