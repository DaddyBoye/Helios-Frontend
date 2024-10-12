import { useEffect, useState } from 'react'; 
import { Outlet } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
import Taskbar from '../Components/Taskbar';
import axios from 'axios';
import { io } from 'socket.io-client';
import moment from 'moment-timezone';
import { createUser } from '../utils/api';

interface Airdrop {
  id: number;
  value: number;
  timestamp: string;
}

interface User {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  referralToken?: string | null;
}

const Layout = () => {
  const [newUser, setNewUser] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTaskbarVisible, setIsTaskbarVisible] = useState(true);
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [airdropsError, setAirdropsError] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null);
  const [totalAirdrops, setTotalAirdrops] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [airdropCount, setAirdropCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [minerate, setMinerate] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingTimePassed, setLoadingTimePassed] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const checkUserExists = async (telegramId: number) => {
    try {
        const response = await axios.get(`https://server.therotrade.tech/api/user/exists/${telegramId}`);
        console.log('User existence response:', response.data);
        setNewUser(!response.data.exists); // Set to true if the user does not exist
    } catch (error) {
        console.error('Error checking user existence:', error);
        setError('Failed to check user existence');
    }
};

  // Ensure at least 4 seconds of loading time
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoadingTimePassed(true);
    }, 4000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Fetch referral token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('referralToken');
    if (token) {
      setReferralToken(token);
    }
  }, []);

  useEffect(() => {
    const socket = io('https://server.therotrade.tech');
    socket.on('progressUpdate', (newProgress) => {
      setProgress(newProgress);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
        // Ensure the code runs in the correct environment
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();

            const userData = tg.initDataUnsafe.user;

            if (userData) {
                // Step 1: Set the Telegram ID and Username
                setTelegramId(userData.id);
                setTelegramUsername(userData.username);

                // Step 2: Check if the user exists in the database
                if (userData.id) {
                    console.log("Checking existence for telegramId:", userData.id); // Log telegramId
                    await checkUserExists(userData.id); // Check if user exists

                    // Step 3: Wait for the referral token after confirming user existence
                    const tokenAvailable = await waitForReferralToken();

                    // Step 4: Get the user's timezone
                    const timezone = getUserTimezone();

                    // Step 5: Handle user creation
                    await handleUserCreation(userData, tokenAvailable, timezone);
                } else {
                    console.error('Telegram ID is not available');
                }
            } else {
                setError('No user data available');
            }
        } else {
            console.error('This app should be opened in Telegram');
        }
    };

    fetchUserData();
}, [referralToken]);


  const getUserTimezone = () => {
    const timezone = moment.tz.guess();
    return timezone;
  };

  const waitForReferralToken = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (referralToken) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        resolve(false);
      }, 3000); // Max wait time
    });
  };

  const handleUserCreation = async (userData: any, tokenAvailable: boolean, timezone: string) => {
    try {
      const createdUser = await createUser({
        telegramId: userData.id,
        telegramUsername: userData.username,
        firstName: userData.first_name,
        lastName: userData.last_name,
        referralToken: tokenAvailable ? referralToken : null,
        timezone,
      });

      setUser(createdUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      // Only set loading to false if both conditions are met
      if (loadingTimePassed) {
        setIsLoading(false);
      }
    }
  };

  // Trigger when user is created successfully and after 4 seconds
  useEffect(() => {
    if (loadingTimePassed ) {
      setIsLoading(false);
    }
  }, [loadingTimePassed, user, dataFetched]);


  useEffect(() => {
    if (!telegramId) return;

    const intervalId = setInterval(() => {
      fetchAllData(telegramId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [telegramId]);

  const fetchAllData = async (telegramId: number) => {
    try {
      await Promise.all([
        fetchAirdropCount(telegramId),
        fetchTotalValue(telegramId),
        fetchUserAirdrops(telegramId),
        fetchTotalAirdrops(telegramId),
        fetchUserMinerate(telegramId),
      ]);
      setDataFetched(true); // Mark that data fetching is complete
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
      return response.data;
    } catch (error) {
      console.error('Error updating total airdrops:', error);
      throw error;
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

  const handleToggleTaskbar = (isVisible: boolean) => {
    setIsTaskbarVisible(isVisible);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {isTaskbarVisible && <Taskbar />}
      <Outlet
        context={{
          toggleTaskbar: handleToggleTaskbar,
          airdrops,
          airdropsError,
          telegramId,
          telegramUsername,
          totalAirdrops,
          progress,
          newUser,
          airdropCount,
          totalValue,
          referralToken,
          minerate,
          updateTotalAirdrops,
          deleteAllUserAirdrops
        }}
      />
      <p className='hidden'>{message}</p>
      <div className='hidden'>
            <h1>Welcome, {user?.firstName}!</h1>
        </div>
        <div className="error hidden">{error}</div>
        && user && dataFetched
    </>
  );
};

export default Layout;
