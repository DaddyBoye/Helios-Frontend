import { useState, useEffect } from 'react';
import StarryBackground from '../Components/StarryBackground';
import '../App.css';
import AvatarSelectionModal from '../Components/AvatarSelectionModalComponent';
import Pencil from '../icons/ic_outline-edit.svg';
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
import Solis from '../icons/fdv 1 (1).svg';

interface SetHeliosUsernameProps {
  telegramId: number | null;
  onToggle: () => void;
  onUpdateAvatarPath: (newAvatarPath: string) => void; // Update here
}

const MAX_USERNAME_LENGTH = 20;

const avatars = [
  { name: 'Cat', path: 'avatars/Cat.svg' },
  { name: 'Capybara', path: 'avatars/Capybara.svg' },
  { name: 'Parrot', path: 'avatars/Parrot.svg' },
  { name: 'Sheep', path: 'avatars/Sheep.svg' },
  { name: 'Rooster', path: 'avatars/Rooster.svg' },
  { name: 'Dog', path: 'avatars/Dog.svg' },
  { name: 'Lion', path: 'avatars/Lion.svg' },
  { name: 'Goat', path: 'avatars/Goat.svg' },
  { name: 'Cheetah', path: 'avatars/Cheetah.svg' },
  { name: 'Panther', path: 'avatars/Panther.svg' },
  { name: 'SeriousDog', path: 'avatars/Serious Dog.svg' },
  { name: 'SomeBird', path: 'avatars/Some Bird.svg' },
];

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SetHeliosUsername: React.FC<SetHeliosUsernameProps> = ({ telegramId, onToggle, onUpdateAvatarPath }) => {
  const [heliosUsername, setHeliosUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0].path);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [showAvatarAlert, setShowAvatarAlert] = useState(false);

  const getAvatarImage = (path: string) => {
    switch (path) {
      case 'avatars/Cat.svg':
        return Cat;
      case 'avatars/Capybara.svg':
        return Capybara;
      case 'avatars/Parrot.svg':
        return Parrot;
      case 'avatars/Sheep.svg':
        return Sheep;
      case 'avatars/Rooster.svg':
        return Rooster;
      case 'avatars/Dog.svg':
        return Dog;
      case 'avatars/Lion.svg':
        return Lion;
      case 'avatars/Goat.svg':
        return Goat;
      case 'avatars/Cheetah.svg':
        return Cheetah;
      case 'avatars/Panther.svg':
        return Panther;
      case 'avatars/Serious Dog.svg':
        return SeriousDog;
      case 'avatars/Some Bird.svg':
        return SomeBird;
      default:
        return Cat; // Default image if path doesn't match
    }
  };  

  useEffect(() => {
    const randomizeAvatar = async () => {
      // Select a random avatar
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)].path;
      setCurrentAvatar(randomAvatar);

      // Wait for the avatar to be set
      await new Promise(resolve => setTimeout(resolve, 0));

      // Show the alert 1 second after the avatar has been randomized successfully
      const alertTimer = setTimeout(() => setShowAvatarAlert(true), 1000);

      // Hide the alert after 5 seconds
      const hideAlertTimer = setTimeout(() => setShowAvatarAlert(false), 8000);

      return () => {
        clearTimeout(alertTimer); // Cleanup alert timer
        clearTimeout(hideAlertTimer); // Cleanup hide alert timer
      };
    };

    randomizeAvatar();
  }, []);

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // Remove spaces from the input
  const username = e.target.value.replace(/\s+/g, '');
  setHeliosUsername(username);

    // Check availability if username is not empty
    if (username.trim()) {
      // Check if the username is at least 5 characters long
      if (username.length < 5) {
        setError('Username must be at least 5 characters long');
        setIsAvailable(null);
        setSuccessMessage('');
        return;
      } else if (username.length >= MAX_USERNAME_LENGTH) {
        setError('');
        setIsAvailable(null);
        setSuccessMessage('');
      }

      // Check for invalid characters
      const invalidCharacters = /[^a-zA-Z0-9_]/;
      if (invalidCharacters.test(username)) {
        setError('Username can only contain letters, numbers, and underscores');
        setIsAvailable(null);
        setSuccessMessage('');
        return;
      }

      try {
        const response = await fetch(`${VITE_SERVER_URL}/api/check-username`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ heliosUsername: username }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsAvailable(data.available);
          setError('');
        } else {
          setError(data.error || 'Failed to check username availability');
          setIsAvailable(null);
          setSuccessMessage('');
        }
      } catch (err) {
        setError('Error checking username availability. Please try again later.');
        setIsAvailable(null);
        setSuccessMessage('');
      }
    } else {
      setIsAvailable(null);
      setError('');
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!heliosUsername.trim()) {
        setError('Username cannot be empty');
        setSuccessMessage('');
        return;
    }

    if (isAvailable === false) {
        setError('Username is already taken');
        setSuccessMessage('');
        return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
        // First API call to update the Helios username
        const usernameResponse = await fetch(`${VITE_SERVER_URL}/api/username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                telegramId,       // Send the telegramId
                heliosUsername,   // Send the new username
            }),
        });

        const usernameData = await usernameResponse.json();

        if (!usernameResponse.ok) {
            setError(usernameData.error || 'Failed to update username');
            setSuccessMessage('');
            return;  // Exit early if username update fails
        }

        // If username update succeeds, proceed to avatar update
        const avatarResponse = await fetch(`${VITE_SERVER_URL}/api/user/avatar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                telegramId,        // Send the telegramId
                avatarPath: currentAvatar, // Send the avatar path
            }),
        });

        const avatarData = await avatarResponse.json();

        if (!avatarResponse.ok) {
            setError(avatarData.error || 'Failed to update avatar');
            setSuccessMessage('');
        } else {
            setSuccessMessage('Username and avatar updated successfully!');
            setError('');
            setIsAvailable(null);

            // Call the callback to update the avatar path in Layout
            onUpdateAvatarPath(currentAvatar);

            // Call onToggle after showing the success message for 2 seconds
            setTimeout(() => {
                onToggle();
            }, 2000);
        }

    } catch (err) {
        setError('Error updating username and avatar. Please try again later.');
        setSuccessMessage('');
    } finally {
        setIsSubmitting(false);
    }
};

const handleAvatarSelect = (newAvatar: string) => {
  setCurrentAvatar(newAvatar);
  setIsAvatarModalOpen(false);
};

// Preload the icon before rendering the alert
useEffect(() => {
  const image = new Image();
  image.src = Solis;
  image.onload = handleIconLoad; // Mark the icon as loaded when it's ready
}, []);

const [isIconLoaded, setIsIconLoaded] = useState(false);

// Function to handle when the icon has loaded
const handleIconLoad = () => {
  setIsIconLoaded(true);
};

  return (
    <div className="set-username-page flex justify-center font-sans items-center h-screen bg-black/70 text-white">
      <StarryBackground />
      <div className="bg-transparent z-10 h-full text-black p-6 rounded-lg shadow-lg w-80">
      {showAvatarAlert && isIconLoaded && (
  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black/60 to-gray-700/50 backdrop-blur-lg text-white px-4 py-3 rounded-xl shadow-lg w-11/12 max-w-md flex items-center space-x-3">
    <img
      src={Solis}
      alt="Random avatar icon"
      className="w-7 h-7 animate-spinZoomGlow"
      onLoad={handleIconLoad} // Call the handler when the image loads
    />
    <p className="text-sm font-medium">
      A random avatar has been selected! You can change it by clicking the image.
    </p>
  </div>
)}

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className='my-auto'>
            <div className="relative">
              <img
                src={getAvatarImage(currentAvatar)}
                alt="Profile"
                className="mx-auto w-24 h-24 cursor-pointer"
                onClick={() => setIsAvatarModalOpen(true)}
              />
              <div
                className='bg-gradient-to-r from-[#54616C]/70 to-[#FFFFFF]/70 backdrop-blur-md flex items-center justify-center w-fit px-2 rounded-2xl py-1 mx-auto -mt-3 cursor-pointer'
                onClick={() => setIsAvatarModalOpen(true)}
              >
                <p className='text-white text-xs font-semibold'>EDIT</p>
                <img src={Pencil} alt="" className='w-4 h-4'/>
              </div>
            </div>
            <h2 className="text-xl text-[#FAAD00] font-bold mt-4">Set Helios Username</h2>
            <input
              type="text"
              placeholder="Type your username"
              value={heliosUsername}
              onChange={handleUsernameChange}
              className="p-2 bg-[#54616C] rounded-md w-full"
              maxLength={MAX_USERNAME_LENGTH}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            {isAvailable !== null && (
              <>
                {heliosUsername.length >= MAX_USERNAME_LENGTH ? (
                  isAvailable ? (
                    <p className="text-green-500 text-sm">Maximum length reached, click continue to proceed.</p>
                  ) : (
                    <p className="text-red-500 text-sm">Maximum length reached, username not available.</p>
                  )
                ) : (
                  <p className={`text-sm ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                    {isAvailable ? 'Username is available!' : 'Username is already taken'}
                  </p>
                )}
              </>
            )}
          </div>
          <button
            type="submit"
            className="bg-yellow-500 mt-auto mb-20 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            disabled={isSubmitting || isAvailable !== true}
          >
            {isSubmitting ? 'Creating...' : 'Continue'}
          </button>
        </form>
      </div>
      <AvatarSelectionModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSelectAvatar={handleAvatarSelect}
        currentAvatar={currentAvatar}
      />
    </div>
  );
};

export default SetHeliosUsername;
