import Helios from '../icons/HeliosLogo copy 2.svg'
import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D2D47]">
      <img src={Helios} alt="" />

    </div>
  );
};

export default LoadingPage;
