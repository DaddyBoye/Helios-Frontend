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
  { name: 'Cat', path: 'avatars/Cat.svg', clientPath: Cat },
  { name: 'Capybara', path: 'avatars/Capybara.svg', clientPath: Capybara },
  { name: 'Parrot', path: 'avatars/Parrot.svg', clientPath: Parrot },
  { name: 'Sheep', path: 'avatars/Sheep.svg', clientPath: Sheep },
  { name: 'Rooster', path: 'avatars/Rooster.svg', clientPath: Rooster },
  { name: 'Dog', path: 'avatars/Dog.svg', clientPath: Dog },
  { name: 'Lion', path: 'avatars/Lion.svg', clientPath: Lion },
  { name: 'Goat', path: 'avatars/Goat.svg', clientPath: Goat },
  { name: 'Cheetah', path: 'avatars/Cheetah.svg', clientPath: Cheetah },
  { name: 'Panther', path: 'avatars/Panther.svg', clientPath: Panther },
  { name: 'SeriousDog', path: 'avatars/Serious Dog.svg', clientPath: SeriousDog },
  { name: 'SomeBird', path: 'avatars/Some Bird.svg', clientPath: SomeBird },
];

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({ isOpen, onClose, onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [modalHeight, setModalHeight] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Preload all images in parallel when modal opens
      Promise.all(
        avatars.map(
          avatar =>
            new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => reject();
              img.src = avatar.clientPath;
            })
        )
      ).then(() => {
        setIsLoaded(true);
        setLoadingError(false);
      }).catch(() => {
        setIsLoaded(true);
        setLoadingError(true); // Handle loading error
      });

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };

      const handleResize = () => {
        setModalHeight(window.innerHeight);
      };

      document.addEventListener('keydown', handleEscape);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';
      handleResize();

      return () => {
        document.removeEventListener('keydown', handleEscape);
        window.removeEventListener('resize', handleResize);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const handleAvatarSelect = (avatarPath: string) => {
    setSelectedAvatar(avatarPath);
    setShowAlert(false);
  };

  const handleConfirmSelection = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
      onClose();
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (!isOpen) return null;

  const contentHeight = 450;
  const availableSpace = modalHeight - contentHeight;
  const topMargin = Math.max(16, availableSpace * 0.35);
  const bottomMargin = Math.max(12, availableSpace * 0.2);

  return (
    <div className="fixed inset-0 bg-black/90 font-sans flex flex-col items-center justify-between z-50">
      <div
        className="text-white p-5 rounded-lg shadow-lg max-h-[90vh]"
        style={{ marginTop: `${topMargin}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-white text-center font-bold mb-4">Choose your avatar</h2>
        {!isLoaded ? (
        <div className="text-center text-lg text-gray-400 animate-pulse">
        Summoning avatars...
      </div>
    ) : loadingError ? (
      <div className="text-red-500 text-center bg-red-950/30 p-4 rounded-md">
        Oops! Avatar portal is down
      </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {avatars.map((avatar) => (
              <button
                key={avatar.name}
                className={`relative min-w-20 rounded-lg transition-transform duration-200 ${
                  selectedAvatar === avatar.path ? 'scale-110' : ''
                }`}
                onClick={() => handleAvatarSelect(avatar.path)}
              >
                  <img
                    src={avatar.clientPath}
                    alt={avatar.name}
                    className="w-full h-full"
                    loading="eager"
                  />
                {selectedAvatar === avatar.path && (
                  <div className="absolute flex inset-0 bg-black/75 h-full w-full rounded-full">
                    <img src={Check} alt="" className='w-5/12 mx-auto my-auto' />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {showAlert && (
          <div className="bg-red-500 text-white text-sm p-3 rounded mt-4 text-center">
            Please choose an avatar before proceeding.
          </div>
        )}
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
