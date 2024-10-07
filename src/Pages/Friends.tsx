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
    setIsShareMenuOpen(prev => !prev);
    toggleTaskbar(isShareMenuOpen);
  };

  return (
    <div className="relative flex flex-col font-sans h-screen pb-20 overflow-y-auto">
      <StarryBackground />
      <div className="z-10">
        <div className="mt-8 flex flex-col">
          <div className="w-16 mx-auto h-16 bg-[#D9D9D9] rounded-full">
            <img src={friendsLogo} alt="Three Friends" className="w-16 h-16 object-cover" />
          </div>
          <p className="mx-auto text-2xl font-bold text-center text-white">
            Invite friends, earn points
          </p>
        </div>
        <div className="flex flex-col">
          <div className="pl-5 flex flex-col">
            <div className="mb-6 mt-6">
              <p className="text-white text-lg font-bold">How it works</p>
            </div>
            <div>
              {['Share your invite link', 'Your friend joins Helios', 'Score 10% from buddies'].map((text, index) => (
                <div key={index} className="relative mb-8 flex">
                  <img
                    src={arrow}
                    alt="Arrow svg"
                    className="absolute top-1 left-0"
                  />
                  <div className="flex pl-6 flex-col">
                    <p className="text-white">{text}</p>
                    <p className="text-[#87939D] text-xs">
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
            className="mx-auto bg-[#DCAA19] rounded-2xl pt-4 mt-8 pb-4 w-4/6"
            onClick={toggleShareMenu}
          >
            Invite a friend
          </button>
        </div>
      </div>

      {/* Share Component */}
      <ShareComponent isShareMenuOpen={isShareMenuOpen} toggleShareMenu={toggleShareMenu} />

      {/* Add Media Queries */}
      <style>{`
        @media (max-width: 640px) {
          .text-2xl {
            font-size: 1.5rem; // Adjust font size for smaller screens
          }
          .w-16 {
            width: 4rem; // Adjust logo width for smaller screens
            height: 4rem; // Adjust logo height for smaller screens
          }
          .mt-8 {
            margin-top: 2rem; // Reduce margin to position elements higher
          }
          .mb-6 {
            margin-bottom: 1rem; // Reduce margin for the "How it works" title
          }
        }
      `}</style>
    </div>
  );
};

export default Friends;
