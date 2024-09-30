import background from '../images/Starryy.svg';

const Earn = () => {

  return (
    <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20]">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${background})` }}></div>
    </div>
  );
};

export default Earn;