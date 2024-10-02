import Home from '../icons/teenyicons_home-solid.svg';
import Earn from '../icons/ph_coins-fill.svg';
import Friends from '../icons/fa-solid_user-friends.svg';
import Airdrop from '../icons/mingcute_airdrop-fill.svg';
import { NavLink } from 'react-router-dom';

const Taskbar = () => {
  return (
    <div className="taskbar">
      <div className="p-4 bg-white/20 pt-2 pb-2 h-16 backdrop-blur-2xl justify-between flex flex-row">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <img
            src={Home}
            className="w-6 mx-auto h-5"
            alt="Home Logo"
          />
          Home
        </NavLink>

        <NavLink
          to="/earn"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <img
            src={Earn}
            className="w-6 mx-auto h-5"
            alt="Earn Logo"
          />
          Earn
        </NavLink>

        <NavLink
          to="/friends"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <img
            src={Friends}
            className="w-6 mx-auto h-5"
            alt="Friends Logo"
          />
          Friends
        </NavLink>

        <NavLink
          to="/airdrop"
          className={({ isActive }) =>
            `pl-2 w-16 pr-2 justify-center text-center text-xs flex flex-col ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <img
            src={Airdrop}
            className="w-6 fill-[#E5D7D7] mx-auto bg-blue h-5"
            alt="Airdrop Logo"
          />
          Airdrop
        </NavLink>
      </div>
    </div>
  );
};

export default Taskbar;
