import Coin from '../images/dollar-coin.png';
import Solis from '../icons/fdv 1 (1).svg';
import { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
  minerate: number;
}


const ProgressBar = ({ progress, minerate }: ProgressBarProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const CYCLE_DURATION = 60;

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
        <div className="z-40 absolute flex flex-row h-16 text-md my-auto p-3 pl-6">
          <img src={Solis} className="w-8 h-8 mr-3 my-auto animate-spinZoomGlow"/>
          <div className="flex my-auto text-sm flex-row gap-1">
            Offsetting...
          </div>
          <img src={Coin} className="my-auto w-4 mr-0.5 h-4 ml-3" alt="Coin" />
            <p className="text-sm w-12 mr-1 my-auto">
              {(progress / 60 * minerate).toFixed(2)}
            </p>
          <p id="timer" className="text-sm my-auto">
            {minutes}m:{seconds < 10 ? `0${seconds}` : seconds}s
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
