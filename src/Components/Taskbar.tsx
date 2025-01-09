import { useState, useEffect } from 'react';
import HomeOpen from '../icons/HomeOpen.svg';
import AirdropOpen from '../icons/Group.svg';
import Friends from '../icons/Friends.svg';
import EarnOpen from '../icons/Vector.svg';
import Home from '../icons/teenyicons_home-solid.svg';
import Earn from '../icons/ph_coins-fill.svg';
import FriendsOpen from '../icons/fa-solid_user-friends.svg';
import Airdrop from '../icons/mingcute_airdrop-fill.svg';
import EcoOpen from '../icons/EcoOpen.svg';
import Eco from '../icons/Eco.svg';
import { NavLink } from 'react-router-dom';

const Taskbar = () => {
  const [iconSize, setIconSize] = useState(window.innerWidth * (1 / 12));

  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth * (2 / 12), 100); // Set a maximum size of 100px
      setIconSize(newSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative font-sans">
      {/* Eco Tab - Positioned absolutely to prevent clipping */}
      <div className="fixed left-[50.5%] eco-1 -translate-x-1/2 bottom-9 z-50">
        <NavLink
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
              className={`shadow-2xl flex rounded-full items-center justify-center transition-all duration-500 ease-in-out ${
                isActive
                  ? 'scale-125 bg-gradient-to-r from-[#5A7FB8] to-[#2A3C4E]'
                  : 'scale-110 bg-gradient-to-r from-[#A4E786] to-[#2E7D32]'
              }`}
            >
              <img
                src={isActive ? EcoOpen : Eco}
                style={{ width: iconSize * 0.5, height: iconSize * 0.5 }}
                className={`transition-transform duration-500 ease-in-out ${
                  isActive ? 'scale-120' : 'scale-110'
                }`}
                alt="Eco Logo"
              />
            </div>
          )}
        </NavLink>
      </div>

      {/* Main taskbar */}
      <div className="taskbar1 taskbar h-20 -mb-3 bg-[#444F5E]">
        <div className="p-4 h-16 flex flex-row justify-between items-center">
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

          {/* Placeholder div for Eco spacing */}
          <div className="w-16"></div>

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
    </div>
  );
};

export default Taskbar;