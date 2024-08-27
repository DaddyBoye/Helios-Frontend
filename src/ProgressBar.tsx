import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactIcon from './assets/react.svg';
import Coin from './images/dollar-coin.png';


//progress logic//
const ProgressBar = forwardRef(({ totalDivCount, progress, progressRate },ref) => {
  const [timer, setTimer] = useState("00:00:00");
  const Ref = useRef();
  const [coins, setCoins] = useState(0);
  const progressRateRef = useRef(progressRate);

  //countdown timer logic// 
  function getTimeRemaining(e) {
    const targetTime = Date.parse(e);
    const currentTime = Date.now();
    const total = targetTime - currentTime;
  
    const hour = Math.floor(total / (1000 * 60 * 60) % 24);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
  
    return { total, hour, minutes, seconds };
  }

  function startTimer(e) {
    let { total, hour, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hour > 9 ? hour : '0' + hour) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  }
  
  function clearTimer(e) {
    setTimer("00:00:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
      if (getTimeRemaining(e).total <= 0) {
        clearTimer(getDeadTime()); // Restart the timer
      }
    }, 1000);
    Ref.current = id;
  }
  
  function getDeadTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  }
  
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

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

  const isTotalDivCountLessThan8 = totalDivCount < 8;

  return (
    <div>
      <p>Current Progress Rate Ref: {progressRateRef.current}</p>
      {isTotalDivCountLessThan8 ? (
        // Render this when totalDivCount is less than 8
    <div className="w-full overflow-hidden bg-gray-600 flex flex-row rounded-2xl h-12">
      <div
        className="bg-gradient-to-r from-green-500 to-yellow-400 h-12 rounded-l-2xl"
        style={{ width: `${(progress / 60) * 100}%` }}>
      </div>
      <div className='z-40 absolute flex flex-row text-md my-auto p-3 pl-10 z-10'>
        <img src={ReactIcon} className='w-6 h-6 my-auto mr-4'/> 
        <div className='flex flex-row gap-1' >
          Mining
          <div className="flex justify-center items-center">
          <div className="flex flex-row gap-1">
            <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div> 
        </div>

        <img src={Coin} className='my-auto w-4 mr-0.5 h-4 ml-5'/>
        <p className='text-sm my-auto'>{coins.toFixed(3)}</p>
        <p id='timer' className='ml-9'>{timer}</p>
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

