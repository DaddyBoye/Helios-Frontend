import Coin from '../icons/Solis-coin.svg';
import Solis from '../icons/Solis-raw2.svg';
import { useState, useEffect } from 'react';
import '../App.css';

interface ProgressBarProps {
  progress: number;
  minerate: number;
  airdropCount?: number;
}

const AnimatedDigit = ({ value }: { value: number }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prevValue !== value) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsAnimating(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <span className="inline-block w-3 text-center">
      <div className="relative h-5 overflow-hidden perspective">
        <div 
          className={`transition-all duration-250 ${
            isAnimating 
              ? 'animate-flipTop' 
              : ''
          }`}
        >
          {value}
        </div>
      </div>
    </span>
  );
};

const ProgressBar = ({ progress, minerate, airdropCount = 0 }: ProgressBarProps) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const CYCLE_DURATION = 3600;
  const MAX_AIRDROPS = 8;

  useEffect(() => {
    setTimeRemaining(CYCLE_DURATION - progress);
  }, [progress]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const isReadyToReap = airdropCount >= MAX_AIRDROPS;

  const miningStatuses = ["Mining...", "Processing...", "Validating...", "Offsetting..."];
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!isReadyToReap) {
      const interval = setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % miningStatuses.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isReadyToReap]);

  return (
    <div>
      <div className="w-11/12 overflow-hidden bg-gray-600 text-white flex flex-row rounded-2xl mx-auto h-16 relative">
        <div
          className="h-16 rounded-l-2xl transition-all duration-300 ease-in-out"
          style={{
            width: isReadyToReap ? '100%' : `${(progress / CYCLE_DURATION) * 100}%`,
            background: isReadyToReap 
              ? 'linear-gradient(to right, #2563eb, #3b82f6)' 
              : 'linear-gradient(to right, #25F503, #C5D327)',
            boxShadow: isReadyToReap 
              ? '0 0 30px rgba(37, 99, 235, 0.6)' 
              : 'none'
          }}
        />
        <div className="z-40 absolute flex flex-row items-center justify-between w-full h-16 px-3">
          <div className="flex items-center space-x-2">
            <img 
              src={Solis} 
              className={`w-10 h-10 ${isReadyToReap ? 'animate-pulse' : 'animate-spinZoomGlow'}`}
            />
            <span className={`text-sm font-medium ${isReadyToReap ? 'animate-bounce' : 'animate-pulse'}`}>
              {isReadyToReap ? (
                <span className="text-yellow-300 font-bold">
                  ⚡ READY TO REAP ⚡
                </span>
              ) : (
                <span className="inline-block w-24 animate-fade">
                  {miningStatuses[statusIndex]}
                </span>
              )}
            </span>
          </div>
          {!isReadyToReap && (
            <>
              <div className="flex items-center">
                <img 
                  src={Coin} 
                  className="w-8 h-8 animate-bounce"
                  alt="Coin" 
                />
                <span className="text-sm w-12 -ml-1.5">
                  {(progress / 3600 * minerate).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center font-medium text-sm tabular-nums">
                <AnimatedDigit value={Math.floor(minutes / 10)} />
                <AnimatedDigit value={minutes % 10} />
                <span className="">m:</span>
                <AnimatedDigit value={Math.floor(seconds / 10)} />
                <AnimatedDigit value={seconds % 10} />
                <span className="">s</span>
              </div>
            </>
          )}
          {isReadyToReap && (
            <div className="flex items-center mr-2">
              <span className="text-yellow-300 font-bold animate-pulse">
                FULL
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

