import React from 'react';

interface WelcomePage1Props {
  onNext: () => void;
}

export const WelcomePage1: React.FC<WelcomePage1Props> = ({ onNext }) => {
  return (
    <div>
      <h1>Welcome to Our App!</h1>
      <p>This is the first welcome page.</p>
      <button onClick={onNext}>Next</button>
    </div>
  );
};