import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialMediaShare: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const baseUrl = "https://t.me/HeeliossBot?start=";

  // Fetch referral token from server when the telegramId is available
  useEffect(() => {
    if (!telegramId) return;

    const fetchReferralToken = async () => {
      try {
        const response = await axios.get(`https://server.therotrade.tech/api/user/referral-token/${telegramId}`);
        const referralToken = response.data.referralToken;
        const generatedLink = `${baseUrl}${encodeURIComponent(referralToken)}`;
        setReferralLink(generatedLink);
        console.log('Referral link generated:', generatedLink);
      } catch (error) {
        console.error('Error fetching referral token:', error);
      }
    };

    fetchReferralToken();
  }, [telegramId]);

  // Fetch telegramId using the Telegram SDK
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const userData = window.Telegram.WebApp.initDataUnsafe?.user;
      if (userData) {
        setTelegramId(userData.id); // Set the telegramId from the SDK
      } else {
        console.error('No Telegram user data found.');
      }
    } else {
      console.error('Telegram WebApp SDK is not available.');
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(prev => !prev); // Toggle menu visibility
  };

  return (
    <div className="relative z-10">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
      >
        {isOpen ? 'Close Share Menu' : 'Share Referral'}
      </button>

      {/* Always render the referral link for better debugging */}
      <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded-md">
        <p>Your referral link:</p>
        <p className="text-blue-500 break-all">
          {referralLink ? referralLink : 'Loading referral link...'}
        </p>
      </div>

      {isOpen && referralLink && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-10">
          <div className="p-4 grid grid-cols-2 gap-4">
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center justify-center"
            >
              Facebook
            </a>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white rounded-md px-4 py-2 flex items-center justify-center"
            >
              WhatsApp
            </a>
            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white rounded-md px-4 py-2 flex items-center justify-center"
            >
              Twitter
            </a>
            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center justify-center"
            >
              Telegram
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaShare;
