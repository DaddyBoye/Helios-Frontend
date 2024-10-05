import Helios from '../icons/HeliosLogo.svg';

const LoadingPage: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D2D47]">
      <img src={Helios} alt="Helios Logo" className="animate-bounce" width={220} />
    </div>
  );
};

export default LoadingPage;
