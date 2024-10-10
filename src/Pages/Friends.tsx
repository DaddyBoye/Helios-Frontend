import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ShareComponent from '../Components/ShareComponent';
import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import User from '../images/edeef 1 (1).svg';
import UserOutline from '../icons/Users Outline.svg';
import Solis from '../images/Solisss.svg';
import DarkSolis from '../images/Solisss.svg';
import Copy from '../icons/Group 107.svg'

interface FriendsProps {
  toggleTaskbar: (isVisible: boolean) => void;
}

interface Friend {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

const Friends: React.FC = () => {
  const { toggleTaskbar } = useOutletContext<FriendsProps>();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const baseUrl = "https://t.me/HeeliossBot?start=";
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: 'iam_goddy', score: 132256, avatar: User },
    { id: 2, name: 'john_doe', score: 125000, avatar: User },
    { id: 3, name: 'jane_smith', score: 120000, avatar: User },
  ]);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      if (userData) {
        setTelegramId(userData.id);
      }
    }
  }, []);

  useEffect(() => {
    if (!telegramId) return;

    const fetchReferralToken = async () => {
      try {
        const response = await axios.get(`https://server.therotrade.tech/api/user/referral-token/${telegramId}`);
        const referralToken = response.data.referralToken;
        setReferralLink(`${baseUrl}${encodeURIComponent(referralToken)}`);
      } catch (error) {
        console.error('Error fetching referral token:', error);
      }
    };

    fetchReferralToken();
  }, [telegramId]);

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          // Vibrate the device for a short duration (e.g., 100ms)
          if (navigator.vibrate) {
            navigator.vibrate(100); // Adjust the duration as needed
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

  const friendsContainerRef = useRef<HTMLDivElement>(null); // Reference to the list container
  const [scrollPosition, setScrollPosition] = useState(0); // Current scroll position
  const itemHeight = 64; // Define the height of each friend item
  const [scrollCount, setScrollCount] = useState(0); // Keep track of how many scrolls have happened

  useEffect(() => {
    const interval = setInterval(() => {
      // Move the scroll position up by one item height
      setScrollPosition((prevPosition) => prevPosition + itemHeight);
      setScrollCount((prevCount) => prevCount + 1);

      // Duplicate friends at the end after each movement
      setFriends((prevFriends) => {
        const newFriends = [...prevFriends, ...prevFriends.slice(0, 3)]; // Add 3 duplicates at a time
        return newFriends;
      });
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [scrollCount, itemHeight]);

  const toggleShareMenu = () => {
    setIsShareMenuOpen((prev) => !prev);
    toggleTaskbar(isShareMenuOpen);
  };

  return (
    <div className="relative flex flex-col font-sans h-full overflow-y-auto bg-transparent">
      <StarryBackground />
      <div className="z-10 w-full h-full text-center bg-transparent pb-36">
      {alertMessage && (
        <div className="mb-4 mt-4 pl-2 z-20 text-sm p-0 text-white w-11/12 h-7 text-center rounded-md fixed flex flex-row items-center bg-[#000000]/50 top-4 left-1/2 transform -translate-x-1/2">
          <img src={DarkSolis} alt="" className="w-7 h-7 animate-spinZoomGlow" />
          <p className='pl-2 my-auto'>{alertMessage}</p>
        </div>
          )}
        {/* Card with profile */}
        <div className="bg-white/10 border-solid flex flex-col mx-auto mt-4 border-2 border-[#B4CADA] backdrop-blur-md rounded-xl w-11/12">
          <div className="mx-auto bg-red-200 mt-2 mb-2 rounded-full h-28 w-28 flex justify-center items-center">
            <img src={User} alt="" className="w-16 h-16" />
          </div>
          <p className="text-white font-bold text-xl">Your Helios Username</p>
          <div className="mx-auto justify-between mt-2 w-6/12 px-2 bg-white/20 backdrop-blur-md rounded-2xl flex flex-row">
            <div className="flex flex-row">
              <img src={Solis} className="w-7 h-7" />
              <p className="my-auto font-bold text-white">10</p>
            </div>
            <div className="flex flex-row">
              <img src={Solis} className="w-7 h-7" />
              <p className="my-auto font-bold text-white">10</p>
            </div>
            <div className="flex flex-row">
              <img src={Solis} className="w-7 h-7" />
              <p className="my-auto font-bold text-white">10</p>
            </div>
          </div>
          <div className="flex flex-row justify-between px-4 pb-4 pt-4 items-center w-full">
            <div className="bg-[#475c6d] rounded-lg">
              <img src={Solis} className="w-10" />
            </div>
            <div className="bg-[#608FB0] rounded-lg">
              <img src={Solis} className="w-10" />
            </div>
            <div className="bg-[#FAAD00] rounded-lg">
              <img src={Solis} className="w-10" />
            </div>
            <div className="bg-[#185C8D] rounded-lg">
              <img src={Solis} className="w-10" />
            </div>
            <div className="bg-[#17334D] rounded-lg">
              <img src={Solis} className="w-10" />
            </div>
          </div>
        </div>

        {/* Friends List */}
        <div className="flex flex-row w-full justify-between px-7 pt-4 text-white">
          <p>Friends(2)</p>
          <p>Full List</p>
        </div>

        {/* Friend items container */}
        <div className="w-11/12 mx-auto h-48 border py-1.5 rounded-lg border-[#FAAD00] overflow-hidden">
          <div
            ref={friendsContainerRef}
            className={`transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateY(-${scrollPosition}px)`,
            }}
          >
            {friends.map((friend, index) => (
              <div
                key={`${friend.id}-${index}`}
                className="friend-item py-1 bg-[#194564]/80 w-11/12 mx-auto rounded-lg flex justify-between mb-2"
              >
                <div className="flex">
                  <div className="mx-auto bg-red-200 mt-1 mb-1 ml-2 rounded-full h-10 w-10 flex justify-center items-center">
                    <img src={friend.avatar} alt={friend.name} className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col h-9 text-left my-auto pl-3">
                    <p className="font-medium text-white text-sm">{friend.name}</p>
                    <div className="flex items-center flex-row">
                      <img src={UserOutline} alt="" className="h-4 w-4"/>
                      <p className="text-white/50 my-auto pt-0.5 text-sm">+15</p>
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
            <p className='text-left ml-1 text-white/50 text-sm'>Get a free play pass for each friend</p>
          </div>
          <hr className="border-t border-white/30 mx-5"/>
          <div className="py-2 w-11/12 mx-auto">
            <div className='flex'>
              <div className='bg-[#FAAD00] w-2 h-2 my-auto -ml-2 mr-1 rounded-full'>
              </div>
              <p className='text-left text-white text-sm'>Your friend joins Helios </p>
            </div>
            <p className='text-left ml-1 text-white/50 text-sm'>And starts farming</p>
          </div>
          <hr className="border-t border-white/30 mx-5" />
          <div className="py-2 w-11/12 mx-auto">
            <div className='flex'>
              <div className='bg-[#FAAD00] w-2 h-2 my-auto -ml-2 mr-1 rounded-full'>
              </div>
              <p className='text-left text-white text-sm'>Score 10% from buddies</p>
            </div>
            <p className='text-left ml-1 text-white/50 text-sm'>Plus an extra 2.5% from their referrals</p>
          </div>
        </div>
      </div>

      {/* Fixed invite component */}
      <div className="fixed bottom-14 justify-between flex left-0 right-0 z-20 pb-4 pt-4 bg-gradient-to-t from-[#09161F] to-transparent">
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
