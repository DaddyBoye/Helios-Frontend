import '../App.css';
import ProgressBar from '../Components/ProgressBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../images/Starryy.svg';
import mascot from '../images/MascotCircles.svg';
import freshcoin from '../images/FreshCoin.svg';
import Hamster from '../icons/Hamster';
import UserProfile from '../Components/UserProfile';
import Popup from '../Components/Popup';
import { io } from 'socket.io-client';
import LoadingPage from './LoadingPage';

interface Airdrop {
  id: number;
  value: number;
  timestamp: string;
}

interface AppProps {
  toggleTaskbar: (isVisible: boolean) => void; // Add toggleTaskbar prop
}

function App({ toggleTaskbar }: AppProps) {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [airdropsError, setAirdropsError] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [totalAirdrops, setTotalAirdrops] = useState<number>(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [airdropCount, setAirdropCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [minerate, setMinerate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('referralToken');
      if (token) {
          alert(`Referral Token: ${token}`);
          setReferralToken(token); // Set referral token in state
      }
  }, []);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('https://server.therotrade.tech'); // Adjust URL to match your server

    // Listen for progress updates from the server
    socket.on('progressUpdate', (newProgress) => {
      setProgress(newProgress); // Update the state with the new progress
    });

    // Cleanup when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (telegramId) {
      fetchAllData(telegramId);
    }
  }, [telegramId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const userData = tg.initDataUnsafe.user;
      if (userData) {
        setTelegramId(userData.id);
        setTelegramUsername(userData.username);
      } else {
        console.error('No user data available');
      }
    } else {
      console.error('This app should be opened in Telegram');
    }
  }, []);

  const fetchAllData = async (telegramId: number) => {
    try {
      await Promise.all([
        fetchAirdropCount(telegramId),
        fetchTotalValue(telegramId),
        fetchUserAirdrops(telegramId),
        fetchTotalAirdrops(telegramId),
        fetchUserMinerate(telegramId),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUserMinerate = async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/users/minerate/${telegramId}`);
      setMinerate(response.data.minerate);
    } catch (error) {
      console.error('Error fetching minerate:', error);
    }
  };

  const fetchAirdropCount = async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/airdrops/count/${telegramId}`);
      setAirdropCount(response.data.count);
    } catch (error) {
      console.error('Error fetching airdrop count:', error);
    }
  };

  const fetchTotalValue = async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/airdrops/sum/${telegramId}`);
      setTotalValue(response.data.totalValue);
    } catch (error) {
      console.error('Error fetching total airdrop value:', error);
    }
  };

  const handleConfirm = () => {
    claimFunction();
    setPopupVisible(false);
  };

  const handleClose = () => {
    setPopupVisible(false);
  };

  const fetchUserAirdrops = async (telegramId: number) => {
    setAirdropsError(null);
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/airdrops/${telegramId}`);
      setAirdrops(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setAirdropsError(`Error: ${error.response.data.message}`);
      } else {
        setAirdropsError('An unknown error occurred while fetching airdrops');
      }
    }
  };

  const fetchTotalAirdrops = async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/airdrops/total/${telegramId}`);
      setTotalAirdrops(response.data.totalAirdrops);
    } catch (error) {
      console.error('Error fetching total airdrops:', error);
    }
  };

  const updateTotalAirdrops = async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/airdrops/sum/update/${telegramId}`);
      console.log('Updated Total Airdrops:', response.data.newTotalAirdrops);
      return response.data; // Return data if needed for further use
    } catch (error) {
      console.error('Error updating total airdrops:', error);
      throw error; // Rethrow error for handling in the calling function
    }
  };

  const deleteAllUserAirdrops = async (telegramId: number) => {
    try {
      const response = await axios.delete(`https://server.therotrade.tech/api/airdrops/delete/${telegramId}`);
      setMessage(response.data.message);
      await fetchUserAirdrops(telegramId);
    } catch (error) {
      console.error('Error deleting airdrops:', error);
    }
  };

  const claimFunction = async () => {
    try {
      await updateTotalAirdrops(telegramId as number);
      await deleteAllUserAirdrops(telegramId as number);
    } catch (error) {
      console.error('Error during claim process:', error);
    }
  };

  useEffect(() => {
    if (telegramId !== null) {
      const intervalId = setInterval(() => {
        fetchAllData(telegramId);
      }, 1000);

      return () => clearInterval(intervalId); // Clear interval when component unmounts
    }
  }, [telegramId]);

  // Effect to manage loading logic
  useEffect(() => {
    const minLoadingTime = 3000; // Minimum loading time
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Stop loading after the defined time
    }, minLoadingTime);

    return () => clearTimeout(loadingTimeout); // Cleanup the timeout on unmount
  }, []); // Only run once on mount

  // Effect to manage taskbar visibility based on loading state
  useEffect(() => {
    if (isLoading) {
      toggleTaskbar(false); // Hide taskbar while loading
    } else {
      toggleTaskbar(true); // Show taskbar when loading is complete
    }
  }, [isLoading, toggleTaskbar]); // Dependencies include isLoading

  if (isLoading) {
    return <LoadingPage />; // Show loading page while loading
  }

  return (
    <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20]">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="relative flex items-center">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className='text-center z-10 pt-10 font-bold text-[#DCAA19] font-sans text-2xl'>
            {telegramUsername}
            <p className='hidden'>{referralToken}</p>
          </h1>
          <UserProfile/>
        </div>
        <div className="ml-auto">
          <img src={mascot} alt="Mascot Circle" className='w-24 h-24 z-10 object-contain' />
        </div>
      </div>
      <div className='flex flex-row mb-10 z-10 items-center justify-center'>
        <img src={freshcoin} alt="" className='w-12 pr-0.5 h-12' />
        <p className='my-auto text-white font-bold text-4xl'>{totalAirdrops}</p>
      </div>
      <div className='bg-white/20 border-solid border-2 border-[#B4CADA] backdrop-blur-md rounded-2xl mb-[-20px] z-20 pb-6 rounded-2xl justify-center mx-auto z-10 w-11/12'>
        <div className='flex flex-row pl-7 pr-6 pt-3 justify-between'>
          <div className='flex flex-col'>
            <p className='font-bold text-lg'>Mining Rate</p>
            <div className='flex flex-row'>
              <img src={freshcoin} alt="" className='w-5 my-auto pr-0.5 h-5' />
              <p className='text-md'>{minerate}/hr</p>
            </div>
            <p className='font-bold text-sm'>Current Airdrop</p>
          </div>
          <div className='my-auto pl-8'>
            <button onClick={() => setPopupVisible(true)} className="bg-yellow-500 p-2 pl-4 pr-4 rounded-lg">Claim</button>
          </div>
          <p className='hidden'>{message}</p>
          <p className='hidden'>{airdropsError}</p>
        </div>
        <ProgressBar
          progress={progress}
         />
      </div>

      <div className='bg-[#D9D9D9] min-h-80 overflow-auto pb-20 text-white rounded-3xl z-10 w-full'>
        <p className='text-sm font-bold text-black pl-8 pt-5'>Unclaimed Airdrops</p>
        <div className='flex flex-col items-center justify-center'>
          {airdrops.length > 0 ? (
            <ul className='flex flex-col w-full items-center justify-center'>
              {airdrops.map((airdrop) => (
                <li key={airdrop.id} className="bg-gradient-to-r from-[#40659C] to-[#162336] justify-left mb-2 flex flex-row rounded-2xl w-11/12 h-14 pl-4 text-sm my-auto">
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
