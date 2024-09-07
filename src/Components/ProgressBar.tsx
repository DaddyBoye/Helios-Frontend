import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactIcon from '../assets/react.svg';
import Coin from '../images/dollar-coin.png';

interface ProgressBarProps {
  totalDivCount: number;
  progress: number;
  progressRate: number;
  timeLeft: { minutes: number; seconds: number }; // Ensure timeLeft is an object with minutes and seconds
}

const ProgressBar = forwardRef((props: ProgressBarProps, ref) => {
  const { totalDivCount, progress, progressRate, timeLeft } = props;

  const [coins, setCoins] = useState<number>(0);
  const progressRateRef = useRef<number>(progressRate);

  // Coin counter logic
  useEffect(() => {
    if (totalDivCount < 8) {
      const progressPerSecond = progressRateRef.current / 60;

      const interval = setInterval(() => {
        setCoins((prevCoins) => prevCoins + progressPerSecond);
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [totalDivCount]);

  // Reset coins when progress is 0
  useEffect(() => {
    if (progress === 0) {
      setCoins(0);
    }
  }, [progress]);

  // Update progressRateRef when progressRate changes
  useEffect(() => {
    if (progress === 60) {
      progressRateRef.current = progressRate;
    }
  }, [progress, progressRate]);

  // Reset function
  const handleResetButtonClick = () => {
    if (totalDivCount === 8) {
      progressRateRef.current = progressRate;
    }
  };

  // Expose reset function to parent
  useImperativeHandle(ref, () => ({
    resetButtonClick: handleResetButtonClick,
  }));

  return (
    <div>
      {totalDivCount < 8 ? (
        // Render this when totalDivCount is less than 8
        <div className="w-full overflow-hidden bg-gray-600 flex flex-row rounded-2xl h-12 relative">
          <div
            className="bg-gradient-to-r from-green-500 to-yellow-400 h-12 rounded-l-2xl"
            style={{ width: `${(progress / 60) * 100}%` }}
          ></div>
          <div className="z-40 absolute flex flex-row text-md my-auto p-3 pl-10">
            <img src={ReactIcon} className="w-6 h-6 my-auto mr-4" alt="React Icon" />
            <div className="flex flex-row gap-1">
              Mining
              <div className="flex justify-center items-center">
                <div className="flex flex-row gap-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            </div>

            <img src={Coin} className="my-auto w-4 mr-0.5 h-4 ml-5" alt="Coin" />
            <p className="text-sm w-20 my-auto">{coins.toFixed(3)}</p>
            <p id="timer" className="ml-4">
              {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>
        </div>
      ) : (
        // Render this when totalDivCount is 8 or greater
        <div className="w-full h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
          Claim airdrops to continue mining!
        </div>
      )}
    </div>
  );
});

export default ProgressBar;
