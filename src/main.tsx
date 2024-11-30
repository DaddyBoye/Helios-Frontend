import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import Airdrop from './Pages/Airdrop';
import Earn from './Pages/Earn';
import Friends from './Pages/Friends';
import Eco from './Pages/Eco';
import './index.css';
import Layout from '../src/Components/Layout';
import './registerSW'

const RootComponent = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      // Expand the app to full height
      tg.expand();

      // Enable closing confirmation alert
      tg.enableClosingConfirmation();

      // Clean up: Disable closing confirmation on component unmount if needed
      return () => {
        tg.disableClosingConfirmation();
      };
    }
  }, []);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} /> {/* Default route */}
            <Route path="airdrop" element={<Airdrop />} />
            <Route path="earn" element={<Earn />} />
            <Route path="friends" element={<Friends />} />
            <Route path="eco" element={<Eco />} />
          </Route>
        </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
