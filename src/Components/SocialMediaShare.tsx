import React, { useState, useEffect } from 'react';
import axios from 'axios';
import XLogo from '../icons/prime_twitter.svg';
import FacebookLogo from '../icons/logos_facebook.svg';
import InstagramLogo from '../icons/skill-icons_instagram.svg';
import WhatsAppLogo from '../icons/logos_whatsapp.svg';
import TelegramLogo from '../icons/logos_telegram.svg';

interface SocialMediaShareProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const VITE_SERVER2_URL = import.meta.env.VITE_SERVER2_URL;
const VITE_TELEGRAM_URL = import.meta.env.VITE_TELEGRAM_URL;

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({ isOpen, toggleMenu }) => {
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const baseUrl = VITE_TELEGRAM_URL;

  const shareMessage = 
    "Experience Helios—an exciting innovation using TON in the carbon trading market! 🌍 Start your journey today and join me on this groundbreaking adventure.";

  // Fetch telegramId using the Telegram SDK
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      if (userData) {
        setTelegramId(userData.id); // Set the telegramId from the SDK
      }
    }
  }, []);

  // Fetch referral token from server when the telegramId is available
  useEffect(() => {
    if (!telegramId) return;

    const fetchReferralToken = async () => {
      try {
        const response = await axios.get(`${VITE_SERVER2_URL}/api/user/referral-token/${telegramId}`);
        const referralToken = response.data.referralToken;
        setReferralLink(`${baseUrl}${encodeURIComponent(referralToken)}`);
      } catch (error) {
        console.error('Error fetching referral token:', error);
      }
    };

    fetchReferralToken();
  }, [telegramId]);

  return (
    <>
      {/* Slide Up/Down Animation */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-20 ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed bottom-0 left-0 w-full max-h-[70%] min-h-[60%] bg-white shadow-xl rounded-t-2xl z-30 p-4 flex flex-col justify-between 
        transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <h3 className="text-lg font-bold text-black mb-4 text-center">Share Your Referral Link</h3>

        {/* Dynamic Grid with 4 items per row */}
        <div className="grid grid-cols-4 gap-4">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              `${referralLink || ''}&text=${shareMessage}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full transition-transform transform hover:scale-110 active:scale-95"
          >
            <img src={FacebookLogo} alt="Facebook" className="h-10 w-10 sm:h-12 sm:w-12 md:h-12 md:w-12 transition-transform" />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `${shareMessage} ${referralLink || ''}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full transition-transform transform hover:scale-110 active:scale-95"
          >
            <img src={WhatsAppLogo} alt="WhatsApp" className="h-12 w-12 sm:h-14 sm:w-14 md:h-14 md:w-14 transition-transform" />
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              `${referralLink || ''}&text=${shareMessage}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full transition-transform transform hover:scale-110 active:scale-95"
          >
            <img src={XLogo} alt="Twitter" className="h-8 w-8 sm:h-12 sm:w-12 md:h-10 md:w-10 transition-transform" />
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(referralLink || '')}&text=${encodeURIComponent(
              shareMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full transition-transform transform hover:scale-110 active:scale-95"
          >
            <img src={TelegramLogo} alt="Telegram" className="h-10 w-10 sm:h-12 sm:w-12 md:h-12 md:w-12 transition-transform" />
          </a>

          {/* Instagram */}
          <a
            href={`https://www.instagram.com/direct/inbox/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full transition-transform transform hover:scale-110 active:scale-95"
          >
            <img src={InstagramLogo} alt="Instagram" className="h-10 w-10 sm:h-12 sm:w-12 md:h-12 md:w-12 transition-transform" />
          </a>

          {/* Additional empty spaces or icons */}
          <div className="flex items-center justify-center w-full"></div>
          <div className="flex items-center justify-center w-full"></div>
          <div className="flex items-center justify-center w-full"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="mt-auto bg-red-500 text-white mb-4 rounded-md px-4 py-2 w-full transition-transform transform hover:scale-105 active:scale-95"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default SocialMediaShare;
