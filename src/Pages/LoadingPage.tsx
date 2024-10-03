import React, { useEffect, useState } from 'react';
import Helios from '../icons/HeliosLogo copy 2.svg';

const LoadingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
    }, 39); // Increment progress every 30ms to simulate loading

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D2D47]">
      <img src={Helios} alt="Helios Logo" className="mb-6" />
      {/* Loading Bar */}
      <div className="w-64 bg-gray-300 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingPage;
