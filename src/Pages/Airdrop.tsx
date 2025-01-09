import { useOutletContext} from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect, memo  } from 'react';
import StarryBackground from '../Components/StarryBackground';
import EiCheck from '../icons/ei_check.svg';
import CompletedTimer from '../icons/basil_timer-outline.svg';
import Timer from '../icons/basil_timer-outline (1).svg';
import RoadmapCards from '../Components/RoadmapCards';
import Header from '../Components/Header';

interface InviteLink {
  title: string;
  description: string;
  textColor: string;
  icon: string;
  time: string;
  status: 'completed' | 'active' | 'upcoming';
}

interface OutletContext {
  minerate: number;
  friends: { length: number }[];
  avatarPath: string;
}

const TimelinePoint = memo(({ active, shouldAnimate }: { active: boolean; shouldAnimate: boolean }) => (
  <motion.div 
    initial={{ scale: 0 }}
    animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
    transition={{ 
      type: "spring", 
      stiffness: 300, 
      damping: 20,
      duration: 0.5
    }}
    className={`
      w-3 h-3 rounded-full 
      ${active ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-white/30'}
    `} 
  />
));

const TimelineItem = memo(({ item, index, shouldAnimate }: { 
  item: InviteLink; 
  index: number;
  shouldAnimate: boolean;
}) => {
  const isActive = item.status === 'active';
  const isCompleted = item.status === 'completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={shouldAnimate ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 1 + (index * 0.1)
      }}
      className="group relative w-11/12 mx-auto mb-4"
    >
      <div className="flex items-start space-x-3">
        <div className="flex flex-col items-center">
          <TimelinePoint active={isActive || isCompleted} shouldAnimate={shouldAnimate} />
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "4rem" }}
            transition={{ 
              duration: 0.5, 
              delay: shouldAnimate ? 1 + (index * 0.1) : 0 
            }}
            className={`
              w-0.5
              ${isActive || isCompleted ? 'bg-gradient-to-b from-yellow-400 to-white/20' : 'bg-white/20'}
            `} 
          />
        </div>
        
        <div className={`
          flex-1 p-4 rounded-lg
          ${isActive ? 'bg-gradient-to-r -mt-2 from-yellow-400/30 to-transparent' : '-mt-2 hover:bg-white/5'}
          transition-all duration-300
        `}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`
                text-sm font-medium mb-1
                ${isActive ? 'text-yellow-400' : 'text-white'}
              `}>
                {item.title}
              </h3>
              <p className={`
                text-xs font-light
                ${isActive ? 'text-yellow-400/80' : 'text-white/50'}
              `}>
                {item.description}
              </p>
              <p className={`
                text-xs mt-1
                ${isActive ? 'text-yellow-400/60' : 'text-white/30'}
              `}>
                {item.time}
              </p>
            </div>
            
            <div className={`
              p-2 rounded-full
              ${isActive ? 'bg-yellow-400/20' : 'bg-white/10'}
              transition-colors duration-300
            `}>
              <img 
                src={item.icon} 
                alt="status"
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Timeline = memo(({ inviteLinks, shouldAnimate }: { 
  inviteLinks: InviteLink[]; 
  shouldAnimate: boolean;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="space-y-2"
    >
      {inviteLinks.map((link, index) => (
        <TimelineItem 
          key={`${link.title}-${link.time}-${index}`} 
          item={link} 
          index={index}
          shouldAnimate={shouldAnimate}
        />
      ))}
    </motion.div>
  );
});

const HeaderContent = memo(({ shouldAnimate }: { shouldAnimate: boolean }) => (
  <>
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200,
        delay: 1
      }}
      className="py-1 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-14 rounded-2xl font-medium text-black shadow-lg shadow-yellow-400/20"
    >
      Roadmap
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay: 1.3 }}
      className="flex justify-center space-x-2 mt-4"
    >
      <TimelinePoint active={true} shouldAnimate={shouldAnimate} />
      <span className="text-sm text-yellow-400">January</span>
      <TimelinePoint active={false} shouldAnimate={shouldAnimate} />
    </motion.div>

    <div className="flex flex-row justify-between items-center w-full">
      <RoadmapCards />
    </div>

    <motion.div 
      initial={{ scaleX: 0 }}
      animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ delay: 1.5 }}
      className="border-t border-white/10 mx-5 my-6" 
    />
  </>
));

const Airdrop = () => {
  const { minerate, friends, avatarPath } = useOutletContext<OutletContext>();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const inviteLinks = useMemo(() => [
    {
      title: 'Debut',
      description: 'Kickstart your journey with our first product release',
      textColor: 'text-white/50',
      icon: EiCheck,
      time: 'November',
      status: 'completed' as const
    },
    {
      title: 'Mining',
      description: 'Explore and earn rewards through mining activities',
      textColor: 'text-yellow-400',
      icon: CompletedTimer,
      time: 'January',
      status: 'active' as const
    },
    {
      title: 'Gaming',
      description: 'Dive into the excitement with our first game release',
      textColor: 'text-blue-400',
      icon: Timer,
      time: 'February',
      status: 'upcoming' as const
    },
    {
      title: 'Minting',
      description: 'Get ready to trade by minting your own tokens',
      textColor: 'text-white/50',
      icon: Timer,
      time: 'March',
      status: 'upcoming' as const
    },
    {
      title: 'Trading',
      description: 'Trade your tokens in our decentralized marketplace',
      textColor: 'text-white/50',
      icon: Timer,
      time: 'May',
      status: 'upcoming' as const
    },
    {
      title: 'Voting',
      description: 'Vote on what you want to see next in our ecosystem',
      textColor: 'text-green-400',
      icon: Timer,
      time: 'July',
      status: 'upcoming' as const
    },
  ], []);
  

  return (
    <div className="relative font-sans h-full pb-24">
      <StarryBackground />

      <div className="relative z-10 text-center flex flex-col text-white">
        <div className="p-2" />
        <Header
          minerate={minerate}
          friendsCount={friends?.length}
          avatarPath={avatarPath}
        />

        <HeaderContent shouldAnimate={shouldAnimate} />
        <Timeline inviteLinks={inviteLinks} shouldAnimate={shouldAnimate} />
      </div>
    </div>
  );
};

export default memo(Airdrop);