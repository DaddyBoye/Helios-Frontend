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

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({ isOpen, toggleMenu }) => {
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const baseUrl = "https://t.me/HeeliossBot?start=";

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
        const response = await axios.get(`https://server.therotrade.tech/api/user/referral-token/${telegramId}`);
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
      {isOpen && (
        <>
          {/* Modal Background */}
          <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleMenu}></div>

          {/* Share Menu */}
          <div className="fixed bottom-0 left-0 w-full h-1/2 bg-white shadow-xl rounded-t-2xl z-30 p-4 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-black mb-4 text-center">Share Your Referral Link</h3>
            <div className="grid grid-cols-4 gap-4">
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <img src={FacebookLogo} alt="Facebook" className="h-12 w-12" />
              </a>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(referralLink || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <img src={WhatsAppLogo} alt="WhatsApp" className="h-14 w-14" />
              </a>
              {/* Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <img src={XLogo} alt="Twitter" className="h-10 w-10" />
              </a>
              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(referralLink || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <img src={TelegramLogo} alt="Telegram" className="h-12 w-12" />
              </a>
              {/* Instagram */}
              <a
                href={`https://www.instagram.com/direct/inbox/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <img src={InstagramLogo} alt="Instagram" className="h-12 w-12" />
              </a>
            </div>
            
            {/* Close Button at the Bottom */}
            <button
              onClick={toggleMenu}
              className="mt-auto bg-red-500 text-white mb-4 rounded-md px-4 py-2 w-full"
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SocialMediaShare;
