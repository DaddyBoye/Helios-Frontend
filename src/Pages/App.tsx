import '../App.css';
import ProgressBar from '../Components/ProgressBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import background from '../images/Starryy.svg';
import mascot from '../images/MascotCircles.svg';
import freshcoin from '../images/FreshCoin.svg';
import Hamster from '../icons/Hamster';
import Popup from '../Components/Popup';
import UserProfile from '../Components/UserProfile';

interface Airdrop {
  id: number;
  value: number;
  timestamp: string;
}

function App() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]); // Explicitly type the airdrops array
  const [parentTotal, setParentTotal] = useState(0);
  const [cumulativeTotal, setCumulativeTotal] = useState(0);
  const [airdropCount, setAirdropCount] = useState(0);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all airdrops
  const fetchAirdrops = async () => {
    try {
      const response = await axios.get('https://server.therotrade.tech/api/airdrops');
      setAirdrops(response.data);
    } catch (error) {
      console.error('Error fetching airdrops:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the number of airdrops from the backend
  const fetchAirdropCount = async () => {
    try {
      const response = await axios.get('https://server.therotrade.tech/api/airdrops/count');
      setAirdropCount(response.data.count);
    } catch (error) {
      console.error('Error fetching airdrop count:', error);
    }
  };

  // Fetch parent total
  const fetchParentTotal = async () => {
    try {
      const response = await axios.get('https://server.therotrade.tech/api/airdrops/sum');
      setParentTotal(response.data.totalValue);
    } catch (error) {
      console.error('Error fetching parent total:', error);
    }
  };

  // Fetch the current cumulative total from the backend
  const fetchCurrentCumulativeTotal = async () => {
    try {
      const response = await axios.get('https://server.therotrade.tech/api/airdrops/currentCumulativeTotal');
      setCumulativeTotal(response.data.cumulativeTotal); // Update cumulative total
    } catch (error) {
      console.error('Error fetching cumulative total:', error);
    }
  };

  // Fetch and calculate a new cumulative total
  const fetchCumulativeTotal = async () => {
    try {
      const response = await axios.get('https://server.therotrade.tech/api/airdrops/incrementCumulative');
      setCumulativeTotal(response.data.cumulativeTotal); // Update cumulative total
    } catch (error) {
      console.error('Error fetching cumulative total:', error);
      throw error; // Re-throw the error to handle it in the claimFunction
    }
  };

  // Delete all airdrops and update parent total
  const deleteAllAirdrops = async () => {
    try {
      const response = await axios.delete('https://server.therotrade.tech/api/airdrops/deleteAll');
      setMessage(response.data.message);
      setParentTotal(response.data.newParentTotal);
      // Refetch airdrops to update the UI
      await fetchAirdrops(); // Ensure airdrops are refetched after deletion
    } catch (error) {
      console.error('Error deleting airdrops or updating parent total:', error);
      throw error; // Re-throw the error to handle it in the claimFunction
    }
  };

  const claimFunction = async () => {
    try {
      // Fetch the cumulative total and wait for it to complete
      await fetchCumulativeTotal();
  
      // Now delete all airdrops
      await deleteAllAirdrops();
  
      // Optionally, you can refetch data or update state if necessary
  
      // Close the popup after operations are complete
      setShowPopup(false);
    } catch (error) {
      console.error('Error during claim function execution:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    // Fetch airdrops, parent total, airdrop count, and cumulative total initially
    fetchAirdrops();
    fetchParentTotal();
    fetchAirdropCount();
    fetchCurrentCumulativeTotal();

    // Set up intervals to fetch data every second
    const airdropIntervalId = setInterval(fetchAirdrops, 1000);
    const parentTotalIntervalId = setInterval(fetchParentTotal, 1000);
    const airdropCountIntervalId = setInterval(fetchAirdropCount, 1000);
    const cumulativeTotalIntervalId = setInterval(fetchCurrentCumulativeTotal, 1000);

    // Cleanup function: clear all intervals on component unmount
    return () => {
      clearInterval(airdropIntervalId);
      clearInterval(parentTotalIntervalId);
      clearInterval(airdropCountIntervalId);
      clearInterval(cumulativeTotalIntervalId);
    };
  }, []); // Empty dependency array to run only once after component mounts

  // Set loading to false after initial fetches
  useEffect(() => {
    if (airdrops.length > 0 && parentTotal !== 0) {
      setLoading(false);
    }
  }, [airdrops, parentTotal]);

  if (loading) {
    return <div>Loading...</div>;
  }


return (
  <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20]">
    <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="relative flex items-center">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className='text-center z-10 pt-10 font-bold text-[#DCAA19] font-sans text-2xl'>
            Helios
          </h1>
          <UserProfile/>
        </div>
        <div className="ml-auto">
          <img src={mascot} alt="Mascot Circle" className='w-24 h-24 z-10 object-contain' />
        </div>
      </div>
      <div className='flex flex-row mb-10 z-10 items-center justify-center'>
        <img src={freshcoin} alt="" className='w-12 pr-0.5 h-12' />
        <p className='my-auto text-white font-bold text-4xl'>{cumulativeTotal}</p>
      </div>
      <div className='bg-white/20 border-solid border-2 border-[#B4CADA] backdrop-blur-md rounded-2xl mb-[-20px] z-20 pb-6 rounded-2xl justify-center mx-auto z-10 w-11/12 '>
        <div className='flex flex-row pl-7 pr-6 pt-3 justify-between'>
          <div className='flex flex-col'>
            <p className='font-bold text-lg'>Mining Rate</p>
            <div className='flex flex-row'>
              <img src={freshcoin} alt="" className='w-5 my-auto pr-0.5 h-5' />
              <p className='text-md'>20/hr</p>
            </div>
            <p className='font-bold text-sm'>Current Airdrop</p>
          </div>
          <div className='my-auto pl-8'>
          <button onClick={() => setShowPopup(true)} className="bg-yellow-500 p-2 pl-4 pr-4 rounded-lg">Claim</button>
          </div>
        </div>
        <ProgressBar/>
      </div>

      {showPopup && (
        <Popup
          airdropCount={airdropCount}
          totalValue={parentTotal}
          onConfirm={claimFunction}
          onClose={() => setShowPopup(false)}

        />
      )}

      <div className='bg-[#D9D9D9] min-h-72 overflow-auto pb-20 text-white rounded-3xl z-10 w-full'>
        <p className='text-sm font-bold text-black pl-8 pt-5'>Unclaimed Airdrops</p>
        <div className='flex flex-col items-center justify-center'>
                {airdrops.length > 0 ? (
                    <ul className='flex flex-col w-full items-center justify-center'>
                        {airdrops.map((airdrop) => (
                            <li key={airdrop.id} className="bg-gradient-to-r from-[#40659C] to-[#162336] justify-left mb-2 flex flex-row rounded-2xl w-11/12 h-14 pl-4 text-sm my-auto">
                                   <Hamster className="w-6 h-6 mr-3 my-auto"/>
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
      <p>{message}</p>
  </div>
  )
}

export default App;