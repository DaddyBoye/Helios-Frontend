import React from 'react';
import Solis from '../icons/fdv 1 (1).svg';
import Friends from '../icons/Friends Vector.svg';
import User from '../icons/edeef 1.svg';

interface HeaderProps {
  minerate: number | null;
  friendsCount: number;
}

const Header: React.FC<HeaderProps> = ({ minerate, friendsCount }) => {
  return (
    <div className='w-full backdrop-blur  text-white fixed pt-2 top-0 left-0 z-20 right-0 mx-auto'>
      <div className='flex flex-row items-center w-11/12 justify-between mx-auto my-auto bg-[#185C8D]/70 h-12 p-1 pl-2 rounded-lg'>
        <div className='flex flex-row items-center justify-center'>
          <img src={Solis} alt="Solis" className="w-8 h-8 animate-spinZoomGlow" />
          <p className='text-base ml-1'>Helios</p>
        </div>
        <div className="relative flex my-auto h-6">
          <div className="flex flex-row items-center justify-between gap-3 rounded-full pl-3 pr-14 py-0.5 bg-[#185C8D]/80">
            <div className="flex flex-row items-center">
              <img src={Solis} alt="Solis" className="w-6 h-6" />
              <p className="ml-1 text-xs">{minerate}</p>
            </div>
            <div className="flex flex-row items-center">
              <img src={Friends} alt="Friends" className="w-6 h-6" />
              <p className="ml-1 text-xs">{friendsCount}</p>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FFD700] mr-1 rounded-full p-0.5 flex items-center justify-center">
            <img src={User} alt="User" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
