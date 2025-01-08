import { useState, useEffect, useRef } from 'react';
import ShareComponent from '../Components/ShareComponent';
import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import UserOutline from '../icons/Users Outline.svg';
import Solis from '../icons/Solis-raw2.svg';
import Copy from '../icons/Group 107.svg';
import { motion, AnimatePresence } from 'framer-motion';
import FriendsIcon from '../icons/Friends Vector.svg';
import FreshCoin from '../icons/Solis-coin.svg';
import Cat from '../icons/Avatars/Cat.png';
import Capybara from '../images/Capybara.svg';
import Parrot from '../icons/Avatars/Parrot.png';
import Sheep from '../icons/Avatars/Sheep.png';
import Rooster from '../icons/Avatars/Rooster.png';
import Dog from '../icons/Avatars/Dog.png';
import Lion from '../icons/Avatars/Lion.png';
import Goat from '../icons/Avatars/Goat.png';
import Cheetah from '../icons/Avatars/Cheetah.png';
import Panther from '../icons/Avatars/Panther.png';
import SeriousDog from '../icons/Avatars/SeriousDog.png';
import SomeBird from '../icons/Avatars/SomeBird.png';

interface FriendsProps {
  toggleTaskbar: (isVisible: boolean) => void;
  heliosUsername: string | null;
  friends: Friend[];
  referralLink: string | null;
  avatarPath: string | null;
  totalAirdrops: number;
  minerate: number | null;
}

interface Friend {
  id: number;
  name: string;
  score: number;
  avatar: string;
  referralCount: number;
}

const Friends: React.FC = () => {
  const { toggleTaskbar, heliosUsername, friends, totalAirdrops, minerate, referralLink, avatarPath } = useOutletContext<FriendsProps>();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isFullListOpen, setIsFullListOpen] = useState(false);

  const avatarMap: { [key: string]: string } = {
    'avatars/Cat.svg': Cat,
    'avatars/Capybara.svg': Capybara,
    'avatars/Parrot.svg': Parrot,
    'avatars/Sheep.svg': Sheep,
    'avatars/Rooster.svg': Rooster,
    'avatars/Dog.svg': Dog,
    'avatars/Lion.svg': Lion,
    'avatars/Goat.svg': Goat,
    'avatars/Cheetah.svg': Cheetah,
    'avatars/Panther.svg': Panther,
    'avatars/Serious Dog.svg': SeriousDog,
    'avatars/Some Bird.svg': SomeBird,
  };  

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrate for a short duration
          }
          setAlertMessage('Referral link copied to clipboard!');
          setTimeout(() => setAlertMessage(null), 3000);
        })
        .catch(() => {
          setAlertMessage('Failed to copy the referral link.');
          setTimeout(() => setAlertMessage(null), 3000);
        });
    }
  };

  const [displayedFriends, setDisplayedFriends] = useState<Friend[]>([]);
  const friendsContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemHeight = 64; // height of each friend item in pixels

  useEffect(() => {
    if (friends.length > 0) {
      if (friends.length >= 3) {
        // Duplicate the list if there are three or more friends
        setDisplayedFriends([...friends, ...friends]);
      } else {
        // Render without duplication if there are fewer than three friends
        setDisplayedFriends([...friends]);
      }
    } else {
      setDisplayedFriends([]); // Clear displayed friends if there are none
    }
  }, [friends]);
  
  useEffect(() => {
    if (friends.length >= 3) {
      const interval = setInterval(() => {
        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + itemHeight;
          if (newPosition >= friends.length * itemHeight) {
            // Reset scroll position to loop from the top
            return 0;
          }
          return newPosition;
        });
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [friends, itemHeight]);
  
  const toggleShareMenu = () => {
    setIsShareMenuOpen((prev) => !prev);
    toggleTaskbar(isShareMenuOpen);
  };

  const toggleFullList = () => {
    setIsFullListOpen(!isFullListOpen);
  };

  // Helper function to format number
  const formatNumber = (number: number) => {
    if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + "m";
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + "k";
    }
    return number.toString();
  };

  return (
    <div className="relative flex flex-col font-sans h-full overflow-y-auto bg-transparent">
      <StarryBackground />
      <div className="z-10 w-full h-full text-center bg-transparent pb-36">
      { alertMessage &&(
        <div className="mb-4 mt-4 pl-2 z-20 text-sm p-0 text-white w-11/12 h-7 text-center rounded-md fixed flex flex-row items-center bg-[#000000]/50 top-4 left-1/2 transform -translate-x-1/2">
          <img src={Solis} alt="" className="w-7 h-7 animate-spinZoomGlow" />
          <p className='pl-2 my-auto'>{alertMessage}</p>
        </div>
          )}
        {/* Card with profile */}
        <div className="bg-white/10 border-solid flex flex-col mx-auto mt-4 border-2 border-[#B4CADA] backdrop-blur-md rounded-xl w-11/12 pb-4">
            <div className="relative mx-auto rounded-full h-28 w-28 flex justify-center items-center">
              <img src={avatarMap[avatarPath || 'avatars/Some Bird.svg']} alt="Your Avatar" className="w-24 h-24" />
            </div>
          <p className="text-white font-bold text-xl">{heliosUsername}</p>
          <div className="mx-auto justify-between mt-2 w-fit gap-5 px-2 bg-white/10 backdrop-blur-md rounded-2xl flex flex-row">
            <div className="flex flex-row">
              <img src={Solis} className="w-7 h-7 my-auto" />
              <p className="my-auto font-bold text-white">{minerate}</p>
            </div>
            <div className="flex flex-row">
              <img src={FriendsIcon} className="w-5.5 h-5.5 pr-0.5 my-auto" />
              <p className="my-auto font-bold my-auto text-white">{friends.length}</p>
            </div>
            <div className="flex flex-row">
              <img src={FreshCoin} className="w-9 h-9 -ml-2 my-auto" />
              <p className="my-auto font-bold -ml-1.5 text-white">{formatNumber(totalAirdrops)}</p>
            </div>
          </div>
        </div>

        {/* Friends List Header */}
        <div className="flex flex-row w-full justify-between px-7 pt-4 text-white">
          <p className="text-white text-base">Friends ({friends.length})</p>
          <button
            onClick={toggleFullList}
            className="bg-white/10 text-white text-sm py-1 mb-1 px-3 rounded-md hover:bg-white/20 transition-colors duration-300 flex items-center border border-white/30"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Full List
          </button>
        </div>

         {/* Conditional Rendering for Friends */}
         {friends.length === 0 ? (
          <div className='w-11/12 mx-auto flex items-center justify-center border bg-white/10 py-8 rounded-lg backdrop-blur-sm border-[#B4CADA]'>
            <p className="text-white text-center">You have no referrals.</p>
          </div>
        ) : (
          <div className="w-11/12 mx-auto h-48 border py-1.5 rounded-lg bg-white/10 backdrop-blur-sm overflow-hidden"
          >
            <div
              ref={friendsContainerRef}
              className="transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateY(-${scrollPosition}px)`,
              }}
            >
              {displayedFriends.map((friend, index) => (
                <div
                  key={`${friend.id}-${index}`}
                  className="friend-item py-1 bg-[#194564]/80 w-11/12 mx-auto rounded-lg flex justify-between mb-2"
                >
                  <div className="flex">
                    <div className="mx-auto mt-1 mb-1 ml-2 rounded-full h-10 w-10 flex justify-center items-center">
                    <img src={avatarMap[friend.avatar] || SomeBird} alt={friend.name} className="w-10 h-10" />
                    </div>
                    <div className="flex flex-col h-9 text-left my-auto pl-3">
                      <p className="font-medium text-white text-sm">{friend.name}</p>
                      <div className="flex items-center flex-row">
                        <img src={UserOutline} alt="" className="h-4 w-4" />
                        <p className="text-white/50 my-auto pt-0.5 text-sm">+{friend.referralCount}</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-20'>
                    <p className="text-left text-md mr-4 mt-1 text-white">{friend.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full List Modal */}
        <AnimatePresence>
          {isFullListOpen && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-20 backdrop-blur-sm flex items-center justify-center"
          >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-[#09161F] rounded-lg p-4 w-11/12 max-w-md max-h-[76vh] mb-28 overflow-y-auto border border-white/20"
              >
                
                <h2 className="text-white text-lg font-semibold mb-4">Full Friends List</h2>
               {friends.map((friend) => (
                  <div key={friend.id} className="friend-item py-2 bg-[#194564]/60 rounded-md flex justify-between mb-2 px-3 hover:bg-[#194564]/80 transition-colors duration-300">
                    <div className="flex items-center">
                      <img src={avatarMap[friend.avatar] || avatarMap['avatars/Some Bird.svg']} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-medium text-white">{friend.name}</p>
                        <div className="flex items-center mt-0.5">
                          <img src={UserOutline} alt="" className="h-3 w-3 mr-1.5" />
                          <p className="text-white/70 text-xs">+{friend.referralCount} referrals</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="text-white font-medium">{friend.score}</p>
                      <img src={Solis} alt="Solis" className="w-4 h-4 ml-1.5" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={toggleFullList}
                  className="mt-4 bg-white/10 text-white rounded-md py-2 px-4 w-full hover:bg-white/20 transition-colors duration-300 border border-white/30"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-row w-full justify-between px-7 mt-5 text-white">
          <p>Referral Steps</p>
        </div>

        {/* Referral Steps */}
        <div className="w-11/12 px-2 bg-[#194564]/90 mx-auto py-2 rounded-xl flex flex-col">
          <div className="py-2 w-11/12 mx-auto">
            <div className='flex'>
              <div className='bg-[#FAAD00] w-2 h-2 my-auto -ml-2 mr-1 rounded-full'>
              </div>
              <p className='text-left text-white text-sm'>Share your invite links</p>
            </div>
            <p className='text-left ml-1 text-white/50 text-sm'>Your friend joins Helios</p>
          </div>
          <hr className="border-t border-white/30 mx-5"/>
          <div className="py-2 w-11/12 mx-auto">
            <div className='flex'>
              <div className='bg-[#FAAD00] w-2 h-2 my-auto -ml-2 mr-1 rounded-full'>
              </div>
              <div className='flex flex-row'>
                <p className='text-left text-white text-sm'>Your offset rate increases by </p>
                <img src={FreshCoin} alt="SolisCoin" className='w-9 h-9 -mt-1' />
                <p className='font-bold -ml-1 text-white text-yellow-500 text-lg'>10</p>
              </div>
            </div>
            <p className='text-left ml-1 text-white/50 -mt-2 text-sm'>You earn more each hour</p>
          </div>
          <hr className="border-t border-white/30 mx-5" />
          <div className="py-2 w-11/12 mx-auto">
            <div className='flex'>
              <div className='bg-[#FAAD00] w-2 h-2 my-auto -ml-2 mr-1 rounded-full'>
              </div>
              <div className='flex flex-row'>
                <p className='text-left text-white text-sm mr-4'>Your balance increases by </p>
                <img src={FreshCoin} alt="SolisCoin" className='w-9 h-9 -mt-1' />
                <p className='font-bold -ml-1 text-white text-yellow-500 text-lg'>2K</p>
              </div>
            </div>
            <p className='text-left ml-1 text-white/50 -mt-2 text-sm'>You can earn more from tasks</p>
          </div>
        </div>
      </div>

      {/* Fixed invite component */}
      <div className="fixed bottom-0 justify-between flex left-0 right-0 z-20 pb-20 pt-4 bg-gradient-to-t from-[#09161F] to-transparent">
        <button
          className="mx-auto bg-[#DCAA19] rounded-2xl py-4 w-4/6 md:w-5/6 lg:w-1/2 block"
          onClick={toggleShareMenu}
        >
          <span className="text-base md:text-lg lg:text-xl">Invite a friend</span>
        </button>
        <button
          className="mx-auto bg-white rounded-2xl py-4 w-1/6 md:w-5/6 lg:w-1/2 flex justify-center items-center"
          onClick={copyToClipboard}
        >
          <img src={Copy} alt="Copy icon" />
        </button>

      </div>

      {/* Share component */}
      <ShareComponent isShareMenuOpen={isShareMenuOpen} toggleShareMenu={toggleShareMenu} referralLink={referralLink ?? ''}/>
    </div>
  );
};

export default Friends;
