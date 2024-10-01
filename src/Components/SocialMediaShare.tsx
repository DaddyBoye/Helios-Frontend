import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialMediaShare: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const baseUrl = "https://t.me/HeeliossBot?start="; // Base URL for the Telegram bot
  const telegramId = 8431679544; // Replace this with the actual telegramId you are fetching

  // Fetch referral token from server when component mounts
  useEffect(() => {
    const fetchReferralToken = async () => {
      try {
        const response = await axios.get(`https://server.therotrade.tech/api/users/referral-token/${telegramId}`);
        const referralToken = response.data.referralToken;
        setReferralLink(`${baseUrl}${referralToken}`);
      } catch (error) {
        console.error('Error fetching referral token:', error);
      }
    };

    fetchReferralToken(); // Fetch the referral token when the component mounts
  }, []);

  // Define the allowed platforms using a union type
  type Platform = 'twitter' | 'facebook' | 'whatsapp';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const shareToSocialMedia = (platform: Platform) => {
    if (!referralLink) {
      console.error('Referral link not available');
      return;
    }

    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${referralLink}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${referralLink}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${referralLink}`;
        break;
      default:
        break;
    }

    window.open(url, '_blank'); // Open in a new tab
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Share Referral
      </button>
      {isOpen && referralLink && ( // Ensure referralLink exists before rendering the menu
        <div className="absolute top-10 left-0 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
          <ul className="p-2 space-y-2">
            <li
              onClick={() => shareToSocialMedia('twitter')}
              className="cursor-pointer text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              Twitter
            </li>
            <li
              onClick={() => shareToSocialMedia('facebook')}
              className="cursor-pointer text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              Facebook
            </li>
            <li
              onClick={() => shareToSocialMedia('whatsapp')}
              className="cursor-pointer text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              WhatsApp
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SocialMediaShare;
