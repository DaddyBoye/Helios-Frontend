// First, let's declare the types for the Telegram WebApp
// Create a new file: src/types/telegram-webapp.d.ts
declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  expand(): void;
  close(): void;
  ready(): void;
  MainButton: TelegramMainButton;
  BackButton: TelegramBackButton;
  // Add other WebApp methods and properties as needed
}

// In your main.tsx file:
import React, { useEffect } from 'react';
import { PreloaderProvider } from './Components/PreloaderProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import Airdrop from './Pages/Airdrop';
import Earn from './Pages/Earn';
import Friends from './Pages/Friends';
import './index.css';
import Layout from '../src/Components/Layout';

const RootComponent = () => {
  useEffect(() => {
    // Check if Telegram WebApp exists
    const tg = window.Telegram?.WebApp;
    if (tg) {
      // Expand the app to full height
      tg.expand();

      // Since enableClosingConfirmation and disableClosingConfirmation 
      // aren't standard WebApp methods, we can use a different approach
      // to handle closing confirmation
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = ''; // This shows a browser confirmation dialog
      };

      // Add the event listener
      window.addEventListener('beforeunload', handleBeforeUnload);

      // Clean up
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  return (
    <Router>
      <PreloaderProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="airdrop" element={<Airdrop />} />
            <Route path="earn" element={<Earn />} />
            <Route path="friends" element={<Friends />} />
          </Route>
        </Routes>
      </PreloaderProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);