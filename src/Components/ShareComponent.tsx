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
            className={`fixed inset-x-0 bottom-0 max-h-[100%] min-h-[70%] bg-[#194464] p-4 z-20 flex flex-col items-center justify-center rounded-t-3xl
            transition-transform duration-300 ease-in-out transform ${isShareMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
          >
          <div className='flex flex-col items-center gap-2 w-full'>
            <p className="text-lg font-bold text-white">Invite a friend</p>

            {referralLink ? (
              <QRCode
                value={referralLink || ''}
                size={Math.min((window.innerWidth * 9) / 12, 400)} // QR code size is limited to a maximum of 300px
                qrStyle="dots"
                eyeRadius={[{ outer: 5, inner: 0 }, { outer: 5, inner: 0 }, { outer: 5, inner: 0 }]}
                fgColor="#FAAD00"
                bgColor="#194464"
                logoImage={logo}
                logoWidth={Math.min((window.innerWidth * 10) / (12 * 7.5), 42)} // Logo width is also capped at a maximum of 40px
                logoHeight={Math.min((window.innerWidth * 10) / (12 * 7.5), 42)} // Logo height is capped similarly
                removeQrCodeBehindLogo={true}
              />

            ) : (
              <p className="text-white">Generating QR Code...</p>
            )}

            <button
              onClick={toggleSocialMediaMenu}
              className="bg-blue-500 text-white px-4 py-2.5 rounded-xl w-11/12 hover:bg-blue-600 text-base"
            >
              {isSocialMediaMenuOpen ? 'Close Share Menu' : 'Share Referral'}
            </button>

            <button
              onClick={toggleShareMenu}
              className="text-white px-4 py-2.5 bg-red-500 text-opacity-80 rounded-xl w-11/12 hover:bg-red-600 text-base"
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
