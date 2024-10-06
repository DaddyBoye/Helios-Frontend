import Helios from '../icons/HeliosLogo.svg';
import UserProfile from '../Components/UserProfile';
import '../App.css';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D2D47]">
      <div className="loading-container"> 
        <img src={Helios} alt="Helios Logo" className="loading-element" />
        <div className="shadow"></div>
      </div>
      <UserProfile />
    </div>
  );
};

export default LoadingPage;
