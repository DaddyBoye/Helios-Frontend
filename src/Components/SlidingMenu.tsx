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

interface SlidingMenuProps {
    selectedItem: CarouselImage | { name: string; text: string; link: string; image: string; color: string; };
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

    const isCarouselImage = (item: any): item is CarouselImage => {
        return 'benefits' in item && 'howTo' in item && 'longDescription' in item;
    };

    return (
        <div
            className={`fixed inset-0 bg-black backdrop-blur transition-opacity duration-300 ease-in-out ${
                isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'
            }`}
            onClick={handleClose}
        >
            <div
                className={`fixed w-full pb-20 bottom-0 overflow-y-auto rounded-3xl transition-transform duration-300 ease-in-out transform ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ backgroundColor: selectedItem.color }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col p-6 text-white'>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{isCarouselImage(selectedItem) ? selectedItem.title : selectedItem.name}</h2>
                        <button onClick={handleClose} className="text-3xl">&times;</button>
                    </div>

                    {/* Image and short description */}
                    <div className="flex items-center mb-6">
                        <img src={selectedItem.image} alt={isCarouselImage(selectedItem) ? selectedItem.title : selectedItem.name} className="w-20 h-20 object-cover rounded-full mr-4" />
                        <p className="text-lg">{isCarouselImage(selectedItem) ? selectedItem.description : selectedItem.text}</p>
                    </div>

                    {isCarouselImage(selectedItem) && (
                        <>
                            {/* Long description */}
                            <div className="mb-6">
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

                    {/* Call to Action */}
                    <a
                        href={selectedItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black py-3 px-6 rounded-lg text-center text-lg font-semibold mt-4 hover:bg-opacity-90 transition-colors"
                    >
                        {isCarouselImage(selectedItem) ? `Join ${selectedItem.title}` : `Go to ${selectedItem.name}`}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SlidingMenu;