import StarryBackground from '../Components/StarryBackground';

const Airdrop = () => {
    return (
        <div className="relative h-screen ">
            <StarryBackground />
            <div className="relative z-10 text-center text-white">
                <h1 className="text-4xl text-black font-bold"></h1>
                {/* Other content goes here */}
            </div>
        </div>
    );
};

export default Airdrop;
