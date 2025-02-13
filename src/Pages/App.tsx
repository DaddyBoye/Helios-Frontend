import ProgressBar from '../Components/ProgressBar';
import Solis from '../icons/Solis-raw2.svg';
import freshcoin from '../icons/Solis-coin.svg';
import Popup from '../Components/Popup';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarryBackground from '../Components/StarryBackground';
import Header from '../Components/Header';
import { useSpring, animated } from 'react-spring';
import MaxAirdropAlert from '../Components/MaxAirdropAlert';
import InfoModal from "../Components/InfoModal";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [airdropsFromParent, setAirdropsFromParent] = useState<Airdrop[]>([]); // Stores airdrops passed from parent
  const [visibleAirdrops, setVisibleAirdrops] = useState<Airdrop[]>([]); // Visible airdrops in the UI
  const [claimInitiated, setClaimInitiated] = useState(false); 
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMaxAlertVisible, setIsMaxAlertVisible] = useState(true);

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
    avatarPath,
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
    avatarPath: string | null;
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

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
        setClaimInitiated(true); // Start the animation
        await updateTotalAirdrops(telegramId);
        await removeAirdropsWithDelay();
        setClaimInitiated(false); // End the animation
      }
    } catch (error) {
      console.error('Error during claim process:', error);
    }
  };

  const hasAirdropsToClaim = visibleAirdrops.length > 0;

  return (
    <div className="relative flex flex-col font-sans overflow-hidden h-screen ">
      <StarryBackground />
      <div className="relative flex items-center">
      <Header
          minerate={minerate}
          friendsCount={friends.length}
          avatarPath={avatarPath}
      />
      </div>
      <div className="z-10 mt-20">
          <h1 className="text-center h-8 z-10 font-bold text-[#DCAA19] font-sans text-2xl">
          {heliosUsername}
            <p className="hidden">{referralToken}</p>
          </h1>
        </div>
      <div className="flex -ml-6 flex-row mb-2 z-10 items-center justify-center">
        <img src={freshcoin} alt="" className=" -mr-2 h-20" />
        <p className="my-auto text-white font-bold text-4xl">
          {claimInitiated ? (
            <animated.span>{number.to((n) => Math.floor(n))}</animated.span>
          ) : (
            totalAirdrops 
          )}
        </p>
      </div>
      <div className="bg-white/20 border-solid border-2 border-[#B4CADA] backdrop-blur-md mb-[-20px] z-20 pb-6 rounded-2xl justify-center mx-auto w-11/12">
        <div className="flex flex-row pl-7 pr-6 pt-3 justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <p className="font-bold -ml-1 text-lg">Offset Rate</p>
              <p 
                onClick={handleOpenModal}
                className='text-yellow-500 text-sm ml-2'
                >
                  Boost
              </p>
              <button
                onClick={handleOpenModal}
                className=" rounded-full border-2 items-center border-yellow-500 w-4 h-4 ml-1" 
                >
                <p className="text-yellow-500 text-xs" >?</p>
              </button>
            </div>
            <div className="flex flex-row">
              <img src={freshcoin} alt="" className="w-9 my-auto h-9" />
              <p className="text-md -ml-1.5 my-auto">{minerate}/hr</p>
            </div>
            <p className="font-bold text-sm">Current Offset Round</p>
          </div>
          <div className="my-auto ">
          <button
              onClick={() => setPopupVisible(true)}
              className={`bg-yellow-500 p-2 px-5 rounded-lg ${
                hasAirdropsToClaim ? 'claim-button-animation' : ''
              }`}
            >
              Reap
            </button>
          </div>
          <p className="hidden">{airdropsError}</p>
        </div>
        <ProgressBar
          progress={progress ?? 0}
          minerate={minerate ?? 0}
          airdropCount={airdropCount ?? 0}
          togglePopup={() => setPopupVisible(true)} // Passing the function
        />
      </div>
      {/* Make this container grow to take up remaining space */}
      <div className="flex-grow bg-[#D9D9D9] min-h-80 overflow-auto pb-36 text-white rounded-3xl z-10 w-full">
        <p className="text-sm font-bold text-black pl-8 pt-5">
          Available Offsets
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
                  <div className="flex my-auto text-sm mr-2 flex-col">Offset Complete</div>
                  <img src={freshcoin} className="my-auto mr-1 w-10 h-10" />
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
            <p className="text-sm pt-20 font-bold text-gray-700">No unreaped offsets available</p>
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
      {isMaxAlertVisible && visibleAirdrops.length >= 0 && (
        <MaxAirdropAlert 
          airdropCount={visibleAirdrops.length}
          onClose={() => setIsMaxAlertVisible(false)}
        />
      )}
      {/* Info Modal */}
      <InfoModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
  
}

export default App;
