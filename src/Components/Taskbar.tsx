import HomeOpen from '../icons/HomeOpen.svg';
import AirdropOpen from '../icons/Group.svg';
import Friends from '../icons/Friends.svg';
import EarnOpen from '../icons/Vector.svg';
import Home from '../icons/teenyicons_home-solid.svg';
import Earn from '../icons/ph_coins-fill.svg';
import FriendsOpen from '../icons/fa-solid_user-friends.svg';
import Airdrop from '../icons/mingcute_airdrop-fill.svg';
import { NavLink } from 'react-router-dom';

const Taskbar = () => {
  return (
    <div className="taskbar">
      <div className="p-4 bg-[#3D4549] pt-2 pb-2 h-16 justify-between flex flex-row">
        
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? HomeOpen : Home}
                className="w-6 mx-auto h-5"
                alt="Home Logo"
              />
              Home
            </>
          )}
        </NavLink>

        {/* Earn */}
        <NavLink
          to="/earn"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? EarnOpen : Earn}
                className="w-6 mx-auto h-5"
                alt="Earn Logo"
              />
              Earn
            </>
          )}
        </NavLink>

        {/* Friends */}
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? FriendsOpen : Friends}
                className="w-6 mx-auto h-5"
                alt="Friends Logo"
              />
              Friends
            </>
          )}
        </NavLink>

        {/* Airdrop */}
        <NavLink
          to="/airdrop"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${
              isActive ? 'text-[#FFD700]' : 'text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? AirdropOpen : Airdrop}
                className="w-6 mx-auto h-5"
                alt="Airdrop Logo"
              />
              Airdrop
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Taskbar;
