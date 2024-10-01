import React, { useState } from 'react';

interface SocialMediaShareProps {
  referralLink: string;
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({ referralLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define the allowed platforms using a union type
  type Platform = 'twitter' | 'facebook' | 'whatsapp';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const shareToSocialMedia = (platform: Platform) => {
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
      {isOpen && (
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
