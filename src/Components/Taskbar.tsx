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
import Rectangle from '../icons/Rectangle.svg';

const Taskbar = () => {
  return (
    <div className="taskbar" style={{ backgroundImage: `url(${Rectangle})`, backgroundSize: 'cover' }}>
      <div className="p-4 h-16 flex flex-row justify-between items-center"> {/* Add items-center for vertical centering */}
        
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
                className={`transition-transform duration-200 ${
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
                className={`transition-transform duration-200 ${
                  isActive ? 'text-sm' : 'text-xs'
                }`}
              >
                Earn
              </span>
            </>
          )}
        </NavLink>
  
{/* Eco Tab */}
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
      className={` bg-gradient-to-r from-[#5A7FB8] to-[#2A3C4E] w-12 h-12 shadow-2xl flex rounded-full items-center justify-center transition-transform duration-300 ${
      isActive ? 'scale-105 -mt-20' : 'scale-90 -mt-16'
      }`}
    >
      <img
      src={isActive ? EcoOpen : Eco}
      className={`w-6 h-6 transition-transform duration-200 ${
        isActive ? 'scale-110' : 'scale-110'
      }`}
      alt="Eco Logo"
      />
    </div>
  )}
</NavLink>


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
                className={`transition-transform duration-200 ${
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
                className={`transition-transform duration-200 ${
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
