import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../icons/Helios.svg';
import DarkSolis from '../images/Solisss.svg';
import { QRCode } from 'react-qrcode-logo';
import SocialMediaShare from '../Components/SocialMediaShare';

interface ShareComponentProps {
  isShareMenuOpen: boolean;
  toggleShareMenu: () => void;
}

const ShareComponent: React.FC<ShareComponentProps> = ({ isShareMenuOpen, toggleShareMenu }) => {
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isSocialMediaMenuOpen, setIsSocialMediaMenuOpen] = useState(false);
  const baseUrl = "https://t.me/HeeliossBot?start=";

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      if (userData) {
        setTelegramId(userData.id);
      }
    }
  }, []);

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

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          // Vibrate the device for a short duration (e.g., 100ms)
          if (navigator.vibrate) {
            navigator.vibrate(100); // Adjust the duration as needed
          }
  
          setAlertMessage('Referral link copied to clipboard!');
          setTimeout(() => setAlertMessage(null), 2000);
        })
        .catch(() => {
          setAlertMessage('Failed to copy the referral link.');
          setTimeout(() => setAlertMessage(null), 2000);
        });
    }
  };
  

  const toggleSocialMediaMenu = () => {
    setIsSocialMediaMenuOpen(prev => !prev);
  };

  return (
    <>
          <div 
          className={`fixed inset-0 bg-black opacity-50 z-10 ${isShareMenuOpen ? 'block' : 'hidden'}`}
          onClick={toggleShareMenu}>
          </div>

          <div
            className={`fixed inset-x-0 bottom-0 h-[80%] bg-[#194464] p-4 z-20 flex flex-col items-center justify-center rounded-t-3xl
            transition-transform duration-300 ease-in-out transform ${isShareMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
          >
          { alertMessage && (
            <div className="mb-4 mt-4 pl-2 text-sm p-0 text-white w-11/12 h-7 text-center rounded-md fixed flex flex-row items-center bg-[#000000]/50 -top-20 left-1/2 transform -translate-x-1/2">
              <img src={DarkSolis} alt="" className="w-7 h-7 animate-spinZoomGlow" /> {/* Increase image size here */}
              <p className='pl-2 my-auto'>{alertMessage}</p>
            </div>
          )}
            <p className="text-lg font-bold mt-8 text-white mb-4">Invite a friend</p>

            {baseUrl ? (
              <QRCode
                value={referralLink || ''}
                size={
                  window.innerWidth >= 414
                    ? 260  // Large phones (e.g., iPhone X, Pixel XL)
                    : window.innerWidth >= 375
                    ? 250  // Regular phones (e.g., iPhone 6/7/8)
                    : 200  // Small phones (e.g., iPhone SE)
                }
                qrStyle="dots"
                eyeRadius={[{ outer: 5, inner: 0 }, { outer: 5, inner: 0 }, { outer: 5, inner: 0 }]}
                fgColor="#FAAD00"
                bgColor="#194464"
                logoImage={logo}
                logoWidth={window.innerWidth >= 414
                  ? 40  // Large phones (e.g., iPhone X, Pixel XL)
                  : window.innerWidth >= 375
                  ? 36  // Regular phones (e.g., iPhone 6/7/8)
                  : 30 }  // Dynamically resize logo
                  logoHeight={window.innerWidth >= 414
                    ? 40  // Large phones (e.g., iPhone X, Pixel XL)
                    : window.innerWidth >= 375
                    ? 36  // Regular phones (e.g., iPhone 6/7/8)
                    : 30 }  // Dynamically resize logo
                removeQrCodeBehindLogo={true}
              />
            ) : (
              <p className="text-white">Generating QR Code...</p>
            )}

            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white w-11/12 px-4 py-2 mt-4 rounded-md hover:bg-blue-600 text-sm md:text-base"
            >
              Copy Link
            </button>

            <button
              onClick={toggleSocialMediaMenu}
              className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md w-11/12 hover:bg-blue-600 text-sm md:text-base"
            >
              {isSocialMediaMenuOpen ? 'Close Share Menu' : 'Share Referral'}
            </button>

            <button
              onClick={toggleShareMenu}
              className="text-white px-4 py-2 text-opacity-50 mb-4 mt-2 rounded-md w-11/12 hover:bg-red-600 text-sm md:text-base"
            >
              Close
            </button>

            <SocialMediaShare
              isOpen={isSocialMediaMenuOpen}
              toggleMenu={toggleSocialMediaMenu}
            />
          </div>
        </>
  );
};

export default ShareComponent;
