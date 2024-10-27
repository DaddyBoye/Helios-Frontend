import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { usePreloadedImages } from '../Components/PreloaderProvider';
import StarryBackground from '../Components/StarryBackground';
import Header from '../Components/Header';
import Instagram from '../icons/insta-removebg-preview 1.svg';
import X from '../icons/x-removebg-preview 1.svg';
import YouTube from '../icons/yt-removebg-preview 1.svg';
import Telegram from '../icons/tg-removebg-preview 1.svg';
import Friends from '../icons/Friends Vector.svg';
import SlidingMenu from '../Components/SlidingMenu';

interface EarnProps {
    toggleTaskbar: (isVisible: boolean) => void;
    friends: Friend[];
    minerate: number | null;
    telegramId: string;
    avatarPath: string | null;
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
    points: number;
}

interface InviteTask {
    title: string;
    reward: string;
    link: string;
    image: string;
    color: string;
    taskId: number;
    referralThreshold: number;
    points: number;
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
    taskId: number;
    shortCallToAction: string;
    status: 'Ongoing' | 'Upcoming' | 'completed';
    statusColor: string;
    startDateDay: number;
    startDateMonth: string;
    endDateDay: number;
    endDateMonth: string;
    playerCount: string;
}

type SelectedItem = Platform | InviteTask | CarouselImage;

interface TaskStatus {
    task_id: number;
    completed: boolean;
    claimed: boolean;
}

const Earn = () => {
    const { toggleTaskbar, minerate, friends, telegramId, avatarPath } = useOutletContext<EarnProps>();
    const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [hideHeader, setHideHeader] = useState(false);
    const preloadedImages = usePreloadedImages();

    const socialPlatforms: Platform[] = [
        { icon: Instagram, name: 'Instagram', text: 'Follow Our jouney on Insta', link: 'https://www.instagram.com', image: Instagram, color: '#E1306C', taskId: 1, points: 100 },
        { icon: X, name: 'X', text: 'Engage Helios on X', link: 'https://www.x.com', image: X, color: '#1DA1F2', taskId: 2, points: 100 },
        { icon: YouTube, name: 'YouTube', text: 'Subscribe to Our YouTube', link: 'https://www.youtube.com', image: YouTube, color: '#FF0000', taskId: 3, points: 100 },
        { icon: Telegram, name: 'Telegram', text: 'Join our Telegram community', link: 'https://www.telegram.org', image: Telegram, color: '#0088CC', taskId: 4, points: 100 },
    ];
    
    const inviteTasks: InviteTask[] = [
        { title: 'Invite 5 friends', reward: '100 Solis', link: '', image: Friends, color: '#4CAF50', taskId: 5, referralThreshold: 5, points: 100  },
        { title: 'Invite 10 friends', reward: '250 Solis', link: '', image: Friends, color: '#2196F3', taskId: 6, referralThreshold: 10, points: 500  },
        { title: 'Invite 20 friends', reward: '600 Solis', link: '', image: Friends, color: '#FFC107', taskId: 7, referralThreshold: 20, points: 1000  },
        { title: 'Invite 50 friends', reward: '2000 Solis', link: '', image: Friends, color: '#FF5722', taskId: 8, referralThreshold: 50, points: 10000  },
    ];
    
    // Fetch task statuses on mount
    useEffect(() => {
        const fetchTaskStatuses = async () => {
            try {
                const response = await fetch(`https://server.therotrade.tech/api/users/task-statuses/${telegramId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTaskStatuses(data);
                }
            } catch (error) {
                console.error('Error fetching task statuses:', error);
            }
        };

        if (telegramId) {
            fetchTaskStatuses();
        }
    }, [telegramId]);  
    
    const isTaskCompleted = (taskId: number) => {
        return taskStatuses.some(status => status.task_id === taskId && status.completed);
    };

    const isTaskClaimable = (task: InviteTask) => {
        const status = taskStatuses.find(status => status.task_id === task.taskId);
        // Check if task is not already completed and claimed
        if (!status?.completed || !status?.claimed) {
            // Check if friend count meets the threshold
            return friends.length >= task.referralThreshold;
        }
        return false;
    };

    const getInviteTaskStyle = (task: InviteTask) => {
        const status = taskStatuses.find(status => status.task_id === task.taskId);
        const completed = status?.completed && status?.claimed;
        const claimable = isTaskClaimable(task);

        return {
            opacity: completed ? 0.7 : 1,
            position: 'relative' as const,
            cursor: (completed || (!completed && !claimable)) ? 'default' : 'pointer',
            backgroundColor: claimable ? 'rgba(34, 197, 94, 0.2)' : 'rgba(25, 69, 100, 0.8)',
        };
    };

    const getInviteTaskStatus = (task: InviteTask) => {
        const status = taskStatuses.find(status => status.task_id === task.taskId);
        if (status?.completed && status?.claimed) {
            return 'Completed';
        }
        return `${friends.length}/${task.referralThreshold} friends`;
    };

    const getTaskStyle = (taskId: number) => {
        const completed = isTaskCompleted(taskId);
        return {
            opacity: completed ? 0.7 : 1,
            position: 'relative' as const,
            cursor: completed ? 'default' : 'pointer',
        };
    };

    const CompletedBadge = () => (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Completed
        </div>
    );

    const images: CarouselImage[] = [
        { 
            image: preloadedImages[0],  // Helios3
            title: "Referral Quest",
            startDateDay: 21,
            startDateMonth: 'Oct',
            endDateDay: 31,
            endDateMonth: 'Oct',
            taskId: 20,
            status: 'Ongoing',
            playerCount: "12K",
            statusColor: '#3B82F6',
            shortCallToAction: "Join the race for a chance at $100",
            description: "Join the Referral Race for a Shot at $100", 
            link: 'https://challenge.com',
            color: 'transparent',
            benefits: [
                "$100 cash prize for the first to reach 100 rewards",
                "15,000 Helios coins will also be awarded to the winner",
                "1,000 Helios coins for all participants who meet the threshold",
            ],
            howTo: [
                "Sign up on our website",
                "Share your referral link with friends",
                "Track your rewards in real-time",
                "Be the first to hit 100 rewards and claim your prize!",
            ],
            longDescription: "Compete in our exciting Referral Race and be the first to reach 100 rewards! The winner will snag $100 and 15,000 Helios coins. This is your chance to shine in the Helios ecosystem while driving engagement. "
        },
        { 
            image: preloadedImages[1],  // Helios 6
            title: "$15,000 Prize Pool", 
            startDateDay: 30,
            startDateMonth: 'Nov',
            endDateDay: 14,
            endDateMonth: 'Dec',
            taskId: 30,
            status: 'Upcoming',
            statusColor: '#FBBF24',
            playerCount: "24K",
            shortCallToAction: "Join the competition",
            description: "Join our event and compete for a share of the $15,000 prize pool.", 
            link: 'https://prizepool.com',
            color: 'transparent',
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
            image: preloadedImages[2],  // Helios 7
            title: "Hack Helios", 
            taskId: 40, 
            startDateDay: 15,
            startDateMonth: 'Oct',
            endDateDay: 29,
            endDateMonth: 'Oct',
            status: 'completed',
            playerCount: "8K",
            statusColor: '#34D399',
            shortCallToAction: "Join the hackathon to win amazing prizes",
            description: "Get involved in the Helios Hackathon and win amazing rewards!", 
            link: 'https://hackathon.com',
            color: 'transparent',
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
        if ('referralThreshold' in item) {
            // It's an invite task
            const status = taskStatuses.find(status => status.task_id === item.taskId);
            if (status?.completed && status?.claimed) return; // Don't open if completed and claimed
            if (!isTaskClaimable(item)) return; // Don't open if not claimable
        } else {
            // It's a social task
            if (isTaskCompleted(item.taskId)) return;
        }
        
        setSelectedItem(item);
        toggleTaskbar(false);
        setHideHeader(true);
    };

    const renderHeader = () => (
        <Header
        minerate={minerate}
        friendsCount={friends.length}
        avatarPath={avatarPath}
        />
    );

    const renderImageCarousel = () => (
        <div ref={carouselRef} className='flex gap-2 pl-3 overflow-x-auto pr-3 mt-16 hide-scrollbar snap-x snap-mandatory'>
            {images.map((imageInfo, index) => (
                <div key={index} className='w-10/12 max-h-50 rounded-2xl min-h-40 shrink-0 relative snap-center' onClick={() => handleItemClick(imageInfo)}>
                    <img src={imageInfo.image} alt={imageInfo.title} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#09161F] via-transparent to-[#09161F] rounded-2xl"></div>
                    <div className='absolute top-3 left-3 w-full justify-between flex'> 
                        <div className='bg-yellow-500 px-2 py-1 rounded-2xl text-xs text-black'
                        style={{backgroundColor: imageInfo.statusColor}}
                        >
                        <p >{imageInfo.status}</p>
                        </div>
                        <div className="absolute right-5">
                            <div className="flex items-center gap-1.5 bg-gray-900/50 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-700/50"
                            style={{borderColor: imageInfo.statusColor}}
                            >
                            <span className="text-yellow-500 font-bold text-lg leading-none">{imageInfo.endDateDay}</span>
                            <div className="w-px h-4 bg-gray-700/50"></div>
                            <span className="text-yellow-500/80 text-xs uppercase tracking-wider">{imageInfo.endDateMonth}</span>
                        </div>
                        </div>
                    </div>
                    <div className="absolute text-left bottom-2 left-3 text-white">
                        <div className="text-md font-semibold">{imageInfo.title}</div>
                        <p className='text-sm'>{imageInfo.shortCallToAction}</p>
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
                {socialPlatforms.map((platform, index) => {
                    const completed = isTaskCompleted(platform.taskId);
                    return (
                        <React.Fragment key={platform.name}>
                            <div 
                                className="flex flex-row items-center py-1 relative" 
                                style={getTaskStyle(platform.taskId)}
                                onClick={() => !completed && handleItemClick(platform)}
                            >
                                <div className="bg-[#435B6D] rounded-lg flex items-center w-10 h-10 justify-center">
                                    <img src={platform.icon} alt={platform.name} className="w-9 h-9" />
                                </div>
                                <div className="flex flex-col pl-2 justify-between">
                                    <p className="text-left text-xs">{platform.text}</p>
                                    <p className="truncate text-left w-40 text-white/60 text-xs">
                                        {completed ? 'Task completed' : 'Engage for rewards'}
                                    </p>
                                </div>
                                {completed && <CompletedBadge />}
                            </div>
                            {index < socialPlatforms.length - 1 && (
                                <hr className="border-t border-white/30 my-1 ml-12" />
                            )}
                        </React.Fragment>
                    );
                })}
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
                {inviteTasks.map((task, index) => {
                    const status = taskStatuses.find(status => status.task_id === task.taskId);
                    const completed = status?.completed && status?.claimed;
                    const claimable = isTaskClaimable(task);
                    
                    return (
                        <div 
                            key={index} 
                            className='w-5/12 rounded-xl p-3 flex flex-col justify-between shrink-0 relative transition-all duration-300' 
                            style={getInviteTaskStyle(task)}
                            onClick={() => handleItemClick(task)}
                        >
                            <div className="bg-[#435B6D] rounded-lg flex items-center w-10 h-10 justify-center mb-2">
                                <img src={Friends} alt="Invite icon" className="w-6 h-6" />
                            </div>
                            <p className="text-left text-sm font-bold mb-1">{task.title}</p>
                            <p className="text-left text-xs text-white/70">Reward: {task.reward}</p>
                            <p className="text-left text-xs mt-1 text-white/70">
                                {getInviteTaskStatus(task)}
                            </p>
                            {completed && (
                                <div className="absolute top-3 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    Completed
                                </div>
                            )}
                            {claimable && !completed && (
                                <div className="absolute top-3 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                                    Claimable
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );

    return (
        <div className="relative font-sans h-full pb-20 flex flex-col overflow-y-auto">
            <StarryBackground />
            <div className="relative z-10 flex flex-col text-center text-white flex-grow">
                {!hideHeader && renderHeader()}
                {renderImageCarousel()}
                {renderSocialSection()}
                {renderInviteTasksSection()}
                
                {selectedItem && (
                    <SlidingMenu
                        friends={friends}
                        avatarPath={avatarPath}
                        minerate={minerate}
                        selectedItem={selectedItem}
                        telegramId={telegramId} // Pass telegramId here
                        onClose={() => {
                            toggleTaskbar(true);
                            setSelectedItem(null);
                            setHideHeader(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Earn;