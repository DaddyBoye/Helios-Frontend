import React from 'react';
import { useState, useEffect, useRef } from 'react';
import StarryBackground from '../Components/StarryBackground';
import Minions from '../images/napoleon-exile-gettyimages-1288489073.jpg';
import Instagram from '../icons/insta-removebg-preview 1.svg';
import X from '../icons/x-removebg-preview 1.svg';
import YouTube from '../icons/yt-removebg-preview 1.svg';
import Telegram from '../icons/tg-removebg-preview 1.svg';
import Solis from '../icons/fdv 1.svg';
import Friends from '../icons/Friends Vector.svg';
import User from '../icons/edeef 1.svg'

const Earn = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

  const socialPlatforms = [
    { icon: Instagram, name: 'Instagram', text: 'Follow us on Instagram' },
    { icon: X, name: 'X', text: 'Follow our X account' },
    { icon: YouTube, name: 'YouTube', text: 'Subscribe to our YouTube' },
    { icon: Telegram, name: 'Telegram', text: 'Join us on Telegram' },
  ];

  const inviteTasks = [
    { title: 'Invite 5 friends', reward: '100 Solis' },
    { title: 'Invite 10 friends', reward: '250 Solis' },
    { title: 'Invite 20 friends', reward: '600 Solis' },
    { title: 'Invite 50 friends', reward: '2000 Solis' },
  ];

  const images = [Minions, Minions, Minions]; // Replace with actual image imports

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentImageIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentImageIndex]);

  const renderHeader = () => (
    <div className='flex flex-row items-center justify-between mt-4 m-2 bg-[#185C8D]/50 h-12 p-1 pl-2 rounded-lg'>
      <div className='flex flex-row items-center justify-center'>
        <img src={Solis} alt="Solis" className="w-8 h-8"/>
        <p className='text-base ml-1'>Earn</p>
      </div>
      <div className="relative flex my-auto h-6">
        <div className="flex flex-row items-center justify-between gap-3 rounded-full pl-3 pr-14 py-0.5 bg-[#185C8D]/80">
          <div className="flex flex-row items-center">
            <img src={Solis} alt="Solis" className="w-4 h-4" />
            <p className="ml-1 text-xs">10</p>
          </div>
          <div className="flex flex-row items-center">
            <img src={Friends} alt="Friends" className="w-6 h-6" />
            <p className="ml-1 text-xs">20</p>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FFD700] mr-1 rounded-full p-0.5 flex items-center justify-center">
          <img src={User} alt="User" className="w-8 h-8 rounded-full object-cover" />
        </div>
      </div>
    </div>
  );

  const renderImageCarousel = () => (
    <div ref={carouselRef} className='flex gap-2 pl-3 overflow-x-auto pr-3 hide-scrollbar snap-x snap-mandatory'>
      {images.map((image, index) => (
        <div key={index} className='w-10/12 max-h-50 rounded-2xl min-h-40 shrink-0 relative snap-center'>
          <img src={image} alt="" className="w-full h-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09161F] via-transparent to-[#09161F] rounded-2xl"></div>
          <div className="absolute top-4 left-4 text-white">
            <p className="text-lg font-bold">$30,000</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSocialSection = () => (
    <>
      <div className='flex flex-row items-center pt-5 pl-5 pb-1'>
        <img src={Friends} alt="Friends icon" className='w-6 h-6' />
        <h1 className='text-left ml-2 text-md'>Socials</h1>
      </div>
      <div className="p-1 pl-3 bg-[#194564]/80 w-11/12 flex flex-col mx-auto rounded-xl text-sm">
        {socialPlatforms.map((platform, index) => (
          <React.Fragment key={platform.name}>
            <div className="flex flex-row items-center py-1">
              <div className="bg-[#435B6D] rounded-lg flex items-center w-10 h-10 justify-center">
                <img src={platform.icon} alt={platform.name} className="w-9 h-9" />
              </div>
              <div className="flex flex-col pl-2 justify-between">
                <p className="text-left text-xs">{platform.text}</p>
                <p className="truncate w-40 text-white/50 text-xs">
                  Participate in our engagement program and increase your minerate by 20
                </p>
              </div>
            </div>
            {index < socialPlatforms.length - 1 && (
              <hr className="border-t border-white/30 my-1 ml-12" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );

  const renderInviteTasksSection = () => (
    <>
      <div className='flex flex-row items-center pt-5 pl-5 pb-1'>
        <img src={Friends} alt="Friends icon" className='w-6 h-6' />
        <h1 className='text-left ml-2 text-md'>Invite Tasks</h1>
      </div>
      <div className='flex gap-2 pl-3 overflow-x-auto pr-3 hide-scrollbar'>
        {inviteTasks.map((task, index) => (
          <div key={index} className='w-5/12 bg-[#194564]/80 rounded-xl p-3 flex flex-col justify-between shrink-0'>
            <div className="bg-[#435B6D] rounded-lg flex items-center w-10 h-10 justify-center mb-2">
              {/* You can replace this with the actual icon */}
              <img src={Friends} alt="Invite icon" className="w-6 h-6" />
            </div>
            <p className="text-left text-sm font-bold mb-1">{task.title}</p>
            <p className="text-left text-xs text-white/70">Reward: {task.reward}</p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="relative font-sans h-full pb-20 flex flex-col overflow-y-auto">
      <StarryBackground />
      <div className="relative z-10 flex flex-col text-center text-white flex-grow">
        {renderHeader()}
        {renderImageCarousel()}
        {renderSocialSection()}
        {renderInviteTasksSection()}
      </div>
    </div>
  );
};

export default Earn;