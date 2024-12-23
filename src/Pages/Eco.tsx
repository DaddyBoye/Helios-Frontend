import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import Header from '../Components/Header';
//import Subtract from '../images/Subtract.png';
import Projects from '../Components/Projects';
//import SustainabilityEducation from '../Components/SustainabilityEducation';
import '../App.css';

interface Friend {
    id: number;
    name: string;
    score: number;
    avatar: string;
    referralCount: number;
  }

function Eco() {
  const {
    friends,
    minerate,
    avatarPath,
  } = useOutletContext<{
    friends: Friend[];
    minerate: number | null;
    avatarPath: string | null;
  }>();

  return (
    <div className="relative flex flex-col font-sans overflow-hidden h-screen ">
      <StarryBackground />
      <div className="relative h-full flex-col flex items-center">
        <Header
          minerate={minerate}
          friendsCount={friends.length}
          avatarPath={avatarPath}
        />
        <Projects />
        {/* <SustainabilityEducation /> */}
      </div>
    </div>
  );
  
}

export default Eco;
