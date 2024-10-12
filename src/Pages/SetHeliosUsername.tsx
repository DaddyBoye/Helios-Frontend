import { useState } from 'react';
import StarryBackground from '../Components/StarryBackground';
import '../App.css';
import Profile from '../images/Mask group (1).svg';

interface SetHeliosUsernameProps {
  telegramId: number | null;
  onToggle: () => void;
}

const SetHeliosUsername: React.FC<SetHeliosUsernameProps> = ({ telegramId, onToggle }) => {
  const [heliosUsername, setHeliosUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setHeliosUsername(username);

    // Check availability if username is not empty
    if (username.trim()) {
      // Check if the username is at least 5 characters long
      if (username.length < 5) {
        setError('Username must be at least 5 characters long');
        setIsAvailable(null);
        setSuccessMessage('');
        return;
    } else if (username.length > 15) { // Adjust to your preferred maximum length
        setError('Username cannot exceed 15 characters');
        setIsAvailable(null);
        setSuccessMessage('');
        return;
    }

      // Check for invalid characters
      const invalidCharacters = /[^a-zA-Z0-9_]/; // Only allows letters, numbers, and underscores
      if (invalidCharacters.test(username)) {
        setError('Username can only contain letters, numbers, and underscores');
        setIsAvailable(null); 
        setSuccessMessage('');
        return;
      }

      try {
        const response = await fetch('https://server.therotrade.tech/api/check-username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ heliosUsername: username }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsAvailable(data.available); // Assume API returns { available: true/false }
          setError(''); // Clear any error message
        } else {
          setError(data.error || 'Failed to check username availability');
          setIsAvailable(null);
          setSuccessMessage(''); // Clear success message
        }
      } catch (err) {
        setError('Error checking username availability. Please try again later.');
        setIsAvailable(null);
        setSuccessMessage(''); // Clear success message
      }
    } else {
      setIsAvailable(null); // Reset availability if input is empty
      setError(''); // Clear any error message
      setSuccessMessage(''); // Clear any success message
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!heliosUsername.trim()) {
      setError('Username cannot be empty');
      setSuccessMessage(''); // Clear success message
      return;
    }

    if (isAvailable === false) {
      setError('Username is already taken');
      setSuccessMessage(''); // Clear success message
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('https://server.therotrade.tech/api/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId, heliosUsername }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create Helios username');
        setSuccessMessage(''); // Clear success message
      } else {
        setSuccessMessage(`Username "${data.heliosUsername}" created successfully!`);
        onToggle(); // Call onToggle after successful creation
      }
    } catch (err) {
      setError('Error creating Helios username. Please try again later.');
      setSuccessMessage(''); // Clear success message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="set-username-page flex justify-center items-center h-screen bg-black/70 text-white">
      <StarryBackground />
      <div className="bg-transparent z-10 h-full w-full text-black p-6 rounded-lg shadow-lg w-80">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className='my-auto'>
            <img src={Profile} alt="Profile" className='mx-auto w-20 h-20' />
            <h2 className="text-xl text-[#FAAD00] font-bold mt-4">Set Helios Username</h2>
            <input
              type="text"
              placeholder="Type your username"
              value={heliosUsername}
              onChange={handleUsernameChange}
              className="p-2 bg-[#54616C] rounded-md w-full"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            {isAvailable !== null && (
              <p className={`text-sm ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {isAvailable ? 'Username is available!' : 'Username is already taken'}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-yellow-500 mt-auto mb-20 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            disabled={isSubmitting || isAvailable !== true} // Button is disabled unless the username is available
          >
            {isSubmitting ? 'Creating...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetHeliosUsername;
