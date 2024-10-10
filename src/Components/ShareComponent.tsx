import { useState } from 'react';
import logo from '../icons/Helios.svg';
import { QRCode } from 'react-qrcode-logo';
import SocialMediaShare from '../Components/SocialMediaShare';

interface ShareComponentProps {
  isShareMenuOpen: boolean;
  toggleShareMenu: () => void;
  referralLink: string;
}

const ShareComponent: React.FC<ShareComponentProps> = ({ isShareMenuOpen, toggleShareMenu, referralLink }) => {
  const [isSocialMediaMenuOpen, setIsSocialMediaMenuOpen] = useState(false);
  const baseUrl = "https://t.me/HeeliossBot?start=";

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
          <div className='flex flex-col items-center gap-2 w-full'>
            <p className="text-lg font-bold text-white">Invite a friend</p>

            {baseUrl ? (
              <QRCode
                value={referralLink || ''}
                size={
                  window.innerWidth >= 414
                    ? 260  // Large phones (e.g., iPhone X, Pixel XL)
                    : window.innerWidth >= 375
                    ? 250  // Regular phones (e.g., iPhone 6/7/8)
                    : 225  // Small phones (e.g., iPhone SE)
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
              onClick={toggleSocialMediaMenu}
              className="bg-blue-500 text-white px-4 py-2.5 rounded-xl mt-2 w-11/12 hover:bg-blue-600 text-base"
            >
              {isSocialMediaMenuOpen ? 'Close Share Menu' : 'Share Referral'}
            </button>

            <button
              onClick={toggleShareMenu}
              className="text-white px-4 py-2.5 bg-red-500  text-opacity-80 rounded-xl w-11/12 hover:bg-red-600 text-base"
            >
              Close
            </button>
            </div>
            <SocialMediaShare
              isOpen={isSocialMediaMenuOpen}
              toggleMenu={toggleSocialMediaMenu}
            />
          </div>
        </>
  );
};

export default ShareComponent;
