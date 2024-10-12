import React, { useState } from 'react';

export const WelcomePage2: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // This will hide the component's content
  };

  if (!isVisible) return null; // If not visible, return null to hide the component

  return (
    <div>
      <h1>Almost there!</h1>
      <p>This is the second welcome page.</p>
      <button onClick={handleClose}>Close Page</button>
    </div>
  );
};
