import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactIcon from '../assets/react.svg';
import Coin from '../images/dollar-coin.png';


interface ProgressBarProps {
  totalDivCount: number;
  progress: number;
  progressRate: number;
  timeLeft: { minutes: number; seconds: number }
}

const ProgressBar = forwardRef((props: ProgressBarProps, ref) => {
  const { totalDivCount, progress, progressRate, timeLeft } = props;

  const [coins, setCoins] = useState<number>(0);
  const progressRateRef = useRef<number>(progressRate);


  //Coincounter logic
  useEffect(() => {
    if (totalDivCount < 8) {
      const progressPerSecond = progressRateRef.current / 60;

      const interval = setInterval(() => {
        setCoins(prevCoins => prevCoins + progressPerSecond);
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [totalDivCount]);

  useEffect(() => {
    if (progress === 0) {
      setCoins(0);
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 60) {
      progressRateRef.current = progressRate; // Update progressRate when progress resets
    }
  }, [progress, progressRate]);

    // Reset function
    const handleResetButtonClick = () => {
      if (totalDivCount === 8) {
        progressRateRef.current = progressRate;
      }
    };
  
    useImperativeHandle(ref, () => ({
      resetButtonClick: handleResetButtonClick,
    }));

  return (
    <div>
      {totalDivCount < 8 ? (
        // Render this when totalDivCount is less than 8
        <div className="w-full overflow-hidden bg-gray-600 flex flex-row rounded-2xl h-12 relative">
          <div
            className="bg-gradient-to-r from-teal-500 to-purple-500 h-12 rounded-l-2xl"
            style={{ width: `${(progress / 60) * 100}%` }}
          ></div>
          <div className="z-40 absolute flex flex-row text-md my-auto p-3 pl-4">
            <img src={ReactIcon} className="w-6 h-6 my-auto ml-4 mr-1" alt="React Icon" />
            <div className="flex flex-row gap-1">
              Mining
            </div>

            <img src={Coin} className="my-auto w-4 mr-0.5 h-4 ml-3" alt="Coin" />
            <p className="text-sm w-20 mr-1 my-auto">{coins.toFixed(3)}</p>
            <p id="timer" className="w-16">
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

