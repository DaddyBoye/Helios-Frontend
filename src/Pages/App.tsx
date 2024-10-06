import ProgressBar from '../Components/ProgressBar';
import mascot from '../images/MascotCircles.svg';
import freshcoin from '../images/FreshCoin.svg';
import Hamster from '../icons/Hamster';
import Popup from '../Components/Popup';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarryBackground from '../Components/StarryBackground';
import { useSpring, animated } from 'react-spring'; // Import useSpring and animated from react-spring
import '../App.css'

interface Airdrop {
  id: number;
  value: number;
  timestamp: string;
}

function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [visibleAirdrops, setVisibleAirdrops] = useState<Airdrop[]>([]);
  const [displayedAirdrops, setDisplayedAirdrops] = useState(0); // State for displayed airdrops
  const [newTotal, setNewTotal] = useState(0); // New total for updates

  const {
    airdrops,
    airdropsError,
    telegramId,
    telegramUsername,
    totalAirdrops,
    progress,
    airdropCount,
    totalValue,
    referralToken,
    minerate,
    updateTotalAirdrops, // Receiving update function
    deleteAllUserAirdrops, // Receiving delete function
  } = useOutletContext<{
    airdrops: Airdrop[];
    airdropsError: string | null;
    telegramId: number | null;
    telegramUsername: string | null;
    totalAirdrops: number;
    progress: number;
    airdropCount: number;
    totalValue: number;
    referralToken: string | null;
    minerate: number | null;
    updateTotalAirdrops: (telegramId: number) => Promise<void>;
    deleteAllUserAirdrops: (telegramId: number) => Promise<void>;
  }>();

  // Animation spring for displayed airdrops
  const { number } = useSpring({
    number: displayedAirdrops,
    from: { number: 0 },
    config: { duration: 1000 }, // Animation duration for smooth transition
  });

  useEffect(() => {
    // Set airdrops to visible state
    setVisibleAirdrops(airdrops);
    setDisplayedAirdrops(totalAirdrops); // Initialize displayed airdrops

    // Update the displayed count gradually when totalAirdrops changes
    if (totalAirdrops !== displayedAirdrops) {
      setNewTotal(totalAirdrops);
      const incrementCount = async () => {
        for (let count = displayedAirdrops + 1; count <= totalAirdrops; count++) {
          setDisplayedAirdrops(count);
          await new Promise(resolve => setTimeout(resolve, 50)); // Delay for smooth count-up
        }
      };
      incrementCount();
    }
  }, [airdrops, totalAirdrops]);

  const handleConfirm = () => {
    claimFunction();
    setPopupVisible(false);
  };

  const handleClose = () => {
    setPopupVisible(false);
  };

  // Function to remove airdrops one by one with a delay
  const removeAirdropsWithDelay = async () => {
    const delay = 300; // Delay between removing each airdrop
    for (let i = 0; i < visibleAirdrops.length; i++) {
      const airdropToRemove = visibleAirdrops[i];
      await new Promise(resolve => setTimeout(resolve, delay));
      setVisibleAirdrops((prevAirdrops) =>
        prevAirdrops.filter((airdrop) => airdrop.id !== airdropToRemove.id)
      );
    }
  };

  const claimFunction = async () => {
    try {
      if (telegramId) {
        await updateTotalAirdrops(telegramId); // Assuming this updates totals
        await removeAirdropsWithDelay(); // Remove airdrops one by one
        await deleteAllUserAirdrops(telegramId); // Adjust this to remove airdrop from the backend if needed
      }
    } catch (error) {
      console.error('Error during claim process:', error);
    }
  };

  return (
    <div className="relative flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20]">
      <StarryBackground />
      <div className="relative flex items-center">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className='text-center z-10 pt-10 font-bold text-[#DCAA19] font-sans text-2xl'>
            {telegramUsername}
            <p className='hidden'>{referralToken}</p>
          </h1>
        </div>
        <div className="ml-auto">
          <img src={mascot} alt="Mascot Circle" className='w-24 h-24 z-10 object-contain' />
        </div>
      </div>
      <div className='flex flex-row mb-10 z-10 items-center justify-center'>
        <img src={freshcoin} alt="" className='w-12 pr-0.5 h-12' />
        <p className='my-auto text-white font-bold text-4xl'>
          <animated.span>{number.to(n => Math.floor(n))}</animated.span> {/* Display animated count */} 
        </p>
      </div>
      <div className='bg-white/20 border-solid border-2 border-[#B4CADA] backdrop-blur-md rounded-2xl mb-[-20px] z-20 pb-6 rounded-2xl justify-center mx-auto z-10 w-11/12'>
        <div className='flex flex-row pl-7 pr-6 pt-3 justify-between'>
          <div className='flex flex-col'>
            <p className='font-bold text-lg'>Mining Rate</p>
            <div className='flex flex-row'>
              <img src={freshcoin} alt="" className='w-5 my-auto pr-0.5 h-5' />
              <p className='text-md'>{minerate}/hr</p>
            </div>
            <p className='font-bold text-sm'>Current Airdrop Round</p>
          </div>
          <div className='my-auto pl-8'>
            <button onClick={() => setPopupVisible(true)} className="bg-yellow-500 p-2 pl-4 pr-4 rounded-lg">Claim</button>
          </div>
          <p className='hidden'>{airdropsError}</p>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className='bg-[#D9D9D9] min-h-80 overflow-auto pb-20 text-white rounded-3xl z-10 w-full'>
        <p className='text-sm font-bold text-black pl-8 pt-5'>Unclaimed Airdrops</p>
        <div className='flex flex-col items-center justify-center'>
          {visibleAirdrops.length > 0 ? (
            <ul className='flex flex-col w-full items-center justify-center'>
              {visibleAirdrops.map((airdrop) => (
                <li
                  key={airdrop.id}
                  className={`bg-gradient-to-r from-[#40659C] to-[#162336] justify-left mb-2 flex flex-row rounded-2xl w-11/12 h-14 pl-4 text-sm my-auto slide-in`}>
                  <Hamster className="w-6 h-6 mr-3 my-auto" />
                  <div className="flex my-auto text-sm mr-2 flex-col">Mining Complete</div>
                  <img src={freshcoin} className="my-auto mr-1 w-4 h-4" />
                  <div className="text-sm mr-2 my-auto">{airdrop.value}</div>
                  <div className="my-auto">{new Date(airdrop.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                </li>
              ))}

            </ul>
          ) : (
            <p className='text-black font-bold pt-20'>No Unclaimed Airdrops</p>
          )}
        </div>
        <p className='hidden'>{newTotal}</p>
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
