import background from '../images/Starryy.svg';
import logo from '../icons/Helios.svg';
import { QRCode } from 'react-qrcode-logo';

const Airdrop = () => {
  const link = "https://t.me/HeeliossBot?start=";

  return (
    <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20] relative">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="z-10 flex flex-col items-center justify-center h-full">
        <img src={logo} alt="Helios Logo" width={100} height={100} className="mb-4" />
        <QRCode
          value={link}
          size={256}
          qrStyle="dots"
          eyeRadius={[
            { outer: 10, inner: 0 }, // Top-left eye
            { outer: 10, inner: 0 }, // Top-right eye
            { outer: 10, inner: 0 }, // Bottom-left eye
          ]}
          fgColor="#FAAD00"
          bgColor="#FFFFFF"
          logoImage={logo}
          logoWidth={70}
          logoHeight={70}
          removeQrCodeBehindLogo={true}
        />
      </div>
    </div>
  );
};

export default Airdrop;
