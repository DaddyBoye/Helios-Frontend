import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import Header from './Header';

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

interface Platform {
    icon: string;
    name: string;
    text: string;
    link: string;
    image: string;
    color: string;
    taskId: number; // Add taskId
}

interface InviteTask {
    title: string;
    reward: string;
    link: string;
    image: string;
    color: string;
    taskId: number; // Add taskId
}

interface ApiErrorResponse {
    error: string;  // Adjust this based on your API's actual response structure
    message: string;
}

type SelectedItem = CarouselImage | Platform | InviteTask;

interface SlidingMenuProps {
    selectedItem: SelectedItem;
    onClose: () => void;
    telegramId: string;
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
const SlidingMenu: React.FC<SlidingMenuProps> = ({ selectedItem, onClose, telegramId, minerate, friends}) => {
    const [isOpen, setIsOpen] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastClickTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (selectedItem) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [selectedItem]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const isCarouselImage = (item: SelectedItem): item is CarouselImage => {
        return 'benefits' in item && 'howTo' in item && 'longDescription' in item;
    };

    const isPlatform = (item: SelectedItem): item is Platform => {
        return 'icon' in item && 'text' in item;
    };

    const isInviteTask = (item: SelectedItem): item is InviteTask => {
        return 'reward' in item;
    };

    const getMenuHeight = () => {
      return isCarouselImage(selectedItem) ? 'h-full' : 'max-h-[48%] rounded-t-2xl';
  };

    const handleItemClick = (item: SelectedItem) => {
        if ('taskId' in item) {
          const currentTime = Date.now();
          lastClickTimeRef.current = currentTime;
    
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
    
          timerRef.current = setTimeout(() => {
            if (lastClickTimeRef.current === currentTime) {
              markTaskAsCompleted(item.taskId, telegramId);
            }
          }, 6000);
        }
      };
    
    // Listen for visibility change (when user returns to the app)
    useEffect(() => {
        const handleVisibilityChange = () => {
          if (!document.hidden) {
            const currentTime = Date.now();
            if (lastClickTimeRef.current && currentTime - lastClickTimeRef.current < 6000) {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
            }
          }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      }, []);

    const markTaskAsCompleted = async (taskId: number, telegramId: string) => {
        try {
            // Call the backend API to update the task as completed
            const response = await axios.patch(`https://server.therotrade.tech/api/users/complete-task/${telegramId}/${taskId}`);
    
            // Log success message
            console.log(`Task ${taskId} completed for user ${telegramId}:`, response.data.message);
        } catch (error) {
            // Type assertion to specify the error type
            const axiosError = error as AxiosError<ApiErrorResponse>;
    
            // Check if the error has a response from the server
            if (axiosError.response) {
                // Use the defined interface for the error response data
                console.error('Failed to complete the task:', axiosError.response.data.message);
            } else {
                console.error('Error completing the task:', axiosError.message);
            }
        }
    };

    // Click handler function
    const handlePlatformClick = (item: SelectedItem) => {
        handleItemClick(item); // Call your existing function to handle the item click
        window.open(item.link, '_blank'); // Open the platform link immediately
    };

    return (
        <div
            className={`fixed inset-0 bg-black backdrop-blur transition-opacity duration-300 ease-in-out ${
                isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'
            }`}
            onClick={handleClose}
        >

            {/* Info header, render only for carousel images */}
                {isCarouselImage(selectedItem) && (
                    <Header
                        minerate={minerate}
                        friendsCount={friends.length}
                    />
                )}
            <div
                className={`fixed w-full bottom-0 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                } ${getMenuHeight()} scrollbar-hide`}
                style={{ backgroundColor: selectedItem.color }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col p-4 text-white'>
                    {/* Header */}
                    {(isPlatform(selectedItem) || isInviteTask(selectedItem)) && (
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold">
                            {isCarouselImage(selectedItem) ? selectedItem.title : 
                             isPlatform(selectedItem) ? selectedItem.name :
                             isInviteTask(selectedItem) ? selectedItem.title : ''}
                        </h2>
                        <button onClick={handleClose} className="text-3xl">&times;</button>
                    </div>
                    )}
                    {/* Image and short description */}
                    {(isPlatform(selectedItem) || isInviteTask(selectedItem)) && (
                    <div className="flex items-center mb-3">
                        <img src={selectedItem.image} className="w-20 h-20 object-cover rounded-full mr-2" />
                        <p className="text-lg text-left">
                            {                             isPlatform(selectedItem) ? selectedItem.text :
                             isInviteTask(selectedItem) ? `Earn ${selectedItem.reward} by inviting friends!` : ''}
                        </p>
                    </div>
                    )}

                    {isCarouselImage(selectedItem) && (
                        <>
                            {/* Carousel items */}
                            <div className="flex flex-col gap-3 mb-44 mt-12">
                                {/* Challenge */}
                                <div
                                  className="bg-cover bg-center rounded-xl p-4 relative"
                                  style={{
                                    backgroundImage: `url(${selectedItem.image})`,
                                  }}
                                >
                                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div> {/* Add overlay */}
                                  <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-2">
                                      <h3 className="text-white text-lg font-bold">LUCKY DRAW</h3>
                                      <button className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                                        LEARN MORE
                                      </button>
                                    </div>
                                    <h2 className="text-white text-2xl font-bold mb-1">{selectedItem.title}</h2>
                                    <p className="text-yellow-300 text-sm flex items-center">
                                      {selectedItem.description}
                                    </p>
                                    <div className="flex space-x-2 mt-2">
                                      <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs flex items-center">
                                        <span className="mr-1">🎟️</span> Entry 10,000
                                      </div>
                                      <div className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs">
                                        13-20 Oct
                                      </div>
                                      <div className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs flex items-center">
                                        {`53,341`} {/* Use dynamic count */}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Prize breakdown */}
                                <div className="bg-blue-800 rounded-xl p-4">
                                    <h3 className="text-white text-lg font-bold mb-2">1st prize</h3>
                                    <div className="flex items-center">
                                        <span className="text-white text-3xl font-bold mr-2">$1,200</span>
                                        <span className="text-green-400 text-lg">in USDT</span>
                                    </div>
                                    {[
                                        { range: '2nd - 6th', amount: 150 },
                                        { range: '7th - 26th', amount: 30 },
                                        { range: '27th - 476th', amount: 1 },
                                    ].map((prize, index) => (
                                        <div key={index} className="flex justify-between text-white mt-2">
                                            <span>{prize.range} prize</span>
                                            <span className="flex items-center">
                                                ${prize.amount}
                                                <span className="text-green-400 ml-1">🟢</span>
                                            </span>
                                        </div>
                                    ))}
                                    <p className="text-white mb-2">
                                        <span className="text-yellow-400 text-lg mr-1">1 🎟️</span> = 1 chance to win
                                    </p>
                                </div>

                                {/* Ticket information */}
                                <div className="bg-blue-800 rounded-xl p-4 text-center">
                                  <p>Hack Helios</p>
                                  <p className='text-sm text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quos velit, laudantium dolorum dolor ad odit architecto asperiores alias minima ullam mollitia est dolorem at aliquam labore aperiam, nesciunt qui?</p>
                                </div>
                            </div>
                        </>
                    )}

                    {isPlatform(selectedItem) && (
                        <div className="mb-3">
                            <p>Follow us on {selectedItem.name} to stay updated with our latest news and events!</p>
                        </div>
                    )}

                    {isInviteTask(selectedItem) && (
                        <div className="mb-1">
                            <p>Invite your friends and earn rewards! The more friends you invite, the more Solis you can earn.</p>
                        </div>
                    )}

                    {/* Call to Action */}
                    {(isPlatform(selectedItem) || isInviteTask(selectedItem)) && (
                        <a
                            href={selectedItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black py-3 px-6 mb-5 rounded-lg text-center h-12 items-center justify-center text-lg font-semibold hover:bg-opacity-90 transition-colors"
                            onClick={(e) => {
                                // Prevent default behavior only for platform items
                                if (isPlatform(selectedItem)) {
                                    e.preventDefault(); // Only prevent default if it's a platform
                                    handlePlatformClick(selectedItem); // Handle the platform click logic
                                }
                            }}
                        >
                            {isPlatform(selectedItem) ? `Go to ${selectedItem.name}` :
                                isInviteTask(selectedItem) ? `Invite Friends` : ''}
                        </a>
                    )}
                </div>
            </div>
            
            {/* Action buttons, render only for carousel images */}
            {isCarouselImage(selectedItem) && (
                <div className="fixed bottom-0 left-0 right-0 mx-auto w-full justify-center p-4 bg-blue-900 flex flex-col space-y-3"
                     onClick={(e) => {
                     e.stopPropagation();  // Your actual button action
                  }}
                >
                    <p className="text-white">
                        Collect <span className="text-yellow-400 text-sm">5,971 🎟️</span> more to enter the draw
                    </p>
                    <button className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold text-sm">
                        JOIN DRAW 10,000 🎟️
                    </button>

                    <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold text-sm" onClick={handleClose}>
                        CLOSE
                    </button>
                </div>
            )}
        </div>
    );
};

export default SlidingMenu;