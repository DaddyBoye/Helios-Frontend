import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import freshcoin from '../icons/Solis-coin.svg';

interface MaxAirdropAlertProps {
  airdropCount: number;
  onClose: () => void;
}

const MaxAirdropAlert = ({ airdropCount, onClose }: MaxAirdropAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (airdropCount >= 8) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [airdropCount]);

  useEffect(() => {
    if (isVisible) {
      const shakeInterval = setInterval(() => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 1000);
      }, 5000);

      return () => clearInterval(shakeInterval);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 500);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-gradient-to-br from-[#1a1f35] to-[#0d1220] rounded-xl border border-yellow-500/50 
          shadow-2xl w-[90%] p-4 transform transition-all duration-500 ease-out overflow-hidden
          ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'}
          ${isExiting ? 'translate-y-full opacity-0 scale-95' : ''}
          ${isShaking ? 'animate-shake' : ''}`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        <div className={`absolute -top-10 -right-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-lg ${isShaking ? 'animate-pulse' : ''}`} />
        <div className={`absolute -bottom-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-lg ${isShaking ? 'animate-pulse' : ''}`} />

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-yellow-500/10 rounded-lg animate-gentle-shake">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <h2 className={`text-lg font-bold text-white ${isShaking ? 'animate-text-shake' : ''}`}>
              Maximum Capacity!
            </h2>
          </div>

          <div className="space-y-3">
            <p className={`text-sm text-center text-gray-300 ${isShaking ? 'animate-text-shake' : ''}`}>
              You've reached the maximum number of offsets
            </p>
            
            <div className={`flex items-center justify-center bg-white/5 rounded-lg p-3 gap-3 hover:bg-white/10 transition-colors
              ${isShaking ? 'animate-shake-sm' : ''}`}>
              <div className="flex items-center">
                <img 
                  src={freshcoin} 
                  alt="coin" 
                  className={`w-6 h-6 ${isShaking ? 'animate-coin-shake' : 'animate-pulse'}`} 
                />
                <span className={`text-xl font-bold text-yellow-500 ml-1 ${isShaking ? 'animate-text-shake' : ''}`}>8/8</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className={`text-xs text-gray-400 ${isShaking ? 'animate-text-shake' : ''}`}>
                Maximum Offsets<br/>Reached
              </div>
            </div>

            <div className={`text-xs text-gray-400 text-center ${isShaking ? 'animate-text-shake' : 'animate-pulse'}`}>
              Reap your current offsets to continue earning
            </div>
          </div>

          <div className="absolute top-2 right-1">
            <div className={`w-1.5 h-1.5 bg-red-500 rounded-full ${isShaking ? 'animate-ping-fast' : 'animate-ping'}`} />
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxAirdropAlert;