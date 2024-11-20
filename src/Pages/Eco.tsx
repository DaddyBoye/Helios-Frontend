import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import Header from '../Components/Header';
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
      <div className="relative flex items-center">
      <Header
          minerate={minerate}
          friendsCount={friends.length}
          avatarPath={avatarPath}
        />



        </div>
    </div>
  );
  
}

export default Eco;
