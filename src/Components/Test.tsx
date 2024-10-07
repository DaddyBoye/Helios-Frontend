// TestSlideComponent.tsx
import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const TestSlideComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Define slide-up animation
  const slideUpAnimation = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
    opacity: isOpen ? 1 : 0,
    config: { tension: 170, friction: 26 },
  });

  // Define slide-down animation
  const slideDownAnimation = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
    opacity: isOpen ? 1 : 0,
    config: { tension: 170, friction: 26 },
  });

  const toggleMenu = () => {
    if (isOpen) {
      setIsAnimating(true);
      // Wait for the slide-down animation to complete before closing the menu
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300); // Match this duration with the animation
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {/* Render the animated menu based on state */}
      <animated.div
        style={isOpen || isAnimating ? slideUpAnimation : slideDownAnimation}
        className="bg-gray-200 p-4 rounded shadow-md w-64"
      >
        <h2 className="text-lg font-bold">Slide Menu</h2>
        <p>This is a test of the slide-up and slide-down animations.</p>
      </animated.div>
    </div>
  );
};

export default TestSlideComponent;
