//import { useState, useEffect } from 'react';
import HomeOpen from '../icons/HomeOpen.svg';
import AirdropOpen from '../icons/Group.svg';
import Friends from '../icons/Friends.svg';
import EarnOpen from '../icons/Vector.svg';
import Home from '../icons/teenyicons_home-solid.svg';
import Earn from '../icons/ph_coins-fill.svg';
import FriendsOpen from '../icons/fa-solid_user-friends.svg';
import Airdrop from '../icons/mingcute_airdrop-fill.svg';
//import EcoOpen from '../icons/EcoOpen.svg';
//import Eco from '../icons/Eco.svg';
import { NavLink } from 'react-router-dom';
//import Rectangle from '../icons/Rectangle 67 (3).png';

const Taskbar = () => {
 // const [iconSize, setIconSize] = useState(window.innerWidth * (1 / 12)); // Initial size: 2/12 of screen width

 // useEffect(() => {
 //   const handleResize = () => {
 //     const newSize = window.innerWidth * (2 / 12); // Recalculate size on window resize
 //     setIconSize(newSize);
 //   };

 //   window.addEventListener('resize', handleResize);
 //   handleResize(); // Set size initially based on current screen width

 //   return () => window.removeEventListener('resize', handleResize); // Cleanup listener
 // }, []); //
  
  return (
    <div className="taskbar">
      <div className="p-4 bg-[#3D4549] h-16 flex flex-row justify-between items-center"> {/* Add items-center for vertical centering */}
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? HomeOpen : Home}
                className={`w-6 mx-auto h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-90'
                }`}
                alt="Home Logo"
              />
              <span
                className={`transition-transform z-50 duration-200 ${
                  isActive ? 'text-sm' : 'text-xs'
                }`}
              >
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* Earn */}
        <NavLink
          to="/earn"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? EarnOpen : Earn}
                className={`w-6 mx-auto h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                alt="Earn Logo"
              />
              <span
                className={`transition-transform z-50 duration-200 ${
                  isActive ? 'text-sm' : 'text-xs'
                }`}
              >
                Earn
              </span>
            </>
          )}
        </NavLink>
  
      {/* Eco Tab */}
      {/* <NavLink
         to="/eco"
         className={({ isActive }) =>
           `relative flex flex-col justify-center items-center ${
        isActive ? 'text-[#FFD700]' : 'text-white'
           }`
         }
       >
       {({ isActive }) => (
         <div
           style={{
        width: iconSize,
        height: iconSize,
           }}
           className={`shadow-2xl flex rounded-full items-center ml-1 justify-center transition-transform duration-300 ${
        isActive
          ? 'scale-125 -mt-16 bg-gradient-to-r from-[#5A7FB8] to-[#2A3C4E]'
          : 'scale-110 -mt-16 bg-gradient-to-r from-[#A4E786] to-[#2E7D32]'
           }`}
         >
         <img
           src={isActive ? EcoOpen : Eco}
           style={{ width: iconSize * 0.5, height: iconSize * 0.5 }} // Dynamically scale the icon size
           className={`transition-transform duration-200 ${
        isActive ? 'scale-120' : 'scale-110'
           }`}
           alt="Eco Logo"
         />
       </div>
          )}
        </NavLink> */}

        {/* Friends */}
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? FriendsOpen : Friends}
                className={`w-6 mx-auto h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-90'
                }`}
                alt="Friends Logo"
              />
              <span
                className={`transition-transform z-50 duration-200 ${
                  isActive ? 'text-sm' : 'text-xs'
                }`}
              >
                Friends
              </span>
            </>
          )}
        </NavLink>

        {/* Airdrop */}
        <NavLink
          to="/airdrop"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? AirdropOpen : Airdrop}
                className={`w-6 mx-auto h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-90'
                }`}
                alt="Airdrop Logo"
              />
              <span
                className={`transition-transform z-50 duration-200 ${
                  isActive ? 'text-sm' : 'text-xs'
                }`}
              >
                Airdrop
              </span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Taskbar;
