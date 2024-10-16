import React from 'react';
import HeliosHead from '../images/helios 2 mascot 1.svg';

interface WelcomePopupProps {
  onClose: () => void;
  toggleTaskbar: (isVisible: boolean) => void;
}



const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose, toggleTaskbar }) => {
    const handleClick = () => {
        toggleTaskbar(true);
        onClose();
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 text-center relative">
        <button 
          onClick={handleClick}
          className="absolute top-2 border w-7 h-7 rounded-full mx-auto my-auto right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <img src={HeliosHead} alt="Helios" className="w-24 h-24 mx-auto -mt-28" />
        <h2 className="text-yellow-500 text-xl font-bold mb-4">What do we do?</h2>
        <p className="text-white ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore modi voluptas cum autem corrupti est, illo perspiciatis id quod veritatis nihil quasi et adipisci harum sit, consequuntur recusandae natus?</p>
      </div>
    </div>
  );
};

export default WelcomePopup;