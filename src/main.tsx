import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './Pages/App.tsx';
import Airdrop from './Pages/Airdrop.tsx';
import Earn from './Pages/Earn.tsx';
import Friends from './Pages/Friends.tsx';
import './index.css';
import Layout from './layout.tsx'; // Import the new Layout component
import { supabase } from './client.ts';

const initTelegramAuth = () => {
  // Ensure Telegram.WebApp is defined
  if (window.Telegram && window.Telegram.WebApp) {
    const webApp = window.Telegram.WebApp;

    webApp.expand();
    webApp.onEvent('auth', function() {
      const userData = webApp.initDataUnsafe;

      fetch('/api/telegram-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        const token = data.token;
        supabase.auth.setSession(token)
          .then((response) => {
            if (response.error) {
              console.error('Error setting session:', response.error);
            } else {
              console.log('User logged in successfully');
            }
          });
      })
      .catch(error => console.error('Error:', error));
    });
  } else {
    console.error('Telegram WebApp is not loaded');
  }
};

initTelegramAuth();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/airdrop" element={<Airdrop />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
