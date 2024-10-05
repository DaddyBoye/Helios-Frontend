import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
import Taskbar from '../Components/Taskbar';
import axios from 'axios';
import { io } from 'socket.io-client';

interface Airdrop {
  id: number;
  value: number;
  timestamp: string;
}

const Layout = () => {
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

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(loadingTimeout);
      setIsLoading(true);
    };
  }, []);

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

  // Corrected function to update total airdrops for a user
  const updateTotalAirdrops = async (telegramId: number) => {
    try {
      const response = await axios.patch(`https://server.therotrade.tech/api/airdrops/sum/update/${telegramId}`);
      const updatedTotalAirdrops = response.data.newTotalAirdrops;
      setTotalAirdrops(updatedTotalAirdrops);
      console.log('Total Airdrops updated successfully:', updatedTotalAirdrops);
      return updatedTotalAirdrops; // return if needed in child components
    } catch (error) {
      console.error('Error updating total airdrops:', error);
      throw error;
    }
  };

  // Corrected function to delete all airdrops for a user
  const deleteAllUserAirdrops = async (telegramId: number) => {
    try {
      const response = await axios.delete(`https://server.therotrade.tech/api/airdrops/delete/${telegramId}`);
      setAirdrops([]); // Reset the airdrops after deletion
      console.log('Airdrops deleted successfully');
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
          airdropCount,
          totalValue,
          referralToken,
          minerate,
          updateTotalAirdrops,
          deleteAllUserAirdrops
        }}
      />
    </>
  );
};

export default Layout;
