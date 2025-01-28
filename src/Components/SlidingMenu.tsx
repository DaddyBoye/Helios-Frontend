import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import Header from './Header';
import Friends from '../icons/Friends Vector.svg';
import Solis from '../icons/Solis-coin.svg';

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

const VITE_SERVER2_URL = import.meta.env.VITE_SERVER2_URL;

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
      const response = await fetch(`${VITE_SERVER2_URL}/api/users/task-statuses/${telegramId}`);
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
        `${VITE_SERVER2_URL}/api/airdrops/increase/${telegramId}/${taskId}`,
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
    return 'longDescription' in item;
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
      const response = await axios.patch(`${VITE_SERVER2_URL}/api/users/complete-task/${telegramId}/${taskId}`);
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

    if (progress >= task.referralThreshold && (!status?.completed || !status?.claimed)) {
      return (
      <div className="flex flex-col">
        <div className="flex items-center mb-3">
        <img
          src={task.image}
          className="w-20 h-20 mr-2"
          alt="Task Image"
        />
        <p className="text-md text-left">
          Congratulations! You've met the threshold to claim your reward.
        </p>
        </div>
        <button
        onClick={() => handleClaimReward(task.taskId)}
        disabled={isLoading}
        className="w-full bg-yellow-700 h-12 text-white py-3 rounded-xl font-bold text-sm mb-5 flex items-center justify-center"
        >
        {isLoading ? 'CLAIMING...' : (
          <>
          CLAIM <img src={Solis} alt="Solis" className="h-10 w-10 -mr-1" />{task.points}
          </>
        )}
        </button>
      </div>
      );
    }

    if (status?.completed && status?.claimed) {
      return (
      <div className="flex flex-col">
        <div className="flex items-center mb-3">
        <img
          src={task.image}
          className="w-20 h-20 mr-2"
          alt="Task Image"
        />
        <p className="text-md text-left">
          You have successfully claimed your reward.
        </p>
        </div>
        <button
        className="w-full bg-green-500 h-12 text-white py-3 rounded-xl font-bold text-sm mb-5 flex items-center justify-center"
        disabled
        >
        COMPLETED
        </button>
      </div>
      );
    }
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
                  className="bg-white text-black py-3 px-6 mb-5 rounded-xl text-center h-11 flex items-center justify-center text-lg font-semibold hover:bg-opacity-90 transition-colors"
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
                  className="w-full bg-yellow-700 h-12 text-black py-3 rounded-xl font-bold text-sm mb-5 flex items-center justify-center"
                  onClick={() => handleClaimReward(selectedItem.taskId)}
                  disabled={isLoading}
                >
                  {isLoading ? 'CLAIMING...' : (
                  <>
                    CLAIM <img src={Solis} alt="Solis" className="h-10 w-10 -mr-1" />{selectedItem.points}
                  </>
                  )}
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
              <div className="flex flex-col gap-3 mb-48 mt-12">
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
                  <h2 className="text-white text-lg font-bold mb-1">{selectedItem.title}</h2>
                </div>
                <div className='bg-black/30 rounded-b-xl backdrop-blur-sm py-2 px-2'>
                  <p className="text-white/50 text-xs flex text-left">
                  {selectedItem.description}
                  </p>
                  <div className="flex flex-row mt-2">
                  <div className="flex items-center space-x-2">
                    <div 
                    className="text-white bg-transparent px-2 py-1 rounded-full text-xs flex items-center border"
                    style={{borderColor: selectedItem.statusColor}} 
                    >
                    <span className="mr-1">{selectedItem.statusEmoji}</span> {selectedItem.status}
                    </div>
                    <div className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <img src={Friends} alt="Users Icon" className='mr-1'/>{selectedItem.playerCount}
                    </div>
                  </div>
                  
                    {/* Date Range */}
                    <div className="flex ml-2 items-center gap-2 bg-gray-900/50 backdrop-blur px-3 py-1 rounded-xl border border-gray-700/50"
                    style={{borderColor: selectedItem.statusColor}}
                    >
                    {/* Start Date */}
                    <div className="flex flex-col items-center">
                      <span className="text-white text-[8px] uppercase leading-none mb-0.5">starts</span>
                      <div className="flex items-center gap-1">
                      <span className="text-yellow-500 font-bold text-sm leading-none">{selectedItem.startDateDay}</span>
                      <span className="text-yellow-500/80 text-[10px] uppercase tracking-wider">{selectedItem.startDateMonth}</span>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="h-full border-l border-gray-700/50"></div>
                    
                    {/* End Date */}
                    <div className="flex flex-col items-center">
                      <span className="text-white text-[8px] uppercase leading-none mb-0.5">ends</span>
                      <div className="flex items-center gap-1">
                      <span className="text-yellow-500 font-bold text-sm leading-none">{selectedItem.endDateDay}</span>
                      <span className="text-yellow-500/80 text-[10px] uppercase tracking-wider">{selectedItem.endDateMonth}</span>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Prize breakdown */}
              <div className="rounded-xl p-4 bg-gradient-to-br from-black/50 to-black/60 space-y-4 shadow-lg">
                <div className="flex justify-between items-center border-b border-white/20 pb-2 mb-2">
                <div className="text-white text-lg font-bold tracking-wide">1st Prize</div>
                <div className="flex items-baseline">
                  <span className="text-yellow-500 text-xs mr-2 opacity-80">in $HELIOS</span>
                  <span className="text-white text-2xl font-extrabold">{selectedItem.prizeBreakdown[0].amount}</span>
                </div>
                </div>
                {selectedItem.prizeBreakdown.slice(1).map((prize, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center text-sm text-white/90 hover:bg-white/10 transition-colors rounded-md px-2 py-1"
                >
                  <span className="font-medium">{prize.range} Prize</span>
                  <span className="flex items-center">
                  <img src={Solis} alt="Helios Coin" className='w-10 -mr-2 h-10' />
                  <span className="font-semibold">{prize.amount}</span>
                  </span>
                </div>
                ))}
              </div>

              {/* Ticket information */}
              <div className="bg-gradient-to-br from-black/50 to-black/60 rounded-xl p-4 text-center space-y-3">
                <h3 className="text-lg font-bold text-white">{selectedItem.title}</h3>
                <p className="text-sm text-white/70 text-center">{selectedItem.longDescription}</p>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Action buttons, render only for carousel images */}
      {isCarouselImage(selectedItem) && (
        <div
          className="fixed bottom-0 left-0 right-0 mx-auto max-w-md w-full z-50 shadow-2xl"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation
          }}
        >
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-t-xl p-4 space-y-4 shadow-lg">
            {/* Dynamic call-to-action message */}
            <div className="text-center">
              {selectedItem.status === 'Ongoing' && (
                <p className="text-white text-md tracking-wide leading-relaxed">
                  Log your progress to participate in the <span className="font-bold text-yellow-300">{selectedItem.title}</span>! 🌍
                </p>
              )}
              {selectedItem.status === 'Upcoming' && (
                <p className="text-white text-md tracking-wide leading-relaxed">
                  Get ready for the <span className="font-bold text-yellow-300">{selectedItem.title}</span> starting on{' '}
                  <span className="text-green-300">{selectedItem.startDateDay} {selectedItem.startDateMonth}</span>! 🎉
                </p>
              )}
              {selectedItem.status === 'Completed' && (
                <p className="text-white text-md tracking-wide leading-relaxed">
                  The <span className="font-bold text-yellow-300">{selectedItem.title}</span> has ended. Stay tuned for future challenges! ✅
                </p>
              )}
            </div>

            {/* Call-to-action buttons */}
            <div className="space-y-3">
              {selectedItem.status === 'Ongoing' && (
                <button
                  className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold text-sm 
                  transition-all duration-300 ease-in-out hover:bg-yellow-400 
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
                  onClick={() => window.open(selectedItem.link, '_blank')}
                >
                  LOG YOUR PROGRESS 🚀
                </button>
              )}
              {selectedItem.status === 'Upcoming' && (
                <button
                  className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold text-sm 
                  transition-all duration-300 ease-in-out hover:bg-yellow-400 
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
                  onClick={() => window.open(selectedItem.link, '_blank')}
                >
                  SIGN UP NOW 🌱
                </button>
              )}
              {selectedItem.status === 'Completed' && (
                <button
                  className="w-full bg-gray-600 text-white py-3 rounded-xl font-bold text-sm 
                  opacity-70 cursor-not-allowed"
                  disabled
                >
                  CHALLENGE ENDED 🏁
                </button>
              )}

              {/* Close button */}
              <button
                className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold text-sm 
                transition-all duration-300 ease-in-out hover:bg-blue-600 
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidingMenu;