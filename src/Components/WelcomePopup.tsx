import React, { useState } from 'react';
import { ChevronRight, X, Trophy, Users, Leaf, Target, Calendar, Star, Cloud, Bell } from 'lucide-react';

interface WelcomePopupProps {
  onClose: () => void;
  toggleTaskbar: (isVisible: boolean) => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose, toggleTaskbar }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      toggleTaskbar(true);
      onClose();
    }
  };

  const handleClose = () => {
    toggleTaskbar(true);
    onClose();
  };

  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="text-center font-sans">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-emerald-500 mb-2">
              Welcome to Helios! 🌱
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Join our global community in reducing carbon footprints
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-800/50 p-3 rounded-lg text-left">
                <Trophy className="w-5 h-5 text-emerald-500 mb-1" />
                <h3 className="text-white text-sm font-semibold">Impact Together</h3>
                <p className="text-gray-400 text-xs">Collective carbon offsetting</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg text-left">
                <Users className="w-5 h-5 text-emerald-500 mb-1" />
                <h3 className="text-white text-sm font-semibold">Community</h3>
                <p className="text-gray-400 text-xs">Join eco-conscious users</p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="font-sans">
            <h2 className="text-xl font-bold text-emerald-500 mb-3 text-center">
              Universal Offsetting 🌍
            </h2>
            <div className="space-y-3">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Cloud className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-white text-sm font-semibold">Hourly Global Round</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Every hour, all active users participate in a universal offsetting round. Each round automatically adds offsets to your account, contributing to our collective impact.
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="font-sans">
            <h2 className="text-xl font-bold text-emerald-500 mb-3 text-center">
              Active Participation 🔔
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Bell className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-white text-sm font-semibold">Stay Active & Claim</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  Remember to claim your offsets regularly! After 8 unclaimed rounds, your account will pause accumulating new offsets.
                </p>
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                  <span className="text-sm text-gray-300">Claim Window</span>
                  <span className="text-sm text-emerald-500 font-semibold">8 Rounds</span>
                </div>
              </div>

            </div>
          </div>
        );

      case 3:
        return (
          <div className="font-sans">
            <h2 className="text-xl font-bold text-emerald-500 mb-3 text-center">
              Your Green Impact 🌿
            </h2>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-sm text-gray-300 mb-1">Hourly Contribution</div>
                  <div className="text-lg text-emerald-500 font-semibold">130 Helios</div>
                  <div className="text-xs text-gray-400">≈ 1.3 kg CO₂ offset</div>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-sm text-gray-300 mb-1">Monthly Potential</div>
                  <div className="text-lg text-emerald-500 font-semibold">93,600 Helios</div>
                  <div className="text-xs text-gray-400">≈ 936 kg CO₂ offset</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="font-sans">
            <h2 className="text-xl font-bold text-emerald-500 mb-3 text-center">
              Ready to Make an Impact? 🌱
            </h2>
            <div className="space-y-2 mb-4">
              <button className="w-full bg-gray-800/50 p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-700/50 transition-colors">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-white text-sm font-semibold">Start Offsetting</h3>
                  <p className="text-gray-400 text-xs">Join the global effort</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full bg-gray-800/50 p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-700/50 transition-colors">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-white text-sm font-semibold">Impact Dashboard</h3>
                  <p className="text-gray-400 text-xs">Track your contribution</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full bg-gray-800/50 p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-700/50 transition-colors">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-white text-sm font-semibold">Community Impact</h3>
                  <p className="text-gray-400 text-xs">See collective progress</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4 font-sans">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 max-w-md w-full mx-4 relative overflow-hidden shadow-2xl border border-gray-700">
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>

        <div className="flex justify-center space-x-2 mb-6">
          {[0, 1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1 rounded-full transition-all duration-300 ${
                step === currentStep ? 'w-8 bg-emerald-500' : 'w-4 bg-gray-600'
              }`}
            />
          ))}
        </div>

        {renderStep()}

        <button
          onClick={handleNext}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mt-4"
        >
          <span>{currentStep === 4 ? "Get Started" : "Continue"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;