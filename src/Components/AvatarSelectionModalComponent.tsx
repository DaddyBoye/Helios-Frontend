import React, { useEffect } from 'react';
import Cat from '../images/Cat.svg';
import Capybara from '../images/Capybara.svg';
import Parrot from '../images/Parrot.svg';
import Sheep from '../images/Sheep.svg';
import Rooster from '../images/Rooster.svg';
import Dog from '../images/Dog.svg';
import Lion from '../images/Lion.svg';
import Goat from '../images/Goat.svg';
import Cheetah from '../images/Cheetah.svg';
import Panther from '../images/Panther.svg';
import SeriousDog from '../images/Serious Dog.svg';
import SomeBird from '../images/Some Bird.svg';

interface AvatarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (avatarPath: string) => void;
  currentAvatar: string;
}

const avatars = [
  { name: 'Cat', path: 'avatars/Cat.svg', image: Cat },
  { name: 'Capybara', path: 'avatars/Capybara.svg', image: Capybara },
  { name: 'Parrot', path: 'avatars/Parrot.svg', image: Parrot },
  { name: 'Sheep', path: 'avatars/Sheep.svg', image: Sheep },
  { name: 'Rooster', path: 'avatars/Rooster.svg', image: Rooster },
  { name: 'Dog', path: 'avatars/Dog.svg', image: Dog },
  { name: 'Lion', path: 'avatars/Lion.svg', image: Lion },
  { name: 'Goat', path: 'avatars/Goat.svg', image: Goat },
  { name: 'Cheetah', path: 'avatars/Cheetah.svg', image: Cheetah },
  { name: 'Panther', path: 'avatars/Panther.svg', image: Panther },
  { name: 'SeriousDog', path: 'avatars/Serious Dog.svg', image: SeriousDog },
  { name: 'SomeBird', path: 'avatars/Some Bird.svg', image: SomeBird },
];

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({ isOpen, onClose, onSelectAvatar, currentAvatar }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div 
        className="bg-[#1E1E1E] text-white p-5 rounded-lg shadow-lg w-80 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-[#FAAD00] font-bold mb-4">Choose your avatar</h2>
        <div className="grid grid-cols-4 gap-4">
          {avatars.map((avatar) => (
            <button
              key={avatar.name}
              className={`rounded-lg ${
                currentAvatar === avatar.path ? 'bg-yellow-500' : 'bg-[#54616C]'
              } transition-colors duration-200 `}
              onClick={() => onSelectAvatar(avatar.path)}
            >
              <img src={avatar.image} alt={avatar.name} className="w-20 h-20" />
            </button>
          ))}
        </div>
        <button
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full hover:bg-yellow-600 transition-colors duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AvatarSelectionModal;
