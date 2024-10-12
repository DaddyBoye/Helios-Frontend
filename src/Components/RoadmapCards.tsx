import { useState, useEffect } from 'react';
import PickAxe from '../icons/hugeicons_mining-03.svg';

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
    { title: "Mining", icon: PickAxe, date: "Aug" },
    { title: "Farming", icon: PickAxe, date: "May" },
    { title: "Collect", icon: PickAxe, date: "June" },
    { title: "Mining", icon: PickAxe, date: "Aug" }
  ];

  useEffect(() => {
    if (isAnimating && activeIndex < 2) {
      const timer = setTimeout(() => {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }, 1000); // Change card every 1 second

      return () => clearTimeout(timer);
    } else if (activeIndex === 2) {
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
        className={`transition-all duration-300 ease-in-out ${
          isActive
            ? 'bg-[#FFC213] scale-110'
            : isHighlighted && hasBeenAnimated
            ? 'bg-[#FFC213] scale-110'
            : 'bg-gradient-to-br from-[#334B5F] to-[#608FB0] scale-100'
        } mining-card px-1 h-36 flex flex-col justify-around items-center py-4 rounded-2xl text-white`}
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
