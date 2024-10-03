import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../icons/Helios.svg';
import checkmark from '../icons/mdi_tick-circle.svg'
import { QRCode } from 'react-qrcode-logo';
import SocialMediaShare from '../Components/SocialMediaShare';

interface ShareComponentProps {
  isShareMenuOpen: boolean;
  toggleShareMenu: () => void; // Renamed for clarity
}

const ShareComponent: React.FC<ShareComponentProps> = ({ isShareMenuOpen, toggleShareMenu }) => {
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isSocialMediaMenuOpen, setIsSocialMediaMenuOpen] = useState(false); // New state for SocialMediaShare menu
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

  // Function to copy the referral link
  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          setAlertMessage('Referral link copied to clipboard!');
          setTimeout(() => setAlertMessage(null), 2000); // Clear alert after 2 seconds
        })
        .catch(() => {
          setAlertMessage('Failed to copy the referral link.');
          setTimeout(() => setAlertMessage(null), 2000); // Clear alert after 2 seconds
        });
    }
  };

  const toggleSocialMediaMenu = () => {
    setIsSocialMediaMenuOpen(prev => !prev); // Toggle menu visibility
  };

  return (
    <>
      {isShareMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleShareMenu}></div>

          {/* Share Menu */}
          <div className="fixed inset-x-0 bottom-0 h-[80%] bg-[#194464] p-4 z-20 flex flex-col items-center justify-center rounded-t-3xl">
            { alertMessage &&(
              <div className="mb-4 mt-4 pl-2 text-sm p-1 text-white w-11/12 text-center rounded-md fixed flex flex-row bg-[#000000]/50 top-16 left-1/2 transform -translate-x-1/2">
                <img src={checkmark} alt="" width={17} height={17}/><p className='pl-1 my-auto'>{alertMessage}</p>
              </div>
            )}


            <p className="text-lg font-bold mt-8 text-white mb-4">Invite a friend</p>

            {
          baseUrl ? (
            <QRCode
              value={referralLink || ''}  // Fallback to an empty string when referralLink is null
              size={289}
              qrStyle="dots"
              eyeRadius={[{ outer: 5, inner: 0 }, { outer: 5, inner: 0 }, { outer: 5, inner: 0 }]}
              fgColor="#FAAD00"
              bgColor="#194464"
              logoImage={logo}
              logoWidth={60}
              logoHeight={60}
              removeQrCodeBehindLogo={true}
              />
            ) : (
              <p className="text-white">Generating QR Code...</p>
            )
          }

            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white w-11/12 px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
            >
              Copy Link
            </button>

            <button
              onClick={toggleSocialMediaMenu} // Use the new function for toggling social media share
              className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md w-11/12 hover:bg-blue-600"
            >
              {isSocialMediaMenuOpen ? 'Close Share Menu' : 'Share Referral'}
            </button>

            {/* Close Share Menu Button */}
            <button
              onClick={toggleShareMenu} // Use the prop function to close the main share menu
              className="text-white px-4 py-2 text-opacity-50 mb-4 mt-2 rounded-md w-11/12 hover:bg-red-600"
            >
              Close
            </button>

            <SocialMediaShare
              isOpen={isSocialMediaMenuOpen}
              toggleMenu={toggleSocialMediaMenu} // Pass the correct function
            />
          </div>
        </>
      )}
    </>
  );
};

export default ShareComponent;
