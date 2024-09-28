import background from '../images/Starryy.svg';
import friendsLogo from '../images/Mask group.svg';
import arrow from '../icons/Arrow 3.svg';

const Friends = () => {
  return (
    <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="z-10">
        <div className="mt-10 flex flex-col">
          <div className="w-20 mx-auto h-20 bg-[#D9D9D9] rounded-full">
            <img src={friendsLogo} alt="Three Friends" className="w-20 h-20" />
          </div>
          <p className="mx-auto text-3xl font-bold text-center text-white">
            Invite friends, earn points
          </p>
        </div>
        <div className="flex flex-col">
          <div className="pl-5 flex flex-col">
            <div className="mb-6 mt-8">
              <p className="text-white text-xl font-bold">How it works</p>
            </div>
            <div>
              <div className="relative">
                <div className="mb-8 flex">
                  <img
                    src={arrow}
                    alt="Arrow svg"
                    className="absolute top-1 left-0"
                  />
                  <div className="flex pl-6 flex-col">
                    <p className="text-white">Share your invite link</p>
                    <p className="text-[#87939D] text-sm">
                      Get a free play pass for each friend
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="mb-8 flex">
                  <img
                    src={arrow}
                    alt="Arrow svg"
                    className="absolute top-1 left-0"
                  />
                  <div className="flex pl-6 flex-col">
                    <p className="text-white">Your friend join Helois</p>
                    <p className="text-[#87939D] text-sm">
                    And start farming
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="mb-8 flex">
                  <img
                    src={arrow}
                    alt="Arrow svg"
                    className="absolute top-1 left-0"
                  />
                  <div className="flex pl-6 flex-col">
                    <p className="text-white">Score 10% from buddies</p>
                    <p className="text-[#87939D] text-sm">
                    Plus a extra 2.5% from their referrals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="mx-auto bg-[#DCAA19] mt-5 rounded-2xl pt-6 pb-6 w-4/6">
            Invite a friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friends;
