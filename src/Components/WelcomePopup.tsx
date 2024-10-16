import React from 'react';

interface WelcomePopupProps {
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to the Platform!</h2>
        <p>We’re excited to have you here. Let’s get started by setting up your profile.</p>
        <button onClick={onClose}>Get Started</button>
      </div>
    </div>
  );
};

export default WelcomePopup;
