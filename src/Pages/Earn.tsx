import Coin from '../images/dollar-coin.png';

const Earn = () => {



    return (
      <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20] text-white p-4 ">
        <h1 className='text-center font-bold font-sans text-2xl'>
          Bamboo
        </h1>
        <div className='p-8 flex justify-center'>
          <img src={Coin}/>
        </div>
        <p className='text-center font-bold font-sans text-2xl'>Boost your mine rate</p>
      </div>
    );
  };
  
  export default Earn;