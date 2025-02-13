import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import StarryBackground from '../Components/StarryBackground';
import Header from '../Components/Header';
import Instagram from '../icons/instagram.svg';
import X from '../icons/twitter.svg';
import YouTube from '../icons/youtube.svg';
import Telegram from '../icons/telegram.svg';
import Friends from '../icons/Friends Vector.svg';
import SlidingMenu from '../Components/SlidingMenu';
import Solis from '../images/Solis-coin.svg';
import Helios3 from '../images/helios 3 mascot.png'; 
import Helios6 from '../images/helios 6 mascot.png';
import Helios7 from '../images/helios 7 mascot.png';

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
    longDescription: string;
    taskId: number;
    shortCallToAction: string;
    status: 'Ongoing' | 'Upcoming' | 'Completed';
    statusColor: string;
    startDateDay: number;
    startDateMonth: string;
    endDateDay: number;
    endDateMonth: string;
    playerCount: string;
    prizeBreakdown: { range: string; amount: string }[];
    statusEmoji?: string;
}

type SelectedItem = Platform | InviteTask | CarouselImage;

interface TaskStatus {
    task_id: number;
    completed: boolean;
    claimed: boolean;
}

const VITE_SERVER2_URL = import.meta.env.VITE_SERVER2_URL;

const Earn = () => {
    const { toggleTaskbar, minerate, friends, telegramId, avatarPath } = useOutletContext<EarnProps>();
    const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [hideHeader, setHideHeader] = useState(false);

    const socialPlatforms: Platform[] = [
        { icon: Telegram, name: 'Telegram', text: 'Join our Telegram community', link: 'https://t.me/HeliosApp', image: Telegram, color: '#0088CC', taskId: 4, points: 2000 },
        { icon: Instagram, name: 'Instagram', text: 'Follow Our jouney on Insta', link: 'https://www.instagram.com/heliosapp.eco?igsh=MTluaWx1YzQ1NjAyaw==', image: Instagram, color: '#E1306C', taskId: 1, points: 1500 },
        { icon: X, name: 'X', text: 'Engage Helios on X', link: 'https://x.com/heliosbot_', image: X, color: '#1DA1F2', taskId: 2, points: 2000 },
        { icon: YouTube, name: 'YouTube', text: 'Subscribe to Our YouTube', link: 'https://www.youtube.com/@Helios-app', image: YouTube, color: '#FF0000', taskId: 3, points: 1500 },
    ];

    const inviteTasks: InviteTask[] = [
        { title: 'Invite 5 friends', reward: '10000', link: '', image: Friends, color: '#4CAF50', taskId: 5, referralThreshold: 5, points: 10000 },
        { title: 'Invite 10 friends', reward: '25000', link: '', image: Friends, color: '#2196F3', taskId: 6, referralThreshold: 10, points: 25000 },
        { title: 'Invite 20 friends', reward: '60000', link: '', image: Friends, color: '#FFC107', taskId: 7, referralThreshold: 20, points: 60000 },
        { title: 'Invite 50 friends', reward: '200000', link: '', image: Friends, color: '#FF5722', taskId: 8, referralThreshold: 50, points: 200000 },
    ];

    // Fetch task statuses on mount
    useEffect(() => {
        const fetchTaskStatuses = async () => {
            try {
                const response = await fetch(`${VITE_SERVER2_URL}/api/users/task-statuses/${telegramId}`);
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

    const isTaskCompletedAndClaimed = (taskId: number) => {
        const status = taskStatuses.find(status => status.task_id === taskId);
        return status?.completed && status?.claimed;
    };

    const isTaskClaimable = (taskId: number) => {
        const status = taskStatuses.find(status => status.task_id === taskId);
        return status?.completed && !status?.claimed;
    };

    const isInviteTaskClaimable = (task: InviteTask) => {
        const status = taskStatuses.find(status => status.task_id === task.taskId);
        if (!status?.completed || !status?.claimed) {
            return friends.length >= task.referralThreshold;
        }
        return false;
    };

    const getTaskStyle = (taskId: number) => {
        const completed = isTaskCompletedAndClaimed(taskId);
        const claimable = isTaskClaimable(taskId);
        
        return {
            opacity: completed ? 0.7 : 1,
            position: 'relative' as const,
            cursor: completed ? 'default' : 'pointer',
            backgroundColor: claimable ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
            marginLeft: claimable ? '4px' : '8px',
        };
    };

    const getInviteTaskStyle = (task: InviteTask) => {
        const status = taskStatuses.find(status => status.task_id === task.taskId);
        const completed = status?.completed && status?.claimed;
        const claimable = isInviteTaskClaimable(task);

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

    const TaskStatusBadge = ({ taskId }: { taskId: number }) => {
        const status = taskStatuses.find(status => status.task_id === taskId);
        
        if (status?.completed && status?.claimed) {
            return (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Completed
                </div>
            );
        }
        
        if (status?.completed && !status?.claimed) {
            return (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Claim Now
                </div>
            );
        }
        
        return null;
    };

    const images: CarouselImage[] = [
        { 
            image: Helios3, // Replace with the relevant image for Plastic-Free Challenge
            title: "Plastic-Free Challenge",
            startDateDay: 3,
            startDateMonth: 'Jan',
            endDateDay: 5,
            endDateMonth: 'Feb',
            taskId: 50,
            status: 'Ongoing',
            playerCount: "2k",
            statusColor: '#3B82F6',
            statusEmoji: '🔥',
            shortCallToAction: "Log your progress and ditch plastics!",
            description: "Join the Plastic-Free Challenge and report your progress.",
            link: 'https://forms.gle/RDako1gDgdCSGcGm6', // Replace with the correct link
            color: 'transparent',
            longDescription: "The Plastic-Free Challenge is all about reducing our reliance on single-use plastics. Over 15 days, participants are encouraged to track the number of plastic items avoided, share photos of their creative reusable alternatives, and reflect on the changes they've made. This challenge isn't just about competition; it's a step towards building sustainable habits and inspiring others to do the same. Small changes lead to big impact, so join us today and be part of the movement!",
            prizeBreakdown: [
                { range: '1st', amount: "100K" },
                { range: '2nd - 6th', amount: "50K" },
                { range: '7th - 26th', amount: "20K" },
            ],
        },
        { 
            image: Helios6, // Replace with the relevant image for Tree Planting Drive
            title: "Tree Planting Drive", 
            startDateDay: 15,
            startDateMonth: 'Feb',
            endDateDay: 20,
            endDateMonth: 'Feb',
            taskId: 60,
            status: 'Upcoming',
            statusColor: '#FBBF24',
            statusEmoji: '⏳',
            playerCount: "1.5K",
            shortCallToAction: "Sign up to plant your tree!",
            description: "Get ready for the Tree Planting Drive and make a difference.", 
            link: 'https://forms.gle/uydrMVoEgVXB4kAu6', // Replace with the correct link
            color: 'transparent',
            longDescription: "The Tree Planting Drive is your chance to contribute to reforestation and combat climate change. By planting a tree, you’re not just creating a greener planet; you’re also providing habitats for wildlife, improving air quality, and making your local area more beautiful. Snap a photo of the tree you plant and share its location (if you like) to inspire others in the community. This challenge is open to everyone, and even a single tree can make a difference. Let’s join hands and plant a forest, one tree at a time!",
            prizeBreakdown: [
                { range: '1st', amount: "150K" },
                { range: '2nd - 6th', amount: "75K" },
                { range: '7th - 26th', amount: "30K" },
            ],
        },
        { 
            image: Helios7, // Replace with the relevant image for Recycling Race
            title: "Recycling Race", 
            taskId: 70, 
            startDateDay: 1,
            startDateMonth: 'Nov',
            endDateDay: 15,
            endDateMonth: 'Nov',
            status: 'Completed',
            playerCount: "289",
            statusColor: '#34D399',
            statusEmoji: '✅',
            shortCallToAction: "Track your impact and compete!",
            description: "The Recycling Race helped participants recycle and track their impact.", 
            link: '', // Replace with the correct link
            color: 'transparent',
            longDescription: "The Recycling Race was an exciting opportunity for participants to showcase their commitment to sustainability. Over two weeks, hundreds of people tracked the number and types of items they recycled, such as paper, plastic, glass, and metal. This challenge encouraged better waste management practices and highlighted how simple actions can collectively lead to significant environmental impact. With an engaging leaderboard and amazing prizes, the Recycling Race proved that competition can drive positive change for our planet.",
            prizeBreakdown: [
                { range: '1st', amount: "100K" },
                { range: '2nd - 6th', amount: "75K" },
                { range: '7th - 26th', amount: "50K" },
            ],
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
            if (!isInviteTaskClaimable(item)) return; // Don't open if not claimable
        } else if ('text' in item) {
            // It's a social platform task
            const completed = isTaskCompletedAndClaimed(item.taskId);
            if (completed && !isTaskClaimable(item.taskId)) return;
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
        <div 
            ref={carouselRef} 
            className='flex gap-4 pl-3 overflow-x-auto pr-3 mt-16 hide-scrollbar snap-x snap-mandatory scroll-smooth'
        >
            {images.map((imageInfo, index) => (
                <div 
                    key={index} 
                    className='w-10/12 max-h-50 rounded-2xl min-h-40 shrink-0 relative snap-center 
                    transition-all duration-300
                    cursor-pointer'
                    onClick={() => handleItemClick(imageInfo)}
                >
                    {/* Image with improved overlay */}
                    <img 
                        src={imageInfo.image} 
                        alt={imageInfo.title} 
                        className="w-full h-full object-cover rounded-2xl"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#09161F]/70 via-transparent to-[#09161F] rounded-2xl"></div>
                    
                    {/* Top section with status and date */}
                    <div className='absolute top-3 left-3 w-full justify-between flex'>
                        {/* Status Badge */}
                        <div 
                            className='px-3 py-1.5 rounded-2xl text-xs font-medium text-black'
                            style={{backgroundColor: imageInfo.statusColor}}
                        >
                            {imageInfo.status}
                        </div>
                        
                        {/* Date Badge */}
                        <div 
                            className="absolute right-5"
                        >
                            <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur px-3 py-2 rounded-xl border border-gray-700/50"
                                style={{ borderColor: imageInfo.statusColor }}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-white text-[8px] uppercase leading-none mb-0.5">
                                        {imageInfo.status === 'Upcoming' ? 'starts' : imageInfo.status === 'Ongoing' ? 'ends' : 'ended'}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500 font-bold text-base leading-none">
                                            {imageInfo.status === 'Upcoming' ? imageInfo.startDateDay : imageInfo.endDateDay}
                                        </span>
                                        <span className="text-yellow-500/80 text-xs uppercase tracking-wider">
                                            {imageInfo.status === 'Upcoming' ? imageInfo.startDateMonth : imageInfo.endDateMonth}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom text section */}
                    <div className="absolute text-left bottom-3 left-3 text-white">
                        <div className="text-lg font-bold mb-1">
                            {imageInfo.title}
                        </div>
                        <p className='text-sm opacity-80'>
                            {imageInfo.shortCallToAction}
                        </p>
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
        <div className="p-1 pl-1 bg-[#194564]/80 w-11/12 flex flex-col mx-auto rounded-xl text-sm">
            {socialPlatforms.map((platform, index) => {
                const completed = isTaskCompletedAndClaimed(platform.taskId);
                const claimable = isTaskClaimable(platform.taskId);
                
                return (
                    <React.Fragment key={platform.name}>
                        <div
                            className="flex flex-row items-center py-1 relative transition-all duration-300 rounded-lg"
                            style={getTaskStyle(platform.taskId)}
                            onClick={() => (!completed || claimable) && handleItemClick(platform)}
                        >
                            <div className="bg-[#435B6D] rounded-lg flex items-center p-2 w-10 h-10 justify-center" style={{ marginLeft: claimable ? '4px' : '0' }}>
                                <img src={platform.icon} alt={platform.name} className="w-9 h-9" />
                            </div>
                            <div className="flex flex-row items-center justify-between flex-1 pl-2">
                                <div className="flex flex-col">
                                    <p className="truncate text-left w-36 text-xs">{platform.text}</p>
                                    <p className="truncate text-left w-40 text-white/60 text-xs">
                                        {completed ? 'Task completed' : claimable ? 'Click to claim reward' : 'Engage for rewards'}
                                    </p>
                                </div>
                                {(!completed || claimable) && (
                                    <div className="px-2 py-1 rounded-md text-white text-xs flex items-center">
                                        <span className='my-auto font-semibold text-sm'>{platform.points}</span>
                                        <img src={Solis} alt="Reward icon" className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <TaskStatusBadge taskId={platform.taskId} />
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
                const claimable = isInviteTaskClaimable(task);
                
                return (
                    <div 
                        key={index} 
                        className='min-w-36 rounded-xl p-3 flex flex-col transition-all duration-300' 
                        style={getInviteTaskStyle(task)}
                        onClick={() => handleItemClick(task)}
                    >
                        <div className="bg-[#435B6D] rounded-lg flex items-center p-2 w-10 h-10 justify-center" >
                            <img src={Friends} alt="Invite icon" className="w-6 h-6" />
                        </div>
                        <p className="text-left text-sm font-bold mb-1">{task.title}</p>
                        <div className='flex items-center'>
                            <p className="text-left text-xs font-bold text-white/70">Earn: {task.reward}</p>
                            <img src={Solis} alt="Solis" className='w-8 h-8 -ml-1' />
                        </div>
                        <p className="text-left text-xs mt-1 text-white/70">
                            {getInviteTaskStatus(task)}
                        </p>
                        {completed && (
                            <div className="absolute top-4 right-1.5 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                Completed
                            </div>
                        )}
                        {claimable && !completed && (
                            <div className="absolute top-4 right-1.5 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                                Claim Now
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </>
);

    return (
        <div className="relative font-sans h-full pb-24 flex flex-col overflow-y-auto">
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