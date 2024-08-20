import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import ReactIcon from './assets/react.svg';
import Coin from './images/dollar-coin.png';

const CompletedAirdrops = forwardRef((props, ref) => {
  const [divElements, setDivElements] = useState([]);
  const [elementCount, setElementCount] = useState(0);

  //Reset function
  const clearArray = () => {
    setDivElements([]); // Clear the array
    setElementCount(0); // Reset the element count
  };
  useImperativeHandle(ref, () => ({
    emptyArray: clearArray,
  }));

  
  useEffect(() => {
    const addNewDiv = () => {
      if (divElements.length < 8) {
        // Create a new <div> element
        const newDiv = <div key={divElements.length} className="bg-gradient-to-r from-[#40659C] to-[#162336] justify-left mb-2 flex flex-row rounded-2xl h-12 text-sm pl-8 my-auto">
                            <img src={ReactIcon} className='w-6 h-6 my-auto mr-4'/> 
                            <div className='flex my-auto flex-col mr-4'>Mining Complete</div> 
                            <img src={Coin} className='my-auto mr-1 w-4 h-4'/>
                            <div className='text-sm my-auto mr-8'>23.536</div>
                            <div className='my-auto'>12:34</div>
                        </div>;

        // Add the new <div> to the existing array of elements
        setDivElements(prevElements => [...prevElements, newDiv]);

        // Update the element count
        setElementCount(prevCount => prevCount + 1);
    
      }
    };

    // Set an interval to add a new <div> every 5 seconds (adjust as needed)
    const intervalId = setInterval(addNewDiv, 60000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [divElements]);
  

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