import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import Header from '../Components/Header';
//import Subtract from '../images/Subtract.png';
import RoundProgress from "../Components/CircularProgress";
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
      <div className='flex flex-col w-10/12 mt-16 mx-auto'>
        <div className='rounded-full mt-3 ml-auto w-fit -mb-9 bg-green-500'>
          <p className='px-2 text-sm text-white py-1'>This Week</p>
        </div>
        <div className='subtract'>
          <div className='p-5 h-48 flex flex-col bg-[linear-gradient(to_right,_#444f5e,_#6E7681)]'>
            <div className='flex flex-row'>
              <div className="ml-10 mt-8">
                <RoundProgress progress={80} total={240} />
              </div>
              <div className='flex flex-col'>
                <div className='border-1 border'>

                </div>
              </div>
            </div>
            <hr className='mt-16'/>
            <div>

            </div>
          </div>
        </div>
      </div>

      </div>     
    </div>
  );
  
}

export default Eco;
