import Footprint from '../images/footprint 1.png';
import Emissions from '../images/zx 1.png';
import Solutions from '../images/solytion 1.png';
import FootIcon from '../icons/1.png';
import EmmiIcon from '../icons/2.png';
import SoluIcon from '../icons/3.png';

const InfoCards = ({ onCardClick }: { onCardClick: (title: string) => void }) => {
    const cards = [
        {
            title: 'Footprint',
            color: 'bg-green-500',
            gradient: 'from-green-400/90 to-green-600/0',
            icon: FootIcon,
            description: 'Personal and collective carbon footprints',
            value: '32.3B',
            bgImage: Footprint,
        },
        {
            title: 'Emission',
            color: 'bg-orange-400',
            gradient: 'from-orange-400/90 to-orange-600/0',
            icon: EmmiIcon,
            description: 'Carbon emissions and their impacts',
            value: '32.3B',
            bgImage: Emissions,
        },
        {
            title: 'Solutions',
            color: 'bg-blue-500',
            gradient: 'from-blue-400/90 to-blue-600/0',
            icon: SoluIcon,
            description: 'Steps to a sustainable future',
            value: '32.3B',
            bgImage: Solutions,
        },
    ];

    return (
        <div className="w-full overflow-x-auto overflow-y-auto pt-2">
            <div className="flex gap-2 pl-5 pr-5 p-2 min-w-min">
                {cards.map((card, index) => (
                    <div key={index} className="relative">
                        <div
                            onClick={() => onCardClick(card.title)}
                            className={`info relative w-32 h-48 px-0.5 flex-shrink-0 rounded-3xl overflow-hidden shadow-lg ${card.color}`}
                        >
                            <div className="absolute inset-0">
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
                            </div>
                            <div className="absolute bottom-0 right-0 w-24 h-24">
                                <img src={card.bgImage} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="relative p-2 h-full flex flex-col text-white justify-center">
                                <h2 className="text-base font-bold mt-9 mb-1">{card.title}</h2>
                                <p className="text-xs opacity-90">{card.description}</p>
                                <div className="flex items-center gap-1.5 mt-auto">
                                    <span className="text-lg font-bold">{card.value}</span>
                                    <button className="rounded-full bg-white/20 p-1 hover:bg-white/30">
                                        <div className="w-1.5 h-1.5 flex items-center justify-center">▶</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-5 -right-2 w-16 h-16">
                                <img src={card.icon} alt="" className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoCards;
