import { useState } from 'react';
import StarryBackground from '../Components/StarryBackground';
import '../App.css';
import Profile from '../images/Mask group (1).svg'

interface SetHeliosUsernameProps {
  telegramId: number | null;
  onUsernameSet: () => void;
}

const SetHeliosUsername: React.FC<SetHeliosUsernameProps> = ({ telegramId, onUsernameSet }) => {
  const [heliosUsername, setHeliosUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeliosUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!heliosUsername.trim()) {
      setError('Username cannot be empty');
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
      } else {
        setSuccessMessage(`Username "${data.heliosUsername}" created successfully!`);
        onUsernameSet(); // Callback to notify that username has been set
      }
    } catch (err) {
      setError('Error creating Helios username. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="set-username-page flex justify-center items-center h-screen bg-black/70 text-white">
      <StarryBackground/>
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
        </div>
          <button
            type="submit"
            className="bg-yellow-500 mt-auto mb-20 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetHeliosUsername;
