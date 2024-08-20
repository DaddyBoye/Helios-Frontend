import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import ReactIcon from './assets/react.svg';
import Coin from './images/dollar-coin.png';


//progress logic//
const ProgressBar = forwardRef((props, ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress <= 60 ? newProgress : 60;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //countdown timer logic//
  const [timer, setTimer] = useState("00:00:00")
  const Ref = useRef()

  function getTimeRemaining(e) {
    const targetTime = Date.parse(e);
    const currentTime = Date.now();
    const total = targetTime - currentTime;
  
    const hour = Math.floor(total / (1000 * 60 * 60) % 24);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
  
    return { total, hour, minutes, seconds };
  }
  
  function startTimer(e){
    let {total, hour, minutes, seconds} = getTimeRemaining(e);
    if(total>= 0) {
      setTimer(
        (hour > 9 ? hour : '0' + hour) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }
  function clearTimer(e) {
    setTimer("00:00:00")
    if(Ref.current) clearInterval(Ref.current);
    const id = setInterval(()=> {
      startTimer(e)
    }, 1000)
    Ref.current = id;
  }
  function getDeadTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds()+ 61);
    return deadline;
  }
  useEffect(()=>{
    clearTimer(getDeadTime())
  },[])

  //Reset function
  const handleResetButtonClick = () => {
    setProgress(0);
    setCurrentNumber(0);
    clearTimer(getDeadTime());
  };

  useImperativeHandle(ref, () => ({
    resetButtonClick: handleResetButtonClick,
  }));

  //Coincounter logic
  const targetNumber = 60;
  const increment = 1;
  const intervalDuration = 1000;

  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentNumber < targetNumber) {
        setCurrentNumber((prevNumber) => prevNumber + increment);
      } else {
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, [currentNumber]);

  const formattedNumber = currentNumber.toFixed(3);

  return (
    <div>
    <div className="w-full overflow-hidden bg-gray-600 flex flex-row rounded-2xl h-12">
      <div
        className="bg-gradient-to-r from-green-500 to-yellow-400 h-12 rounded-l-2xl"
        style={{ width: `${(progress / 60) * 100}%` }}>
      </div>
      <div className='z-40 absolute flex flex-row text-md my-auto p-3 pl-16 z-10'>
        <img src={ReactIcon} className='w-6 h-6 my-auto mr-4'/> 
        Mining... 
        <img src={Coin} className='my-auto w-4 mr-0.5 h-4 ml-5'/>
        <p className='text-sm my-auto'>{formattedNumber}</p>
        <p id='timer' className='ml-9'>{timer}</p>
      </div>
    </div>
    </div>
    
  );
});

export default ProgressBar;

