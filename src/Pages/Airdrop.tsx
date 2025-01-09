import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import Arrow from '../icons/Arrow Vector.svg';
import EiCheck from '../icons/ei_check.svg';
import CompletedTimer from '../icons/basil_timer-outline.svg';
import Timer from '../icons/basil_timer-outline (1).svg';
import RoadmapCards from '../Components/RoadmapCards';
import Header from '../Components/Header';

interface AirdropProps {
  toggleTaskbar: (isVisible: boolean) => void;
  friends: Friend[];
  minerate: number | null;
  avatarPath: string | null;
}

interface Friend {
  id: number;
  name: string;
  score: number;
  avatar: string;
  referralCount: number;
}

const inviteLinks = [
  {
    title: 'Debut',
    description: 'Kickstart your journey with our first product release',
    textColor: 'text-white/50',
    icon: EiCheck,
    time: 'November',
  },
  {
    title: 'Mining',
    description: 'Explore and earn rewards through mining activities',
    textColor: 'text-[#FFC213]/50',
    icon: CompletedTimer,
    time: 'December',
  },
  {
    title: 'Minting',
    description: 'Unlock exclusive features through token minting',
    textColor: 'text-white/50',
    icon: Timer,
    time: 'February',
  },
  {
    title: 'Trading',
    description: 'Engage in seamless trading experiences',
    textColor: 'text-white/50',
    icon: Timer,
    time: 'June',
  },
];


const Airdrop = () => {
  const { minerate, friends, avatarPath } = useOutletContext<AirdropProps>();
  
  return (
    <div className="relative font-sans h-full pb-40">
      <StarryBackground />

      {/* Main container */}
      <div className="relative z-10 text-center flex flex-col text-white">
        <div className="p-2"></div>
        <Header
          minerate={minerate}
          friendsCount={friends.length}
          avatarPath={avatarPath}
        />

        {/* Roadmap Header */}
        <div className="py-1 px-8 bg-white mx-auto mt-14 rounded-2xl font-semibold text-black">
          Roadmap
        </div>

        {/* Timeline indicator */}
        <div className="flex items-center justify-center w-40 mb-1 mx-auto">
          <div className="bg-white w-2 h-2 mx-auto rounded-full"></div>
          <p className="text-sm">December</p>
          <div className="bg-white w-2 h-2 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <img src={Arrow} alt="arrow" />
          <RoadmapCards/>
          <img src={Arrow} alt="arrow" className="rotate-180" />
        </div>

        {/* Horizontal Divider */}
        <hr className="border-t border-white/30 mx-5 my-5" /> 
        
        {/* Invite Section */}
        <div className="gap-2 flex-col flex">
          {inviteLinks.map((link, index) => (
            <div key={index} className="w-11/12 mx-auto justify-between px-2 text-md flex flex-row">
              <div>
                <div className={`flex flex-row ${link.textColor === 'text-[#FFC213]/50' ? 'text-[#FFC213]' : ''}`}>
                  <div className="w-2 h-2 bg-white mr-2 rounded-full my-auto"></div>
                  <p className="font-light text-sm">{link.title}</p>
                </div>
                <div className="flex flex-row pl-1 text-sm">
                  <div className="h-9 w-0.5 bg-white mr-2"></div>
                  <div className="flex flex-col text-xs">
                    <p className={`my-auto font-light text-left ${link.textColor}`}>
                      {link.description}
                    </p>
                    <p className={`${link.textColor} font-light text-left`}>{link.time}</p>
                  </div>
                </div>
              </div>
              <img src={link.icon} alt="Icon" className="pb-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
