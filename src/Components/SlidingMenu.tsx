import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import Header from './Header';
import Friends from '../icons/Friends Vector.svg';

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

interface ApiErrorResponse {
  error: string;
  message: string;
}

interface TaskStatus {
  task_id: number;
  completed: boolean;
  claimed: boolean;
}

type SelectedItem = CarouselImage | Platform | InviteTask;

interface SlidingMenuProps {
  selectedItem: SelectedItem;
  onClose: () => void;
  telegramId: string;
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

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SlidingMenu: React.FC<SlidingMenuProps> = ({
  selectedItem,
  onClose,
  telegramId,
  minerate,
  friends,
  avatarPath
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setIsOpen(true);
      fetchTaskStatuses();
    } else {
      setIsOpen(false);
    }
  }, [selectedItem]);

  const fetchTaskStatuses = async () => {
    try {
      const response = await fetch(`${VITE_SERVER_URL}/api/users/task-statuses/${telegramId}`);
      if (response.ok) {
        const data = await response.json();
        setTaskStatuses(data);
      }
    } catch (error) {
      console.error('Error fetching task statuses:', error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleClaimReward = async (taskId: number) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${VITE_SERVER_URL}/api/airdrops/increase/${telegramId}/${taskId}`,
        {
          taskPoints: (selectedItem as Platform | InviteTask).points,
        }
      );
      
      console.log(response.data);
      await fetchTaskStatuses(); // Refresh task statuses after claiming
    } catch (error) {
      console.error('Error claiming reward:', error);
    }
    setIsLoading(false);
  };

  const isCarouselImage = (item: SelectedItem): item is CarouselImage => {
    return 'benefits' in item && 'howTo' in item && 'longDescription' in item;
  };

  const isPlatform = (item: SelectedItem): item is Platform => {
    return 'icon' in item && 'text' in item;
  };

  const isInviteTask = (item: SelectedItem): item is InviteTask => {
    return 'reward' in item && 'referralThreshold' in item;
  };

  const handleItemClick = (item: SelectedItem | CarouselImage) => {
    const currentTime = Date.now();
  
    if ('taskId' in item) {
      if (lastClickTimeRef.current && currentTime - lastClickTimeRef.current < 6000) {
        console.log("User interacted again within 6 seconds, canceling task completion.");
        return;
      }
  
      lastClickTimeRef.current = currentTime;
  
      timerRef.current = setTimeout(() => {
        markTaskAsCompleted(item.taskId, telegramId);
      }, 6000);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const currentTime = Date.now();
  
        if (lastClickTimeRef.current && currentTime - lastClickTimeRef.current < 6000) {
          console.log("User returned to the app within 6 seconds, canceling task completion.");
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
      const response = await axios.patch(`${VITE_SERVER_URL}/api/users/complete-task/${telegramId}/${taskId}`);
      console.log(`Task ${taskId} completed for user ${telegramId}:`, response.data.message);
      await fetchTaskStatuses(); // Refresh task statuses after completion
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (axiosError.response) {
        console.error('Failed to complete the task:', axiosError.response.data.message);
      } else {
        console.error('Error completing the task:', axiosError.message);
      }
    }
  };

  const handlePlatformClick = (item: SelectedItem | CarouselImage) => {
    handleItemClick(item);
    window.open(item.link, '_blank');
  };

  const renderInviteTaskContent = (task: InviteTask) => {
    const status = taskStatuses.find(s => s.task_id === task.taskId);
    const progress = friends.length;
    const remaining = Math.max(0, task.referralThreshold - progress);

    if (status?.completed && status?.claimed) {
      return (
        <div className="p-4">
          <div className="bg-green-500/20 rounded-lg p-4 mb-4">
            <h3 className="text-green-500 font-bold mb-2">Task Completed!</h3>
            <p className="text-sm text-white/70">
              You've successfully completed this task and claimed your reward of {task.reward}.
            </p>
          </div>
        </div>
      );
    }

    if (progress >= task.referralThreshold && (!status?.completed || !status?.claimed)) {
      return (
        <div className="px-4">
          <div className="bg-white/20 border-solid border-2 border-[#B4CADA] backdrop-blur-md rounded-2xl px-4 py-2 mb-4">
            <h3 className="text-yellow-500 font-bold mb-2">Ready to Claim!</h3>
            <p className="text-sm text-white/70">
              Congratulations! You've met the threshold to claim your reward.
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-white/70 mb-4">
              {task.reward} is waiting for you!
            </p>
            <button
              onClick={() => handleClaimReward(task.taskId)}
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Claiming...' : 'Claim Reward'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="px-4">
        <div className="bg-blue-500/20 rounded-lg px-4 mb-4">
          <h3 className="text-white font-bold mb-2">Task In Progress</h3>
          <p className="text-sm text-white/70">
            Keep going! Invite {remaining} more {remaining === 1 ? 'friend' : 'friends'} to claim your reward.
          </p>
        </div>

        <div className="mt-4">
          <h4 className="font-bold mb-2">Your Referral Link</h4>
          <div className="bg-gray-800 p-3 rounded-lg flex items-center justify-between">
            <p className="text-sm text-white/70 truncate">
              https://app.helios.net/ref/{telegramId}
            </p>
            <button 
              onClick={() => navigator.clipboard.writeText(`https://app.helios.net/ref/${telegramId}`)}
              className="ml-2 text-blue-500 hover:text-blue-400"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 bg-black backdrop-blur transition-opacity duration-300 ease-in-out ${
        isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      {isCarouselImage(selectedItem) && (
        <Header
          minerate={minerate}
          friendsCount={friends.length}
          avatarPath={avatarPath}
        />
      )}

      <div
        className={`fixed w-full bottom-0 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${isCarouselImage(selectedItem) ? 'h-full' : 'max-h-[48%] rounded-t-2xl'}`}
        style={{ backgroundColor: selectedItem.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col p-4 text-white'>
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

          {isInviteTask(selectedItem) ? (
            renderInviteTaskContent(selectedItem)
          ) : isPlatform(selectedItem) ? (
            <div className="flex flex-col">
              <div className="flex items-center mb-3">
                <img
                  src={selectedItem.image}
                  className="w-20 h-20 object-cover rounded-full mr-2"
                  alt=""
                />
                <p className="text-md text-left">{selectedItem.text}</p>
              </div>

              {!taskStatuses.find(s => s.task_id === selectedItem.taskId)?.completed && (
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black py-3 px-6 mb-5 rounded-lg text-center h-12 flex items-center justify-center text-lg font-semibold hover:bg-opacity-90 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlatformClick(selectedItem);
                  }}
                >
                  {`Go to ${selectedItem.name}`}
                </a>
              )}

              {taskStatuses.find(s => s.task_id === selectedItem.taskId)?.completed && 
               !taskStatuses.find(s => s.task_id === selectedItem.taskId)?.claimed && (
                <button
                  className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold text-sm mb-5"
                  onClick={() => handleClaimReward(selectedItem.taskId)}
                  disabled={isLoading}
                >
                  {isLoading ? 'CLAIMING...' : 'CLAIM REWARD'}
                </button>
              )}

              {taskStatuses.find(s => s.task_id === selectedItem.taskId)?.completed && 
               taskStatuses.find(s => s.task_id === selectedItem.taskId)?.claimed && (
                <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-sm mb-5" disabled>
                  COMPLETED
                </button>
              )}
            </div>
          ) : isCarouselImage(selectedItem) && (
                        <>
                            {/* Carousel items */}
                            <div className="flex flex-col gap-3 mb-44 mt-12">
                                {/* Challenge */}
                                <div
                                  className="bg-cover bg-center rounded-xl relative"
                                  style={{
                                    backgroundImage: `url(${selectedItem.image})`,
                                  }}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-b from-[#09161F] via-transparent to-[#09161F] rounded-lg"></div>
                                  <div className="relative z-10">
                                    <div className="flex justify-between px-3 pt-3 h-28 mb-2">
                                    <h2 className="text-white text-lg font-bold mb-1">Weekly Challenge</h2>
                                      <button className="bg-blue-700 text-white px-3 mb-auto py-0.5 rounded-full text-xs">
                                        LEARN MORE
                                      </button>
                                    </div>
                                    <div className='bg-black/30 rounded-b-xl backdrop-blur-sm py-2 px-2'>
                                    <h2 className="text-white text-sm font-bold text-left">{selectedItem.title}</h2>
                                      <p className="text-white/50 text-xs flex text-left">
                                        {selectedItem.description}
                                      </p>
                                      <div className="flex space-x-2 mt-2">
                                        <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs flex items-center">
                                          <span className="mr-1">🎟️</span> Entry 10,000
                                        </div>
                                        <div className="">
                            <div className="flex items-center gap-1.5 bg-gray-900/50 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-700/50"
                            style={{borderColor: selectedItem.statusColor}}
                            >
                            <span className="text-yellow-500 font-bold text-lg leading-none">{selectedItem.endDateDay}</span>
                            <div className="w-px h-4 bg-gray-700/50"></div>
                            <span className="text-yellow-500/80 text-xs uppercase tracking-wider">{selectedItem.endDateMonth}</span>
                        </div>
                        </div>
                                        <div className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center">
                                          <img src={Friends} alt="Users Icon" className='mr-1'/>{selectedItem.playerCount}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Prize breakdown */}
                                <div className="bg-[#1B27AA] rounded-xl p-4">
                                    <div className='flex justify-between mt-2 mb-4'>
                                      <div className="text-white text-lg font-bold ">1st prize</div>
                                      <div className="flex">
                                          <span className="text-green-400 text-xs mt-auto mb-1 mr-1">in USDT</span>
                                          <span className="text-white text-xl font-bold mr-2">$1,200</span>
                                      </div>
                                    </div>
                                    {[
                                        { range: '2nd - 6th', amount: 150 },
                                        { range: '7th - 26th', amount: 30 },
                                        { range: '27th - 476th', amount: 1 },
                                    ].map((prize, index) => (
                                        <div key={index} className="flex justify-between text-sm text-white mt-2 mb-2">
                                            <span>{prize.range} prize</span>
                                            <span className="flex items-center">
                                                ${prize.amount}
                                                <span className="text-green-400 ml-1">🟢</span>
                                            </span>
                                        </div>
                                    ))}
                                    <p className="text-white mb-2 hidden">
                                        <span className="text-yellow-400 text-lg mr-1">1 🎟️</span> = 1 chance to win
                                    </p>
                                </div>

                                {/* Ticket information */}
                                <div className="bg-[#1B27AA] rounded-xl p-4 text-center">
                                  <p>Hack Helios</p>
                                  <p className='text-sm text-left text-center'>{selectedItem.longDescription}</p>
                                </div>
                            </div>
                        </>
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