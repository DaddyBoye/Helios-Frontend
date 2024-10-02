import background from '../images/Starryy.svg';
import logo from '../icons/Helios.svg'

const Airdrop = () => {

  return (
    <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20]">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${background})` }}></div>
        <img className='z-10' src={logo} alt="" width={100} height={100} />
    </div>
  );
};

export default Airdrop;