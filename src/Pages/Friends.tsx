import { useState } from 'react';
import friendsLogo from '../images/Mask group.svg';
import arrow from '../icons/Arrow 3.svg';
import ShareComponent from '../Components/ShareComponent';
import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground'; // Import the StarryBackground component

interface FriendsProps {
  toggleTaskbar: (isVisible: boolean) => void; // Pass the toggleTaskbar prop
}

const Friends: React.FC = () => {
  const { toggleTaskbar } = useOutletContext<FriendsProps>();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  // Toggle the share menu and taskbar visibility
  const toggleShareMenu = () => {
    setIsShareMenuOpen(!isShareMenuOpen);
    toggleTaskbar(isShareMenuOpen); // Hide taskbar when share menu is open
  };

  return (
    <div className="relative flex flex-col font-sans h-screen">
      <StarryBackground />
        <div className="z-10">
          <div className="mt-10 flex flex-col">
            <div className="w-20 mx-auto h-20 bg-[#D9D9D9] rounded-full">
              <img src={friendsLogo} alt="Three Friends" className="w-20 h-20" />
            </div>
            <p className="mx-auto text-3xl font-bold text-center text-white">
              Invite friends, earn points
            </p>
          </div>
          <div className="flex flex-col">
            <div className="pl-5 flex flex-col">
              <div className="mb-6 mt-8">
                <p className="text-white text-xl font-bold">How it works</p>
              </div>
              <div>
                <div className="relative">
                  <div className="mb-8 flex">
                    <img
                      src={arrow}
                      alt="Arrow svg"
                      className="absolute top-1 left-0"
                    />
                    <div className="flex pl-6 flex-col">
                      <p className="text-white">Share your invite link</p>
                      <p className="text-[#87939D] text-sm">
                        Get a free play pass for each friend
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="mb-8 flex">
                    <img
                      src={arrow}
                      alt="Arrow svg"
                      className="absolute top-1 left-0"
                    />
                    <div className="flex pl-6 flex-col">
                      <p className="text-white">Your friend joins Helios</p>
                      <p className="text-[#87939D] text-sm">And starts farming</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="mb-8 flex">
                    <img
                      src={arrow}
                      alt="Arrow svg"
                      className="absolute top-1 left-0"
                    />
                    <div className="flex pl-6 flex-col">
                      <p className="text-white">Score 10% from buddies</p>
                      <p className="text-[#87939D] text-sm">
                        Plus an extra 2.5% from their referrals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="mx-auto bg-[#DCAA19] rounded-2xl pt-4 pb-4 w-4/6"
              onClick={toggleShareMenu}
            >
              Invite a friend
            </button>
          </div>
      </div>

      {/* Share Component */}
      <ShareComponent isShareMenuOpen={isShareMenuOpen} toggleShareMenu={toggleShareMenu} />
    </div>
  );
};

export default Friends;
