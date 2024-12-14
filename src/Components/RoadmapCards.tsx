import { useState, useEffect } from 'react';
import PickAxe from '../icons/hugeicons_mining-03.svg';
import Megaphone from '../icons/Megaphone.svg';
import Market from '../icons/Candlesticks.svg';
import Token from '../icons/majesticons_bitcoin-circle-line.svg'

// Define an interface for the card data
interface CardData {
  title: string;
  icon: string; // Assuming icon is a string path, adjust as needed
  date: string;
}

const AnimatedActivityCards = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  // Define cardData with explicit CardData type
  const cardData: CardData[] = [
    { title: "Debut", icon: Megaphone, date: "Nov" },
    { title: "Mining", icon: PickAxe, date: "Dec" },
    { title: "Minting", icon: Token, date: "Feb" },
    { title: "Trading", icon: Market, date: "June" }
  ];

  useEffect(() => {
    if (isAnimating && activeIndex < 1) {
      const timer = setTimeout(() => {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }, 1000); // Change card every 1 second

      return () => clearTimeout(timer);
    } else if (activeIndex === 1) {
      setIsAnimating(false);
    }
  }, [activeIndex, isAnimating]);

  const renderCard = (index: number, { title, icon: Icon, date }: CardData) => {
    const isActive = index === activeIndex;
    const isHighlighted = index === 2;
    const hasBeenAnimated = index <= activeIndex;

    return (
      <div
        key={index}
        className={`transition-transform duration-300 ease-in-out transform ${
          isActive
            ? 'bg-[#FFC213] w-1/4 text-sm scale-110'
            : isHighlighted && hasBeenAnimated
            ? 'bg-[#FFC213] scale-110'
            : 'bg-gradient-to-br from-[#184261] to-[#184261] text-sm scale-100'
        } mining-card w-1/5 h-36 flex flex-col justify-around items-center py-4 rounded-2xl text-white`}
      >
        <p className={isHighlighted ? 'text-white' : 'text-white'}>{title}</p>
        <img src={Icon} alt={`${title} Icon`} className="w-10 h-10" />
        <p className={isHighlighted ? 'text-white' : 'text-white'}>{date}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-row px-1 w-full my-2 items-center justify-between">
      {cardData.map((card, index) => renderCard(index, card))}
    </div>
  );
};

export default AnimatedActivityCards;
