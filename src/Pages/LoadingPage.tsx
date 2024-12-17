import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import Helios from '../icons/HeliosLogo.svg';
import '../App.css';

const LoadingPage = () => {
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [customAlertMessage, setCustomAlertMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Generate static bubble positions
  const bubbles = useMemo(() => 
    [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 50 + 10}px`,
      animationDuration: `${Math.random() * 10 + 5}s`
    })),
  []);

  // useEffect for custom alert
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setCustomAlertMessage("Oops! The mighty Helios is taking a nap. Want to wake him up?");
      setShowCustomAlert(true);
    }, 10000);

    return () => clearTimeout(alertTimeout);
  }, []);

  // Separate useEffect for loading progress
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        const newProgress = oldProgress + Math.random() * 10;
        return Math.min(newProgress, 100);
      });
    }, 500);

    return () => clearInterval(loadingInterval);
  }, []);

  const handleCloseAlert = () => {
    setShowCustomAlert(false);
    window.location.reload();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0D2D47]">
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-[#FAAD00] opacity-10"
            style={{
              top: bubble.top,
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animation: `float ${bubble.animationDuration} infinite ease-in-out`
            }}
          />
        ))}
      </div>

      <div className="loading-container">
        <img src={Helios} alt="Helios Logo" className="loading-element" />
        <div className=""></div>
      </div>

      {showCustomAlert && (
        <div className="fixed inset-0 z-50 flex font-sans items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-8/12 w-full mx-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Uh-oh!</h3>
              <button
                onClick={handleCloseAlert}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            <div className="px-4 py-2">
              <p className="text-lg text-gray-700 mb-4">{customAlertMessage}</p>
              <button
                onClick={handleCloseAlert}
                className="w-full py-2 px-4 bg-gradient-to-r mb-2 from-pink-500 to-yellow-500 text-white font-bold rounded-full hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition hover:scale-105"
              >
                Let's Go!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading bar at the bottom of the page */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;