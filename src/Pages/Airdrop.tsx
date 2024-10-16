import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import Solis from '../icons/fdv 1 (1).svg';
import Friends from '../icons/Friends Vector.svg';
import User from '../icons/edeef 1.svg';
import Arrow from '../icons/Arrow Vector.svg';
import EiCheck from '../icons/ei_check.svg';
import CompletedTimer from '../icons/basil_timer-outline.svg';
import Timer from '../icons/basil_timer-outline (1).svg';
import RoadmapCards from '../Components/RoadmapCards';

interface AirdropProps {
  toggleTaskbar: (isVisible: boolean) => void;
  friends: Friend[];
  minerate: number | null;
}

interface Friend {
  id: number;
  name: string;
  score: number;
  avatar: string;
  referralCount: number;
}

const Airdrop = () => {
  const { minerate, friends } = useOutletContext<AirdropProps>();
  return (
    <div className="relative font-sans h-full pb-20">
      <StarryBackground />

      {/* Main container */}
      <div className="relative z-10 text-center flex flex-col text-white">
        <div className="p-2"></div>

        {/* Earn section */}
        <div className='w-full backdrop-blur fixed pt-2 top-0 left-0 z-50 right-0 mx-auto'>
          <div className='flex flex-row items-center w-11/12 justify-between mx-auto my-auto bg-[#185C8D]/50 h-12 p-1 pl-2 rounded-lg'>
              <div className='flex flex-row items-center justify-center'>
                  <img src={Solis} alt="Solis" className="w-8 h-8 animate-spinZoomGlow" />
                  <p className='text-base ml-1'>Earn</p>
              </div>
              <div className="relative flex my-auto h-6">
                  <div className="flex flex-row items-center justify-between gap-3 rounded-full pl-3 pr-14 py-0.5 bg-[#185C8D]/80">
                      <div className="flex flex-row items-center">
                          <img src={Solis} alt="Solis" className="w-6 h-6 " />
                          <p className="ml-1 text-xs">{minerate}</p>
                      </div>
                      <div className="flex flex-row items-center">
                          <img src={Friends} alt="Friends" className="w-6 h-6" />
                          <p className="ml-1 text-xs">{friends.length}</p>
                      </div>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FFD700] mr-1 rounded-full p-0.5 flex items-center justify-center">
                      <img src={User} alt="User" className="w-8 h-8 rounded-full object-cover" />
                  </div>
              </div>
          </div>
        </div>

        {/* Roadmap Header */}
        <div className="py-1 px-8 bg-white mx-auto mt-14 rounded-2xl font-semibold text-black">
          Roadmap
        </div>

        {/* Timeline indicator */}
        <div className="flex items-center justify-center w-40 mb-1 mx-auto">
          <div className="bg-white w-2 h-2 mx-auto rounded-full"></div>
          <p className="text-sm">August</p>
          <div className="bg-white w-2 h-2 mx-auto rounded-full"></div>
        </div>

        {/* Mining Steps */}
        <div className="flex flex-row justify-between items-center w-full">
          <img src={Arrow} alt="arrow" />
          <RoadmapCards/>
          <img src={Arrow} alt="arrow" className="rotate-180" />
        </div>

        {/* Horizontal Divider */}
        <hr className="border-t border-white/30 mx-5 my-5" />
        {/* Invite Section */}
        <div className="gap-2 flex-col flex">
          {/* Invite Link 1 */}
          <div className="w-11/12 mx-auto justify-between px-2 text-md flex flex-row">
            <div>
              <div className="flex flex-row">
                <div className="w-2 h-2 bg-white mr-2 rounded-full my-auto"></div>
                <p className="font-light text-sm">Share your invite links</p>
              </div>
              <div className="flex flex-row pl-1 text-sm">
                <div className="h-9 rounded-xl w-0.5 bg-white mr-2"></div>
                <div className="flex flex-col text-xs">
                  <p className="my-auto font-light text-left text-white/50">
                    Get a free play pass for each friend
                  </p>
                  <p className="text-white/50 font-light text-left">10hr/min</p>
                </div>
              </div>
            </div>
            <img src={EiCheck} alt="Check" className="pb-5" />
          </div>

          {/* Invite Link 2 */}
          <div className="w-11/12 mx-auto justify-between px-2 text-md flex flex-row">
            <div>
              <div className="flex flex-row">
                <div className="w-2 h-2 bg-white mr-2 rounded-full my-auto"></div>
                <p className="font-light text-sm">Share your invite links</p>
              </div>
              <div className="flex flex-row pl-1 text-sm">
                <div className="h-9 w-0.5 bg-white mr-2"></div>
                <div className="flex flex-col text-xs">
                  <p className="my-auto font-light text-left text-white/50">
                    Get a free play pass for each friend
                  </p>
                  <p className="text-white/50 font-light text-left">10hr/min</p>
                </div>
              </div>
            </div>
            <img src={EiCheck} alt="Check" className="pb-5" />
          </div>

          {/* Invite Link 3 (Highlighted) */}
          <div className="w-11/12 mx-auto justify-between px-2 text-md flex flex-row">
            <div>
              <div className="flex flex-row text-[#FFC213]">
                <div className="w-2 h-2 bg-white mr-2 rounded-full my-auto"></div>
                <p className="font-light text-sm">Share your invite links</p>
              </div>
              <div className="flex flex-row pl-1 text-sm">
                <div className="h-9 w-0.5 bg-white mr-2"></div>
                <div className="flex flex-col text-xs">
                  <p className="my-auto font-light text-left text-[#FFC213]/50">
                    Get a free play pass for each friend
                  </p>
                  <p className="text-[#FFC213]/50 font-light text-left">10hr/min</p>
                </div>
              </div>
            </div>
            <img src={CompletedTimer} alt="Completed Timer" className="pb-5" />
          </div>

          {/* Invite Link 4 */}
          <div className="w-11/12 mx-auto justify-between px-2 text-md flex flex-row">
            <div>
              <div className="flex flex-row">
                <div className="w-2 h-2 bg-white mr-2 rounded-full my-auto"></div>
                <p className="font-light text-sm my-auto">Share your invite links</p>
              </div>
              <div className="flex flex-row pl-1 text-sm">
                <div className="h-9 w-0.5 bg-white mr-2"></div>
                <div className="flex flex-col text-xs">
                  <p className="my-auto font-light text-left text-white/50">
                    Get a free play pass for each friend
                  </p>
                  <p className="text-white/50 font-light text-left">10hr/min</p>
                </div>
              </div>
            </div>
            <img src={Timer} alt="Timer" className="pb-5" />
          </div>

          {/* Invite Link 5 */}
          <div className="w-11/12 mx-auto justify-between px-2 text-md flex flex-row">
            <div>
              <div className="flex flex-row">
                <div className="w-2 h-2 bg-white mr-2 rounded-full my-auto"></div>
                <p className="font-light text-sm my-auto">Share your invite links</p>
              </div>
              <div className="flex flex-row pl-1 text-sm">
                <div className="h-9 w-0.5 bg-white mr-2"></div>
                <div className="flex flex-col text-xs">
                  <p className="my-auto font-light text-left text-white/50">
                    Get a free play pass for each friend
                  </p>
                  <p className="text-white/50 font-light text-left">10hr/min</p>
                </div>
              </div>
            </div>
            <img src={Timer} alt="Timer" className="pb-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
