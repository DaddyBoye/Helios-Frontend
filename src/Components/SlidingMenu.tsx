import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';

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
}

const SlidingMenu: React.FC<SlidingMenuProps> = ({ selectedItem, onClose, telegramId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [allowMarkCompletion, setAllowMarkCompletion] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
        if (isCarouselImage(selectedItem)) {
            return 'max-h-[85%]';
        }
        return 'max-h-[52%]';
    };

    const handleItemClick = (item: SelectedItem) => {
        // Start timer when the social platform is clicked
        if ('taskId' in item) { // Check if taskId exists
            // Clear any existing timers to prevent multiple executions
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Reset the allowMarkCompletion flag
            setAllowMarkCompletion(true);            

            // Start a new timer
            timerRef.current = setTimeout(() => {
                if (allowMarkCompletion) {
                    markTaskAsCompleted(item.taskId, telegramId);
                }
            }, 6000); // 6 seconds
        }
    };
    
    // Listen for visibility change (when user returns to the app)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                // When returning to the page, prevent marking the task as completed
                setAllowMarkCompletion(false);
                if (timerRef.current) {
                    clearTimeout(timerRef.current); // Clear the timer
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
            <div
                className={`fixed w-full bottom-0 overflow-y-auto rounded-t-3xl transition-transform duration-300 ease-in-out transform ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                } ${getMenuHeight()}`}
                style={{ backgroundColor: selectedItem.color }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col p-6 text-white'>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold">
                            {isCarouselImage(selectedItem) ? selectedItem.title : 
                             isPlatform(selectedItem) ? selectedItem.name :
                             isInviteTask(selectedItem) ? selectedItem.title : ''}
                        </h2>
                        <button onClick={handleClose} className="text-3xl">&times;</button>
                    </div>

                    {/* Image and short description */}
                    <div className="flex items-center mb-3">
                        <img src={selectedItem.image} className="w-20 h-20 object-cover rounded-full mr-2" />
                        <p className="text-lg text-left">
                            {isCarouselImage(selectedItem) ? selectedItem.description : 
                             isPlatform(selectedItem) ? selectedItem.text :
                             isInviteTask(selectedItem) ? `Earn ${selectedItem.reward} by inviting friends!` : ''}
                        </p>
                    </div>

                    {isCarouselImage(selectedItem) && (
                        <>
                            {/* Long description */}
                            <div className="mb-3">
                                <h3 className="text-xl font-semibold mb-2">About</h3>
                                <p>{selectedItem.longDescription}</p>
                            </div>

                            {/* Benefits */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Benefits</h3>
                                <ul className="list-disc list-inside">
                                    {selectedItem.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* How to participate */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">How to Participate</h3>
                                <ol className="list-decimal list-inside">
                                    {selectedItem.howTo.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
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
                    <a
                        href={selectedItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black py-3 px-6 mb-5 rounded-lg text-center h-12 items-center justify-center text-lg font-semibold hover:bg-opacity-90 transition-colors"
                        onClick={(e) => {
                            // Prevent default behavior only for non-platform items
                            if (isPlatform(selectedItem)) {
                                e.preventDefault(); // Only prevent default if it's a platform
                                handlePlatformClick(selectedItem); // Handle the platform click logic
                            }
                        }}
                    >
                        {isCarouselImage(selectedItem) ? `Join ${selectedItem.title}` : 
                         isPlatform(selectedItem) ? `Go to ${selectedItem.name}` :
                         isInviteTask(selectedItem) ? `Invite Friends` : ''}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SlidingMenu;