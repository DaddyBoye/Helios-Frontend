import Coin from '../images/dollar-coin.png';
import Hamster from '../icons/Hamster';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io('http://13.60.127.109:8000');

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

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
    <div>
        <div className="w-11/12 overflow-hidden bg-gray-600 text-white flex flex-row rounded-2xl mx-auto h-16 relative">
          <div
            className="bg-gradient-to-r from-[#25F503] to-[#C5D327] h-16 rounded-l-2xl"
            style={{ width: `${(progress / 60) * 100}%` }}
          ></div>
          <div className="z-40 absolute flex flex-row h-16 text-md my-auto p-3 pl-6">
            <Hamster className="w-5 h-5 mr-3 my-auto"/>
            <div className="flex my-auto text-sm flex-row gap-1">
              Mining...
            </div>
            <img src={Coin} className="my-auto w-4 mr-0.5 h-4 ml-3" alt="Coin" />
            <p className="text-sm w-10 mr-1 my-auto">123</p>
            <p id="timer" className=" text-sm my-auto">
              {minutes}m:{seconds < 10 ? `0${seconds}` : seconds}s
            </p>
          </div>
        </div>
    </div>
  );
};

export default ProgressBar;

