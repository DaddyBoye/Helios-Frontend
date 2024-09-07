import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import ReactIcon from '../assets/react.svg';
import Coin from '../images/dollar-coin.png';

interface CompletedAirdropsProps {
  completedProgress: number;
  onDivAdded: () => void;
  onDivReset: () => void;
  coinsEarned: number;
  onCoinsEarnedUpdate: (value: number) => void;
}

const CompletedAirdrops = forwardRef((props: CompletedAirdropsProps, ref) => {
  const { completedProgress, onDivAdded, onDivReset, coinsEarned, onCoinsEarnedUpdate } = props;

  const [divElements, setDivElements] = useState<JSX.Element[]>([]);
  const [elementCount, setElementCount] = useState<number>(0);
  const Ref = useRef<HTMLDivElement>(null);
  const [hasAddedDiv, setHasAddedDiv] = useState<boolean>(false);
  const [totalCoinsEarned, setTotalCoinsEarned] = useState<number>(0);
  const coinsEarnedRef = useRef<number>(coinsEarned);

  const clearArray = () => {
    setDivElements([]); // Clear the array
    setElementCount(0); // Reset the element count
    setHasAddedDiv(false); // Reset the flag
    setTotalCoinsEarned(0);
    updateCoinsEarned();
    onDivReset(); // Reset the coins earned in the parent component as well
  };

  const updateCoinsEarned = () => {
    if (elementCount === 8) {
      coinsEarnedRef.current = coinsEarned;
    }
  };

  useImperativeHandle(ref, () => ({
    emptyArray: clearArray,
  }));
  
  useEffect(() => {
    if (completedProgress === 0) {
      coinsEarnedRef.current = coinsEarned; // Update progressRate when progress resets
    }
  }, [completedProgress, coinsEarned]);

  useEffect(() => {
    if (completedProgress === 60 && divElements.length < 8 && !hasAddedDiv) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newDiv = (
        <div
          key={divElements.length}
          className="bg-gradient-to-r from-[#40659C] to-[#162336] justify-left mb-2 flex flex-row rounded-2xl h-12 text-sm pl-8 my-auto"
        >
          <img src={ReactIcon} className="w-6 h-6 my-auto mr-4" />
          <div className="flex my-auto flex-col mr-4">Mining Complete</div>
          <img src={Coin} className="my-auto mr-1 w-4 h-4" />
          <div className="text-sm my-auto mr-8">{coinsEarnedRef.current}</div>
          <div className="my-auto">{currentTime}</div>
        </div>
      );
      
      // Update total coins earned
      setTotalCoinsEarned((prevTotal) => {
        const newTotal = prevTotal + coinsEarnedRef.current;
        onCoinsEarnedUpdate(newTotal); // Call the parent function to update the total coins earned
        return newTotal;
      });
      
      // Add the new <div> to the existing array of elements
      setDivElements((prevElements) => [...prevElements, newDiv]);

      // Invoke the callback to update the total div count in the parent
      onDivAdded();

      // Update the element count
      setElementCount((prevCount) => prevCount + 1);

      // Set the flag to true to indicate a div has been added
      setHasAddedDiv(true);
    } else if (completedProgress !== 60) {
      // Reset the flag if progress is not 60
      setHasAddedDiv(false);
    }
  }, [completedProgress, divElements.length, onDivAdded, coinsEarned, onCoinsEarnedUpdate]);

  return (
    <div>
      <div className='flex flex-row'><div>Completed Airdrops</div><p>({elementCount})</p></div>
      {divElements.length === 0 ? (
        <div className='justify-center p-5 pt-20 pb-20 text-center'>
          No unclaimed airdrops
        </div>
      ) : (
        divElements
      )}
    </div>
  );
});

export default CompletedAirdrops;
