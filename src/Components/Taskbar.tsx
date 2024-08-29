import { binanceLogo } from '../images';
import { Link } from 'react-router-dom';

const Taskbar = () => {
  return (
    <div className="taskbar">
      <div className='p-4 bg-opacity-95 pt-2 pb-2 h-16 bg-[#32363C] rounded-lg justify-between flex flex-row'>
        <Link to="/" className="bg-[#212429] pl-2 w-16 pr-2 justify-center rounded-md text-center text-xs flex flex-col">
          <img src={binanceLogo} className="w-6 mx-auto h-5" alt="Home Logo" /> Home
        </Link>
        <Link to="/earn" className="bg-[#212429] pl-2 w-16 pr-2 justify-center rounded-md text-center text-xs flex flex-col">
          <img src={binanceLogo} className="w-6 mx-auto h-5" alt="Earn Logo" /> Earn
        </Link>
        <Link to="/friends" className="bg-[#212429] pl-2 w-16 pr-2 justify-center rounded-md text-center text-xs flex flex-col">
          <img src={binanceLogo} className="w-6 mx-auto h-5" alt="Friends Logo" /> Friends
        </Link>
        <Link to="/airdrop" className="bg-[#212429] pl-2 w-16 pr-2 justify-center rounded-md text-center text-xs flex flex-col">
          <img src={binanceLogo} className="w-6 mx-auto h-5" alt="Airdrop Logo" /> Airdrop
        </Link>
      </div>
    </div>
  );
};

export default Taskbar;
