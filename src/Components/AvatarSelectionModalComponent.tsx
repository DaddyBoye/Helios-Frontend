import React, { useEffect, useState } from 'react';
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
import Check from '../icons/formkit_check.svg';

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

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({ isOpen, onClose, onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [modalHeight, setModalHeight] = useState(0);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleResize = () => {
      setModalHeight(window.innerHeight);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';
      handleResize();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleAvatarSelect = (avatarPath: string) => {
    setSelectedAvatar(avatarPath);
  };

  const handleConfirmSelection = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
      onClose();
    }
  };

  if (!isOpen) return null;

  const contentHeight = 450; // Approximate height of the content (adjust as needed)
  const availableSpace = modalHeight - contentHeight;
  const topMargin = Math.max(16, availableSpace * 0.35); // Minimum 16px, maximum 30% of available space
  const bottomMargin = Math.max(12, availableSpace * 0.2); // Minimum 10px, maximum 10% of available space

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-between z-50">
      <div
        className="text-white p-5 rounded-lg shadow-lg w-80 max-h-[90vh] overflow-y-auto"
        style={{ marginTop: `${topMargin}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-white text-center font-bold mb-4">Choose your avatar</h2>
        <div className="grid grid-cols-4 gap-2">
          {avatars.map((avatar) => (
            <button
              key={avatar.name}
              className="relative rounded-lg transition-colors duration-200"
              onClick={() => handleAvatarSelect(avatar.path)}
            >
              <img src={avatar.image} alt={avatar.name} className="w-20 h-20" />
              {selectedAvatar === avatar.path && (
                <div className="absolute flex inset-0 bg-[#000000]/70 h-16 my-auto w-16 mx-auto rounded-full">
                  <img src={Check} alt="" className="w-8 h-8 mx-auto my-auto" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <button
        className="bg-yellow-500 text-white font-bold py-3 w-8/12 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
        style={{ marginBottom: `${bottomMargin}px` }}
        onClick={handleConfirmSelection}
      >
        Confirm
      </button>
    </div>
  );
};

export default AvatarSelectionModal;