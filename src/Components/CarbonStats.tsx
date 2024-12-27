import RoundProgress from '../Components/CircularProgress';

const CarbonStats = () => {
    const currentCO2 = 420;
    const criticalCO2 = 450;

    return (
        <div className='flex flex-col w-10/12 mx-auto'>
            <div className='rounded-full mt-3 ml-auto w-fit -mb-9 bg-[#22c55e]'>
                <p className='text-xs px-2 text-white py-2'>Global CO₂</p>
            </div>
            <div className='subtract'>
                <div className='pb-4 p-5 h-fit flex flex-col rounded-lg bg-white/10 backdrop-blur-md border border-white/10'>
                    <div className='flex flex-row'>
                        <div className="flex-shrink-0">
                            <RoundProgress progress={currentCO2} total={criticalCO2} />
                        </div>
                        <div className='flex flex-col ml-2 gap-4 h-20'>
                            <div className="flex items-center">
                                <div className="w-1 rounded bg-[#FF4B2B] h-9"></div>
                                <div className='flex flex-col text-xs ml-1'>
                                    <span className='text-white'>Temp</span>
                                    <span className='text-white/70'>+1.2°C</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-1 rounded bg-[#4ade80] h-9"></div>
                                <div className='flex flex-col text-xs ml-1'>
                                    <span className='text-white'>Ice Loss</span>
                                    <span className='text-white/70'>278 GT</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex mt-8 ml-4 items-center">
                                <div className="w-1 rounded bg-[#60a5fa] h-9"></div>
                                <div className='flex flex-col text-xs ml-1'>
                                    <span className='text-white'>Sea Level</span>
                                    <span className='text-white/70'>+3.4mm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='my-1 border-white/10' />
                    <div>
                        <div className="grid grid-cols-3 gap-5 mt-2">
                            <div>
                                <div className="text-xs text-white">Forests</div>
                                <div className="text-white/70 text-[10px]">31.2%</div>
                                <div className="h-1 bg-blue-500/30 rounded-full mt-1">
                                    <div className="h-1 bg-[#60a5fa] rounded-full w-3/4"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-white">Renewable</div>
                                <div className="text-white/70 text-[10px]">29.8%</div>
                                <div className="h-1 bg-[#FF4B2B]/30 rounded-full mt-1">
                                    <div className="h-1 bg-[#FF4B2B] rounded-full w-1/2"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-white">CO2/GDP</div>
                                <div className="text-white/70 text-[10px]">0.26 kg</div>
                                <div className="h-1 bg-[#FFD93D]/30 rounded-full mt-1">
                                    <div className="h-1 bg-[#FFD93D] rounded-full w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Theme switcher removed
            <div className="grid grid-cols-4 gap-2 mt-4">
                {Object.keys(backgroundStyles).map((style) => (
                    <button
                        key={style}
                        onClick={() => setBgStyle(style)}
                        className={`px-3 py-1 rounded text-xs ${
                            bgStyle === style
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-800 text-slate-300'
                        }`}
                    >
                        {style}
                    </button>
                ))}
            </div>
            */}
        </div>
    );
};

export default CarbonStats;