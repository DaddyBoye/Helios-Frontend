import React, { useState, useEffect } from 'react';

interface CarouselImage {
    image: string;
    title: string;
    description: string;
    link: string;
    color: string;
    benefits: string[];
    howTo: string[];
    longDescription: string;
}

interface Platform {
    icon: string;
    name: string;
    text: string;
    link: string;
    image: string;
    color: string;
}

interface InviteTask {
    title: string;
    reward: string;
    link: string;
    image: string;
    color: string;
}

type SelectedItem = CarouselImage | Platform | InviteTask;

interface SlidingMenuProps {
    selectedItem: SelectedItem;
    onClose: () => void;
}

const SlidingMenu: React.FC<SlidingMenuProps> = ({ selectedItem, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [selectedItem]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const isCarouselImage = (item: SelectedItem): item is CarouselImage => {
        return 'benefits' in item && 'howTo' in item && 'longDescription' in item;
    };

    const isPlatform = (item: SelectedItem): item is Platform => {
        return 'icon' in item && 'text' in item;
    };

    const isInviteTask = (item: SelectedItem): item is InviteTask => {
        return 'reward' in item;
    };

    const getMenuHeight = () => {
        if (isCarouselImage(selectedItem)) {
            return 'h-full';
        }
        return 'max-h-4/5';
    };

    return (
        <div
            className={`fixed inset-0 bg-black backdrop-blur transition-opacity duration-300 ease-in-out ${
                isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'
            }`}
            onClick={handleClose}
        >
            <div
                className={`fixed w-full bottom-0 overflow-y-auto rounded-t-3xl pb-10 transition-transform duration-300 ease-in-out transform ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                } ${getMenuHeight()}`}
                style={{ backgroundColor: selectedItem.color }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col p-6 text-white'>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold">
                            {isCarouselImage(selectedItem) ? selectedItem.title : 
                             isPlatform(selectedItem) ? selectedItem.name :
                             isInviteTask(selectedItem) ? selectedItem.title : ''}
                        </h2>
                        <button onClick={handleClose} className="text-3xl">&times;</button>
                    </div>

                    {/* Image and short description */}
                    <div className="flex items-center mb-3">
                        <img src={selectedItem.image} className="w-20 h-20 object-cover rounded-full mr-2" />
                        <p className="text-lg text-left">
                            {isCarouselImage(selectedItem) ? selectedItem.description : 
                             isPlatform(selectedItem) ? selectedItem.text :
                             isInviteTask(selectedItem) ? `Earn ${selectedItem.reward} by inviting friends!` : ''}
                        </p>
                    </div>

                    {isCarouselImage(selectedItem) && (
                        <>
                            {/* Long description */}
                            <div className="mb-3">
                                <h3 className="text-xl font-semibold mb-2">About</h3>
                                <p>{selectedItem.longDescription}</p>
                            </div>

                            {/* Benefits */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Benefits</h3>
                                <ul className="list-disc list-inside">
                                    {selectedItem.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* How to participate */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">How to Participate</h3>
                                <ol className="list-decimal list-inside">
                                    {selectedItem.howTo.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </>
                    )}

                    {isPlatform(selectedItem) && (
                        <div className="mb-3">
                            <p>Follow us on {selectedItem.name} to stay updated with our latest news and events!</p>
                        </div>
                    )}

                    {isInviteTask(selectedItem) && (
                        <div className="mb-1">
                            <p>Invite your friends and earn rewards! The more friends you invite, the more Solis you can earn.</p>
                        </div>
                    )}

                    {/* Call to Action */}
                    <a
                        href={selectedItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black py-3 px-6 mb-5 rounded-lg text-center h-12 items-center justify-center text-lg font-semibold hover:bg-opacity-90 transition-colors"
                    >
                        {isCarouselImage(selectedItem) ? `Join ${selectedItem.title}` : 
                         isPlatform(selectedItem) ? `Go to ${selectedItem.name}` :
                         isInviteTask(selectedItem) ? `Invite Friends` : ''}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SlidingMenu;