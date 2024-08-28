import './App.css';
import ProgressBar from './ProgressBar';
import CompletedAirdrops from './CompletedAirdrops';
import { useState, useEffect, useRef } from 'react';
import ReactIcon from './assets/react.svg';
import Coin from './images/dollar-coin.png';
import Hamster from './images/main-character.png';
import { binanceLogo } from './images';

function App() {
 const progressBarRef = useRef();
 const completedAirdropsRef = useRef();
 const [totalDivCount, setTotalDivCount] = useState(0);
 const [parentProgress, setParentProgress] = useState(0);
 const [mineRate, setMineRate] = useState(60);
 const [totalCoins, setTotalCoins] = useState(0);
 const [cumulativeTotal, setCumulativeTotal] = useState(0);
 const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  // Mine rate increase logic
  useEffect(() => {
    const mineRateInterval = setInterval(() => {
      setMineRate((prevRate) => prevRate + 1); // Increase mine rate by 1 every 60 seconds
    }, 7000); // 60 seconds in milliseconds

    return () => clearInterval(mineRateInterval); // Cleanup interval on component unmount
  }, []);

//progress logic
useEffect(() => {
  const interval = setInterval(() => {
    updateParentProgress(); // Call your function to update parentProgress
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, [totalDivCount]);

const updateParentProgress = () => {
  setParentProgress((prevProgress) => {
    const newProgress = prevProgress + 1;
    if (newProgress <= 60 && totalDivCount !== 8) {
      return newProgress;
    } else {
      return 0;
    }
  });
};

  //Timer logic
  useEffect(() => {
    const totalTimeInSeconds = 60; // Assuming target is 60
    const remainingTimeInSeconds = (60 - parentProgress);

    setTimeLeft({
      minutes: Math.floor(remainingTimeInSeconds / 60),
      seconds: remainingTimeInSeconds % 60
    });
  }, [parentProgress]);

 const handleDivAdded = () => {
  // Increment the total div count
  setTotalDivCount(prevCount => prevCount + 1);
};

const handleDivReset = () => {
  // Reset the total div count
  setTotalDivCount(0);
};

const handleCoinsEarnedUpdate = (newTotal) => {
  setTotalCoins(newTotal); // Update the total coins in the parent state
};

const handleAddToCumulative = () => {
  setCumulativeTotal((prevTotal) => prevTotal + totalCoins);
};

  //reset
  const handleParentResetButtonClick = () => {
    handleAddToCumulative();
    clearArray();
    handleParentButtonClick();
    setTotalCoins(0);
  };

    //reset array
    const clearArray = () => {
      completedAirdropsRef.current.emptyArray();  
    };

    const handleParentButtonClick = () => {
      // Call the resetButtonClick function from the child component
      progressBarRef.current.resetButtonClick();
    };

return (
  <div className="flex flex-col font-sans bg-gradient-to-b from-[#185C8D] to-[#1A1F20] text-white p-4 ">
    <h1 className='text-center font-bold font-sans text-2xl'>
      Bamboo
    </h1>
    <div className='flex flex-col my-2 rounded-lg bg-gradient-to-b from-[#4067B3] to-[#24373A] p-4 pt-1'>
      <div className='flex flex-row justify-between mb-2'>
        <div className='p-1'>
          <div className='text-sm font-bold text-zinc-400'>Mining Rate</div>
          <div className='flex flex-row justify-center text-sm text-center'>
            <img src={Coin} className="my-auto h-4 w-4"/>
            <strong>{mineRate}</strong>/hr
          </div>
        </div>

        <div className='p-1'>
          <div className='text-sm font-bold text-zinc-400'>Friends</div>
          <div className='text-center flex flex-row justify-center'>
            12
            <img src={Hamster} className='h-6 w-6 my-auto'/>
          </div>
        </div>

        <div className='p-1 text-center'>
          <div className='text-sm font-bold text-zinc-400'>Airdrop Time</div>
          <p>{timeLeft.minutes}m {timeLeft.seconds}s</p>
        </div>

      </div>

      <div className='p-3 flex justify-center flex-row border-t-2 border-b-2 border-[#121D28] font-bold text-center text-3xl'>
      <img src={ReactIcon}/>
      {cumulativeTotal}
      </div>

      <div className='flex flex-row justify-between pl-2 pt-1 pr-2'>
       <div className='w-40'>
        <div className='font-medium text-left text-xs mb-2'>
          Lorem ipsum dolor sit, amet
        </div>
        <div className='font-medium text-left text-zinc-400 text-sm '>
          Lorem / ipsum
        </div>
       </div>
       <div className='w-40'>
        <div className='font-medium text-right text-xs mb-2'>
          Lorem ipsum dolor sit, amet
        </div>
        <div className='font-medium text-zinc-400 text-right text-sm '>
          Lorem
        </div>
       </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
        <div className="bg-gradient-to-r from-green-500 to-yellow-300 h-2.5 rounded-full w-4/12"></div>
      </div>

    </div>

    <div className='flex flex-col my-2 rounded-xl bg-gradient-to-b from-[#253948] to-[#161617]'>
      <div className='border-b-2 border-white pl-4 pt-3 pb-3 pr-4 flex flex-row justify-between'>
        <div className='flex flex-col w-52'>
          <div className='font-bold mb-1 text-xs'>
            Participate in {totalDivCount} rounds of airdrop
          </div>
          <div className='mb-1 font-bold text-sm'>
            Get {totalCoins} coins
          </div>
          <div className='mb-1 text-xs'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum ea harum hic mollitia quam, iste accus
          </div>  
        </div>

        <button onClick={handleParentResetButtonClick} className=' bg-yellow-400 rounded-lg hover:bg-sky-700 font-bold p-1.5 pl-3 pr-3 border border-white mr-2 my-auto'>
           Claim
        </button>

      </div>

      <div className='font-bold p-4 pt-2'>
        <div className='mb-2 '>
          Current Airdrop
          <div className="App">
            <ProgressBar 
            totalDivCount={totalDivCount} 
            ref={progressBarRef} 
            progress={parentProgress} 
            progressRate={mineRate}
            timeLeft={timeLeft}
            />
          </div>
        </div>
        
        <div className=''>
          <CompletedAirdrops 
          ref={completedAirdropsRef}
          onDivAdded={handleDivAdded}
          onDivReset={handleDivReset}
          completedProgress={parentProgress}
          coinsEarned={mineRate}
          onCoinsEarnedUpdate={handleCoinsEarnedUpdate} // Pass the callback function
          />
          </div>
          <p>Total Divs Added: {totalDivCount}</p>
        </div>
        <p>Progress:{parentProgress}</p>

    </div>

    <div className='mt-auto p-4 pt-2 pb-2 h-16 bg-[#32363C] rounded-lg justify-between flex flex-row'>
      <div className='bg-[#212429] pl-4 pr-4 justify-center rounded-md text-center text-xs flex flex-col'>
        <img src={binanceLogo} className='w-6 mx-auto h-5'/> Mine
      </div>
      <div className='bg-[#212429] pl-4 pr-4 justify-center rounded-md text-center text-xs flex flex-col'>
        <img src={binanceLogo} className='w-6 mx-auto h-5'/> Mine
      </div>
      <div className='bg-[#212429] pl-4 pr-4 justify-center rounded-md text-center text-xs flex flex-col'>
        <img src={binanceLogo} className='w-6 mx-auto h-5'/> Mine
      </div>
      <div className='bg-[#212429] pl-4 pr-4 justify-center rounded-md text-center text-xs flex flex-col'>
        <img src={binanceLogo} className='w-6 mx-auto h-5'/> Mine
      </div>
    </div>
  </div>
  )
}

export default App;
