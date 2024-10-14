import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import Helios3 from '../images/helios 3 mascot 32.jpeg';
import Helios6 from '../images/helios 6 mascot 32.jpeg';
import Helios7 from '../images/helios 7 mascot 32.jpeg';
import Instagram from '../icons/insta-removebg-preview 1.svg';
import X from '../icons/x-removebg-preview 1.svg';
import YouTube from '../icons/yt-removebg-preview 1.svg';
import Telegram from '../icons/tg-removebg-preview 1.svg';
import Solis from '../icons/fdv 1 (1).svg';
import Friends from '../icons/Friends Vector.svg';
import User from '../icons/edeef 1.svg';
import SlidingMenu from '../Components/SlidingMenu';

interface EarnProps {
    toggleTaskbar: (isVisible: boolean) => void;
    friends: Friend[];
    minerate: number | null;
    telegramId: string;
  }

  interface Friend {
    id: number;
    name: string;
    score: number;
    avatar: string;
    referralCount: number;
  }

interface Platform {
    icon: string;
    name: string;
    text: string;
    link: string;
    image: string;
    color: string;
    taskId: number;
}

interface InviteTask {
    title: string;
    reward: string;
    link: string;
    image: string;
    color: string;
    taskId: number;
}

interface CarouselImage {
    image: string;
    title: string;
    description: string;
    link: string;
    color: string;
    benefits: string[];
    howTo: string[];
    longDescription: string;
}

type SelectedItem = Platform | InviteTask | CarouselImage;

const Earn = () => {
    const { toggleTaskbar, minerate, friends, telegramId } = useOutletContext<EarnProps>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const socialPlatforms: Platform[] = [
        { icon: Instagram, name: 'Instagram', text: 'Follow us on Instagram', link: 'https://www.instagram.com', image: Instagram, color: '#E1306C', taskId: 1},
        { icon: X, name: 'X', text: 'Follow our X account', link: 'https://www.x.com', image: X, color: '#1DA1F2', taskId: 2 },
        { icon: YouTube, name: 'YouTube', text: 'Subscribe to our YouTube', link: 'https://www.youtube.com', image: YouTube, color: '#FF0000', taskId: 3 },
        { icon: Telegram, name: 'Telegram', text: 'Join us on Telegram', link: 'https://www.telegram.org', image: Telegram, color: '#0088CC', taskId: 4 },
    ];
    
    const inviteTasks: InviteTask[] = [
        { title: 'Invite 5 friends', reward: '100 Solis', link: '/friends', image: Friends, color: '#4CAF50', taskId: 1 },
        { title: 'Invite 10 friends', reward: '250 Solis', link: '/friends', image: Friends, color: '#2196F3', taskId: 1 },
        { title: 'Invite 20 friends', reward: '600 Solis', link: '/friends', image: Friends, color: '#FFC107', taskId: 1 },
        { title: 'Invite 50 friends', reward: '2000 Solis', link: '/friends', image: Friends, color: '#FF5722', taskId: 1 },
    ];
    
    
    const images: CarouselImage[] = [
        { 
            image: Helios3, 
            title: "$30,000 Helios Challenge", 
            description: "Participate in the Helios Challenge and stand a chance to win $30,000!", 
            link: 'https://challenge.com',
            color: '#FFC107',
            benefits: [
                "Compete for a grand prize of $30,000",
                "Gain recognition in the Helios community",
            ],
            howTo: [
                "Register for the Helios Challenge on our website",
                "Complete daily tasks to earn points",
            ],
            longDescription: "The $30,000 Helios Challenge is our flagship competition designed to push the boundaries of innovation and creativity in the blockchain space. Over the course of 30 days, participants will engage in a series of increasingly complex tasks, ranging from smart contract development to decentralized application design."
        },
        { 
            image: Helios6, 
            title: "$15,000 Prize Pool", 
            description: "Join our event and compete for a share of the $15,000 prize pool.", 
            link: 'https://prizepool.com',
            color: '#4CAF50',
            benefits: [
                "Multiple prizes totaling $15,000",
                "Showcase your project to potential investors",
                "Receive mentorship from industry leaders",
                "Get featured on our platform and partner networks"
            ],
            howTo: [
                "Sign up for the competition on our website",
                "Form a team or join as an individual",
                "Attend our kickoff webinar for guidelines",
                "Develop your project over the 2-week period",
                "Present your work to our panel of judges"
            ],
            longDescription: "The $15,000 Prize Pool event is a fast-paced, high-energy competition designed to foster innovation in decentralized finance (DeFi). Over two exhilarating weeks, participants will work on creating novel DeFi solutions that address real-world financial challenges. This event is not just about the substantial prize money; it's an opportunity to gain visibility in the DeFi space, receive valuable feedback from experts, and potentially secure funding for your project. Whether you're focusing on yield farming, decentralized exchanges, or innovative lending protocols, this is your chance to make a lasting impact on the future of finance."
        },
        { 
            image: Helios7, 
            title: "Helios Hackathon", 
            description: "Get involved in the Helios Hackathon and win amazing rewards!", 
            link: 'https://hackathon.com',
            color: '#2196F3',
            benefits: [
                "Win cutting-edge tech gadgets and crypto prizes",
                "Get your project featured on Helios platforms",
                "Receive development grants for promising ideas",
                "Connect with leading blockchain companies for potential collaborations"
            ],
            howTo: [
                "Register your team on the Helios Hackathon portal",
                "Choose from our list of challenge statements",
                "Participate in pre-hackathon workshops",
                "Develop your solution during the 48-hour hackathon",
                "Present your prototype to our judging panel"
            ],
            longDescription: "The Helios Hackathon is an intense 48-hour coding marathon where creativity meets blockchain technology. This event brings together developers, designers, and blockchain enthusiasts from around the world to tackle some of the most pressing challenges in the crypto space. From scalability solutions to novel applications of smart contracts, the Helios Hackathon is where groundbreaking ideas come to life. With expert mentors on hand, a supportive community, and the chance to win amazing prizes, this hackathon is not just a competition—it's a launchpad for the next big innovations in blockchain technology. Whether you're a seasoned blockchain developer or a curious newcomer, the Helios Hackathon offers an unparalleled opportunity to learn, create, and potentially kickstart your career in the world of decentralized technologies."
        }
    ];   

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
                behavior: 'smooth',
            });
        }
    }, [currentImageIndex]);

    const handleItemClick = (item: SelectedItem) => {
        setSelectedItem(item);
        toggleTaskbar(false);
    };

    const renderHeader = () => (
        <div className='flex flex-row items-center justify-between mt-4 m-2 bg-[#185C8D]/50 h-12 p-1 pl-2 rounded-lg'>
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
    );

    const renderImageCarousel = () => (
        <div ref={carouselRef} className='flex gap-2 pl-3 overflow-x-auto pr-3 hide-scrollbar snap-x snap-mandatory'>
            {images.map((imageInfo, index) => (
                <div key={index} className='w-10/12 max-h-50 rounded-2xl min-h-40 shrink-0 relative snap-center' onClick={() => handleItemClick(imageInfo)}>
                    <img src={imageInfo.image} alt={imageInfo.title} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#09161F] via-transparent to-[#09161F] rounded-2xl"></div>
                    <div className="absolute top-4 left-4 text-white">
                        <p className="text-lg font-bold">{imageInfo.title}</p>
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
                        <div className="flex flex-row items-center py-1" onClick={() => handleItemClick(platform)}>
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
              <div 
                key={index} 
                className='w-5/12 bg-[#194564]/80 rounded-xl p-3 flex flex-col justify-between shrink-0'
                onClick={() => {
                    handleItemClick(task);
                    navigate(task.link); // Navigate to the friends page
                }}
                >
                <div className="bg-[#435B6D] rounded-lg flex items-center w-10 h-10 justify-center mb-2">
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
                
                {selectedItem && (
                    <SlidingMenu
                        selectedItem={selectedItem}
                        telegramId={telegramId} // Pass telegramId here
                        onClose={() => {
                            toggleTaskbar(true);
                            setSelectedItem(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Earn;