import React from 'react';
import StarryBackground from '../Components/StarryBackground';
import Warrior from '../icons/Mascot.png';
import '../App.css';

interface WelcomePageProps {
  onContinue: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onContinue }) => {

  return (
    <div className="flex flex-col font-sans h-screen bg-black/70 text-white">
      <StarryBackground />
      <div className="flex flex-col flex-grow z-10 text-center items-center justify-between py-8">
        <div className="w-full">
          {/* Lazy load the image */}
          <img src={Warrior} alt="Warrior" className="mx-auto w-7/12" loading="lazy" />
          <h1 className="text-xl text-[#FAAD00] font-bold mb-4">Welcome to Helios</h1>
          <p className="text-sm w-10/12 mx-auto text-center">
            The kingdom of the sun god Helios. A realm of endless possibilities, where golden skies and boundless horizons inspire greatness in all who enter.
          </p>
        </div>
        <div id='button-container' className='w-full mt-auto'>
          <button
            onClick={onContinue}
            className="bg-yellow-500 text-white mx-auto font-bold py-3 rounded-lg hover:bg-yellow-600 w-10/12"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
