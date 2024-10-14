import ProgressBar from '../Components/ProgressBar';
import Solis from '../images/Solisss.svg';
import Friends from '../icons/Friends Vector.svg';
import User from '../icons/edeef 1.svg';
import freshcoin from '../images/Group 9.svg';
import Popup from '../Components/Popup';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarryBackground from '../Components/StarryBackground';
import { useSpring, animated } from 'react-spring';
import '../App.css';

interface Airdrop {
  id: number;
  value: number;
  timestamp: string;
  removing: boolean;
  adding: boolean;
}

interface Friend {
  id: number;
  name: string;
  score: number;
  avatar: string;
  referralCount: number;
}

function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [airdropsFromParent, setAirdropsFromParent] = useState<Airdrop[]>([]); // Stores airdrops passed from parent
  const [visibleAirdrops, setVisibleAirdrops] = useState<Airdrop[]>([]); // Visible airdrops in the UI
  const [claimInitiated, setClaimInitiated] = useState(false); 
  const [isRemoving, setIsRemoving] = useState(false);

  const {
    airdrops,
    airdropsError,
    telegramId,
    heliosUsername,
    totalAirdrops,
    progress,
    friends,
    airdropCount,
    totalValue,
    referralToken,
    minerate,
    updateTotalAirdrops,
    deleteAllUserAirdrops,
  } = useOutletContext<{
    airdrops: Airdrop[];
    airdropsError: string | null;
    telegramId: number | null;
    heliosUsername: string | null;
    totalAirdrops: number;
    progress: number;
    friends: Friend[];
    airdropCount: number;
    totalValue: number;
    referralToken: string | null;
    minerate: number | null;
    updateTotalAirdrops: (telegramId: number) => Promise<void>;
    deleteAllUserAirdrops: (telegramId: number) => Promise<void>;
  }>();

  const { number } = useSpring({
    number: totalAirdrops,
    from: { number: claimInitiated ? 0 : totalAirdrops },
    config: { duration: 500 },
  });

  useEffect(() => {
    if (!isRemoving) {
      // Filter out airdrops that are already visible or processed
      const newAirdrops = airdrops.filter(
        (airdrop) => !airdropsFromParent.some((existing) => existing.id === airdrop.id)
      );
  
      if (newAirdrops.length > 0) {
        // Sort new airdrops by timestamp (earliest to latest)
        const sortedAirdrops = [...newAirdrops].sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
  
        // Add sorted airdrops to the visible list one by one with a delay
        addAirdropsInOrder(sortedAirdrops);
      }
    }
  }, [airdrops, isRemoving, airdropsFromParent]);
  
  const addAirdropsInOrder = async (airdropsToAdd: Airdrop[]) => {
    for (const airdrop of airdropsToAdd) {
      // Check if the airdrop already exists in the visible list (avoid duplicates)
      setVisibleAirdrops((prevAirdrops) => {
        if (prevAirdrops.some(existing => existing.id === airdrop.id)) {
          return prevAirdrops; // Skip if it's already visible
        }
        
        // Add the airdrop to the visible list with "adding" animation state
        return [
          ...prevAirdrops,
          { ...airdrop, adding: true, removing: false },
        ];
      });
  
      // Update the local state tracking airdrops from the parent
      setAirdropsFromParent((prev) => [...prev, airdrop]);
  
      // Wait before showing the next airdrop
      await new Promise((resolve) => setTimeout(resolve, 600)); // Adjust delay as needed
  
      // Reset 'adding' state for the current airdrop
      setVisibleAirdrops((prevAirdrops) =>
        prevAirdrops.map((a) =>
          a.id === airdrop.id ? { ...a, adding: false } : a
        )
      );
    }
  };  

  const handleConfirm = () => {
    claimFunction();
    setPopupVisible(false);
  };

  const handleClose = () => {
    setPopupVisible(false);
  };

  const slideOutDuration = 250; // Duration of the slide-out animation for each airdrop (in ms)
  const slideOutOverlap = 125;   // Overlap delay before starting the next airdrop (in ms)
  
  const removeAirdrop = async (airdrop: Airdrop) => {
    // Set the removing state for the selected airdrop
    setVisibleAirdrops(prevAirdrops =>
      prevAirdrops.map(item =>
        item.id === airdrop.id ? { ...item, removing: true } : item
      )
    );
  
    // Wait for the animation to progress for the current airdrop (but not fully complete)
    await new Promise(resolve => setTimeout(resolve, slideOutOverlap)); // Overlap with the next airdrop
  };
  
  const removeAirdropsWithDelay = async () => {
    setIsRemoving(true);
  
    // Loop through visible airdrops and start sliding them out with overlap
    for (const airdrop of visibleAirdrops) {
      removeAirdrop(airdrop); // Slide out each airdrop, but don't wait for the full completion
  
      // Wait for the overlap duration before triggering the next airdrop
      await new Promise(resolve => setTimeout(resolve, slideOutDuration - slideOutOverlap));
    }
  
    // Clear the visibleAirdrops array after all animations
    setVisibleAirdrops([]);
  
    // After all airdrops have slid out, call the API to delete all airdrops
    if (telegramId) {
      await deleteAllUserAirdrops(telegramId);
    }
  
    setIsRemoving(false);
  };
  

  const claimFunction = async () => {
    try {
      if (telegramId) {
        await updateTotalAirdrops(telegramId);
        await removeAirdropsWithDelay();
        setClaimInitiated(true);
      }
    } catch (error) {
      console.error('Error during claim process:', error);
    }
  };

  const hasAirdropsToClaim = visibleAirdrops.length > 0;

  return (
    <div className="relative flex flex-col font-sans h-screen ">
      <StarryBackground />
      <div className="relative flex items-center">
      <div className='flex flex-row items-center justify-between w-full mt-4 m-2 bg-[#185C8D]/50 h-12 p-1 pl-2 rounded-lg'>
            <div className='flex flex-row items-center justify-center'>
                <img src={Solis} alt="Solis" className="w-8 h-8 animate-spinZoomGlow" />
                <p className='text-base ml-1 text-white'>Home</p>
            </div>
            <div className="relative flex my-auto h-6">
                <div className="flex flex-row items-center justify-between gap-3 rounded-full pl-3 pr-14 py-0.5 bg-[#185C8D]/80">
                    <div className="flex flex-row items-center">
                        <img src={Solis} alt="Solis" className="w-6 h-6" />
                        <p className="ml-1 text-xs">{minerate}</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <img src={Friends} alt="Friends" className="w-6 h-6" />
                        <p className="ml-1 text-xs">{friends.length}</p>
                    </div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FFD700] mr-1 rounded-full p-0.5 flex items-center justify-center">
                    <img src={User} alt="User" className="w-8 h-8 rounded-full object-cover" />
                </div>
            </div>
        </div>
      </div>
      <div className="z-10 mt-2">
          <h1 className="text-center h-8 z-10 font-bold text-[#DCAA19] font-sans text-2xl">
          {heliosUsername}
            <p className="hidden">{referralToken}</p>
          </h1>
        </div>
      <div className="flex flex-row mb-8 z-10 items-center justify-center">
        <img src={freshcoin} alt="" className="w-12 pr-0.5 h-12" />
        <p className="my-auto text-white font-bold text-4xl">
          {claimInitiated ? (
            <animated.span>{number.to((n) => Math.floor(n))}</animated.span>
          ) : (
            totalAirdrops
          )}
        </p>
      </div>
      <div className="bg-white/20 border-solid border-2 border-[#B4CADA] backdrop-blur-md rounded-2xl mb-[-20px] z-20 pb-6 rounded-2xl justify-center mx-auto z-10 w-11/12">
        <div className="flex flex-row pl-7 pr-6 pt-3 justify-between">
          <div className="flex flex-col">
            <p className="font-bold text-lg">Mining Rate</p>
            <div className="flex flex-row">
              <img src={freshcoin} alt="" className="w-5 my-auto pr-0.5 h-5" />
              <p className="text-md">{minerate}/hr</p>
            </div>
            <p className="font-bold text-sm">Current Airdrop Round</p>
          </div>
          <div className="my-auto pl-8">
          <button
              onClick={() => setPopupVisible(true)}
              className={`bg-yellow-500 p-2 pl-4 pr-4 rounded-lg ${
                hasAirdropsToClaim ? 'claim-button-animation' : ''
              }`}
            >
              Claim
            </button>
          </div>
          <p className="hidden">{airdropsError}</p>
        </div>
        <ProgressBar progress={progress} />
      </div>
      {/* Make this container grow to take up remaining space */}
      <div className="flex-grow bg-[#D9D9D9] min-h-80 overflow-auto pb-20 text-white rounded-3xl z-10 w-full">
        <p className="text-sm font-bold text-black pl-8 pt-5">
          Unclaimed Airdrops
        </p>
        <div className="flex flex-col items-center justify-center">
          {visibleAirdrops.length > 0 ? (
            <ul className="flex flex-col w-full items-center justify-center">
              {visibleAirdrops.map((airdrop) => (
                <animated.li
                  key={airdrop.id}
                  style={{
                    transform: airdrop.adding
                      ? "translateX(-200%)" // Slide in from left
                      : airdrop.removing
                      ? "translateX(200%)" // Slide out to right
                      : "translateX(0)", // Remain in place
                    transition: "transform 0.5s ease",
                  }}
                  className="bg-gradient-to-r from-[#40659C] to-[#162336] justify-left mb-2 flex flex-row rounded-2xl w-11/12 h-14 pl-4 text-sm my-auto"
                >
                  <img src={Solis} className="w-10 h-10 mr-3 my-auto" />
                  <div className="flex my-auto text-sm mr-2 flex-col">Mining Complete</div>
                  <img src={freshcoin} className="my-auto mr-1 w-4 h-4" />
                  <div className="text-sm mr-2 my-auto">{airdrop.value}</div>
                  <div className="my-auto">
                    {new Date(airdrop.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </div>
                </animated.li>
              ))}
            </ul>
          ) : (
            <p className="text-sm pt-28 font-bold text-gray-700">No unclaimed airdrops available</p>
          )}
        </div>
      </div>
      {popupVisible && (
        <Popup
          airdropCount={airdropCount}
          totalValue={totalValue}
          onConfirm={handleConfirm}
          onClose={handleClose}
          progress={progress}
        />
      )}
    </div>
  );
  
}

export default App;
