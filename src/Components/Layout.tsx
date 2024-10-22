import { useEffect, useState, useCallback } from 'react'; 
import { Outlet } from 'react-router-dom'; 
import LoadingPage from '../Pages/LoadingPage'; 
import Taskbar from '../Components/Taskbar'; 
import axios from 'axios'; 
import { io } from 'socket.io-client'; 
import moment from 'moment-timezone'; 
import { createUser } from '../utils/api'; 
import SetHeliosUsername from '../Pages/SetHeliosUsername'; 
import WelcomePage from '../Pages/WelcomePage'; 
import WelcomePopup from '../Components/WelcomePopup';

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
  avatarPath?: string;  // Add avatar path to user data 
}

interface Friend {
  id: number;
  name: string;
  score: number;
  avatar: string;
  referralCount: number;
}

const DELAY_MS = 500;

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
  const [heliosUsername, setHeliosUsername] = useState<string | null>(null);
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [heliosUsernameFetched, setHeliosUsernameFetched] = useState(false);
  const [avatarPathFetched, setAvatarPathFetched] = useState(false);


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const checkUserExists = useCallback(async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/user/exists/${telegramId}`);
      console.log('API Response:', response.data);
  
      await delay(DELAY_MS); // Add delay before setting state
  
      if (response.data.hasOwnProperty('exists')) {
        if (response.data.exists === true) {
          console.log('User exists');
          setNewUser(false); // Temporarily set to false, will be checked again after username and avatar are fetched
        } else if (response.data.exists === false) {
          console.log('User does not exist');
          setNewUser(true); // User doesn't exist, so trigger new user flow
        } else {
          console.error('Unexpected "exists" value:', response.data.exists);
          setError('Unexpected response from server');
          setNewUser(null);
        }
      } else {
        console.error('Unexpected API response format:', response.data);
        setError('Unexpected response from server');
        setNewUser(null);
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      await delay(DELAY_MS); // Add delay before setting error state
      setError('Failed to check user existence');
      setNewUser(null);
    }
  }, []);  

  // Ensure at least 3 seconds of loading time
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoadingTimePassed(true);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
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
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();

        const userData = tg.initDataUnsafe.user;
        const startParam = tg.initDataUnsafe.start_param;  // Retrieve the referral token here
  
        if (startParam) {
          setReferralToken(startParam);  // Store referral token
        }

        if (userData) {
          setTelegramId(userData.id);
          setTelegramUsername(userData.username);

          if (userData.id) {
            console.log("Checking existence for telegramId:", userData.id);
            await checkUserExists(userData.id);

            const tokenAvailable = await waitForReferralToken();
            const timezone = getUserTimezone();

            // Handle user creation and fetch additional data
            await handleUserCreation(userData, tokenAvailable, timezone);

            // Fetch Helios username and avatarPath concurrently
            await Promise.all([
              fetchHeliosUsername(userData.id),
              fetchAvatarPath(userData.id),
            ]);

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

// Effect to update newUser after fetching user existence, username, and avatar
useEffect(() => {
  if (heliosUsernameFetched && avatarPathFetched) {
    // If checkUserExists indicates new user or heliosUsername or avatarPath is missing, set newUser to true
    if (newUser !== false || !heliosUsername || !avatarPath ) {
      setNewUser(true); // Trigger new user flow
    }
  }
}, [heliosUsernameFetched, avatarPathFetched, heliosUsername, avatarPath, newUser]);


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

  const fetchHeliosUsername = useCallback(async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/user/helios-username/${telegramId}`);
      if (response.data?.heliosUsername) {
        setHeliosUsername(response.data.heliosUsername);
      } else {
      }
      setHeliosUsernameFetched(true);  // Mark it as fetched
    } catch (err) {
      console.error('Error fetching helios username:', err);
      setHeliosUsernameFetched(true); 
    }
  }, []);
  
  const fetchAvatarPath = async (telegramId: number) => {
    try {
      const response = await axios.get(`https://server.therotrade.tech/api/user/avatar/${telegramId}`);
      if (response.data?.avatarPath) {
        setAvatarPath(response.data.avatarPath);
      } else {
        console.log('Avatar path not found for user');
      }
      setAvatarPathFetched(true);  // Mark it as fetched
    } catch (error) {
      console.error('Error fetching avatar path:', error);
      setAvatarPathFetched(true);  
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

  // Callback to update avatar path
  const updateAvatarPath = (newAvatarPath: string) => {
    setAvatarPath(newAvatarPath);
  };

  useEffect(() => {
    if (!telegramId) return;

    const fetchFriends = async () => {
      try {
          console.log('Fetching friends for telegramId:', telegramId);
          const response = await axios.get(`https://server.therotrade.tech/api/referral/users/${telegramId}`);
          console.log('API Response:', response.data);
  
          if (response.data && response.data.referrals && Array.isArray(response.data.referrals)) {
              const fetchedFriends = response.data.referrals.map((referral: any) => ({
                  id: referral.referredUserTelegramId,
                  name: referral.users?.heliosUsername || 'Unknown',
                  score: referral.users?.totalAirdrops || 0,
                  referralCount: referral.users?.referralCount || 0,
                  avatar: referral.users?.avatarPath,
              }));
  
              console.log('Processed Friends:', fetchedFriends);
              setFriends(fetchedFriends);
          } else {
              console.log('No referrals found in the response');
              setFriends([]);
          }
      } catch (error) {
          console.error('Error fetching friends:', error);
          setFriends([]);
      }
  };

    fetchFriends();
}, [telegramId]);

  const handleToggleTaskbar = (isVisible: boolean) => {
    setIsTaskbarVisible(isVisible);
  };

  // Trigger when user is created successfully and after 4 seconds
  useEffect(() => {
    if (loadingTimePassed && user && dataFetched && heliosUsernameFetched && avatarPathFetched) {
      setIsLoading(false);  // Loading stops once all essential and additional data is fetched (or attempted)
    }
  }, [loadingTimePassed, user, dataFetched, heliosUsernameFetched, avatarPathFetched]);
  

  const handleUsernameSetupComplete = async () => {
    if (telegramId) {
      await fetchHeliosUsername(telegramId);
    }
    setNewUser(false);
    setShowPopup(true);
    handleToggleTaskbar(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSetWelcomePage = (value: boolean) => {
    setShowWelcomePage(value);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (newUser === true || newUser === null) {
    return showWelcomePage ? (
      <WelcomePage onContinue={() => handleSetWelcomePage(false)} /> // Welcome page shown first
    ) : (
      <SetHeliosUsername telegramId={telegramId} onToggle={handleUsernameSetupComplete} onUpdateAvatarPath={updateAvatarPath}/> // Username setup shown after the welcome page
    );
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
          heliosUsername,
          totalAirdrops,
          progress,
          newUser,
          friends,
          airdropCount,
          totalValue,
          referralToken,
          minerate,
          avatarPath,
          updateTotalAirdrops,
          deleteAllUserAirdrops
        }}
      />
      {showPopup && <WelcomePopup onClose={handlePopupClose} toggleTaskbar={handleToggleTaskbar} />}
      <p className='hidden'>{message}</p>
      <div className='hidden'>
            <h1>Welcome, {user?.firstName}!</h1>
        </div>
        <div className="error hidden">{error}</div>
    </>
  );
};

export default Layout;
