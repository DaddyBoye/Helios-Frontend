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
    const tg = window.Telegram.WebApp;

    // Expand the app to full height
    tg.expand();

    // Enable closing confirmation alert
    tg.enableClosingConfirmation();

    // Clean up: Disable closing confirmation on component unmount if needed
    return () => {
      tg.disableClosingConfirmation();
    };
  }, []);

  return (
    <Router>
      <PreloaderProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} /> {/* Default route */}
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
