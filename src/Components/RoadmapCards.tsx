import { useState, useEffect, useRef } from 'react';
import PickAxe from '../icons/hugeicons_mining-03.svg';
import Megaphone from '../icons/Megaphone.svg';
import Market from '../icons/Candlesticks.svg';
import Token from '../icons/majesticons_bitcoin-circle-line.svg';
import Ballot from '../icons/Ballot.svg';
import Joystick from '../icons/Joystick.svg';

const AnimatedActivityCards = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetHighlightIndex = 1;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setScrollIndex((prev) => (prev + 1) % cardData.length);
      }, 5000);
      return () => clearInterval(interval);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = -1;
      const highlightInterval = setInterval(() => {
        if (currentIndex < targetHighlightIndex) {
          setHighlightIndex(currentIndex + 1);
          currentIndex += 1;
        } else {
          clearInterval(highlightInterval);
        }
      }, 2000);

      return () => clearInterval(highlightInterval);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = (containerRef.current.children[0] as HTMLElement).offsetWidth;
      containerRef.current.scrollTo({
        left: scrollIndex * (cardWidth + 8),
        behavior: 'smooth'
      });
    }
  }, [scrollIndex]);

  const cardData = [
    { title: "Debut", icon: Megaphone, date: "Dec" },   // Platform launch
    { title: "Mining", icon: PickAxe, date: "Jan" },   // Mining features
    { title: "Gaming", icon: Joystick, date: "Feb" },    // Game release
    { title: "Minting", icon: Token, date: "May" },    // Token minting
    { title: "Trading", icon: Market, date: "July" },   // Marketplace launch
    { title: "Voting", icon: Ballot, date: "August" }    // Governance participation
  ];

  interface CardData {
    title: string;
    icon: string;
    date: string;
  }

  const renderCard = (index: number, { title, icon: Icon, date }: CardData) => {
    const isHighlighted = index === highlightIndex || (highlightIndex >= targetHighlightIndex && index === targetHighlightIndex);

    return (
      <div
        key={index}
        className={`
          relative
          transition-all duration-300 ease-in-out 
          min-w-[70px] h-32
          flex flex-col justify-around items-center 
          py-3 rounded-xl mx-1
          ${isHighlighted 
            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 scale-110 shadow-lg shadow-yellow-500/50'
            : 'bg-gradient-to-br from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900'
          }
          before:absolute before:inset-0 
          before:rounded-xl before:border 
          ${isHighlighted 
            ? 'before:border-yellow-300 before:shadow-inner before:shadow-yellow-400/30'
            : 'before:border-blue-700 before:shadow-inner before:shadow-blue-500/10'
          }
          after:absolute after:inset-0 
          after:rounded-xl after:bg-gradient-to-t 
          after:from-transparent after:via-transparent 
          ${isHighlighted 
            ? 'after:to-yellow-300/20'
            : 'after:to-blue-400/10'
          }
          overflow-hidden
          group
        `}
      >
        <p className="text-sm font-medium relative z-10 text-white group-hover:scale-105 transition-transform">
          {title}
        </p>
        <div className={`
          relative z-10 p-2 rounded-full 
          ${isHighlighted 
            ? 'bg-yellow-300/20' 
            : 'bg-blue-700/30'
          }
          group-hover:scale-110 transition-transform
        `}>
          <img 
            src={Icon} 
            alt={`${title} Icon`} 
            className="w-6 h-6 group-hover:rotate-12 transition-transform" 
          />
        </div>
        <p className="text-sm relative z-10 text-white/90">
          {date}
        </p>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="flex overflow-x-auto gap-2 py-4 px-2 w-full scrollbar-hide scroll-smooth"
    >
      {cardData.map((card, index) => renderCard(index, card))}
    </div>
  );
};

export default AnimatedActivityCards;