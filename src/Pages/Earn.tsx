import StarryBackground from '../Components/StarryBackground';
import Minions from '../images/napoleon-exile-gettyimages-1288489073.jpg';
import Instagram from '../icons/insta-removebg-preview 1.svg';
import X from '../icons/x-removebg-preview 1.svg';
import YouTube from '../icons/yt-removebg-preview 1.svg';
import Telegram from '../icons/tg-removebg-preview 1.svg'



const Earn = () => {
    return (
        <div className="relative font-sans h-full pb-20 flex flex-col overflow-y-auto">
            <StarryBackground />
            <div className="relative z-10 flex flex-col text-center text-white flex-grow">
                <p className='text-left text-2xl pb-4 pt-6 pl-3'>Earn</p>
                <div className='flex gap-2 pl-3 overflow-x-auto pr-3 hide-scrollbar'>
                    <div className='w-10/12 max-h-50 rounded-2xl min-h-40 shrink-0 relative'>
                        {/* Image with fade effect */}
                        <img src={Minions} alt="" className="w-full h-full object-cover rounded-2xl" />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#09161F] via-transparent to-[#09161F] rounded-2xl"></div>
                        <div className="absolute top-4 left-4 text-white">
                            <p className="text-lg font-bold">$30,000</p>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                        </div>
                    </div>
                    <div className='w-10/12 max-h-50 rounded-2xl min-h-40 shrink-0 relative'>
                        {/* Image with fade effect */}
                        <img src={Minions} alt="" className="w-full h-full object-cover rounded-2xl" />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#09161F] via-transparent to-[#09161F] rounded-2xl"></div>
                        <div className="absolute top-4 left-4 text-white">
                            <p className="text-lg font-bold">$30,000</p>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                        </div>
                    </div>
                    <div className='w-10/12 max-h-50 rounded-2xl min-h-40 shrink-0 relative'>
                        {/* Image with fade effect */}
                        <img src={Minions} alt="" className="w-full h-full object-cover rounded-2xl" />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#09161F] via-transparent to-[#09161F] rounded-2xl"></div>
                        <div className="absolute top-4 left-4 text-white">
                            <p className="text-lg font-bold">$30,000</p>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                        </div>
                    </div>
                </div>
                <h1 className='text-left pt-4 pl-4 text-lg'>Socials</h1>
                <div className='p-2 pl-5 bg-[#194564]/ w-11/12 flex flex-col mx-auto rounded-2xl'>
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl flex items-center w-14 h-14 justify-center'>
                          <img src={Instagram} alt="" />
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Follow us on Instagram</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                    <hr className="border-t border-white/30 mr-2 my-2 ml-16" />
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl flex items-center w-14 h-14 justify-center'>
                          <img src={X} alt="" className=''/>
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Follow our X account</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                    <hr className="border-t border-white/30 mr-2 my-2 ml-16" />
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl flex items-center w-14 h-14 justify-center'>
                          <img src={YouTube} alt="" />
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Subscribe to our YouTube</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                    <hr className="border-t border-white/30 mr-2 my-2 ml-16" />
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl'>
                          <img src={Telegram} alt="" />
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Join us on Telegram</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                </div>
                <h1 className='text-left pt-4 pl-4 text-lg'>Socials</h1>
                <div className='p-2 pl-5 bg-[#194564]/90 w-11/12 flex flex-col mx-auto rounded-2xl'>
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl'>
                          <img src={Instagram} alt="" />
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Follow us on Instagram</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                    <hr className="border-t border-white/30 mr-2 my-2 ml-16" />
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl'>
                          <img src={Instagram} alt="" />
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Follow us on Instagram</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                    <hr className="border-t border-white/30 mr-2 my-2 ml-16" />
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl'>
                          <img src={Instagram} alt="" />
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Follow us on Instagram</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                    <hr className="border-t border-white/30 mr-2 my-2 ml-16" />
                    <div className='flex flex-row '>
                        <div className='bg-[#435B6D] rounded-xl'>
                          <img src={Instagram} alt="" />
                        </div>
                        <div className='flex flex-col pl-3 justify-between pt-1 pb-1'>
                          <p className='text-left'>Follow us on Instagram</p>
                          <p className='truncate w-48 text-white/50 text-sm'>Participate in our engagement program and increase your minerate by 20</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Earn;
