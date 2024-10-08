import { useState } from 'react'; 
import friendsLogo from '../images/Mask group.svg';
import arrow from '../icons/Arrow 3.svg';
import ShareComponent from '../Components/ShareComponent';
import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';

interface FriendsProps {
  toggleTaskbar: (isVisible: boolean) => void;
}

const Friends: React.FC = () => {
  const { toggleTaskbar } = useOutletContext<FriendsProps>();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const toggleShareMenu = () => {
    setIsShareMenuOpen(prev => !prev);
    toggleTaskbar(isShareMenuOpen);
  };

  return (
    <div className="relative flex flex-col font-sans h-screen pb-20 overflow-y-auto justify-center items-center">
      <StarryBackground />
      <div className="z-10 w-full text-center">
        <div className="mt-8 flex flex-col">
          <div className="w-16 md:w-20 lg:w-24 mx-auto h-16 md:h-20 lg:h-24 bg-[#D9D9D9] rounded-full">
            <img src={friendsLogo} alt="Three Friends" className="w-full h-full object-cover rounded-full" />
          </div>
          <p className="mx-auto text-2xl pt-5 md:text-3xl lg:text-5xl pl-2 pr-2 font-bold text-white">
            Invite friends, earn points
          </p>
        </div>
        <div className="flex flex-col w-full mt-10">
        <div id='div1' 
               className="w-full flex flex-col 
                          pl-4 sm:pl-6 md:pl-8 lg:pl-10">
            <div className="mb-6">
              <p className="text-white text-left text-lg md:text-xl font-bold">How it works</p>
            </div>
            <div>
              {['Share your invite link', 'Your friend joins Helios', 'Score 10% from buddies'].map((text, index) => (
                <div key={index} className="relative mb-8 flex">
                  <img src={arrow} alt="Arrow svg" className="absolute top-1 left-0" />
                  <div className="flex pl-6 text-left flex-col">
                    <p className="text-white text-base md:text-lg lg:text-xl">{text}</p>
                    <p className="text-[#87939D] text-xs md:text-sm lg:text-base">
                      {index === 0 && 'Get a free play pass for each friend'}
                      {index === 1 && 'And starts farming'}
                      {index === 2 && 'Plus an extra 2.5% from their referrals'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="mx-auto bg-[#DCAA19] rounded-2xl pt-4 mt-8 pb-4 w-4/6 md:w-5/6 lg:w-1/2"
            onClick={toggleShareMenu}
          >
            <span className="text-base md:text-lg lg:text-xl">Invite a friend</span>
          </button>
        </div>
      </div>

      <ShareComponent isShareMenuOpen={isShareMenuOpen} toggleShareMenu={toggleShareMenu} />
    </div>
  );
};

export default Friends;
