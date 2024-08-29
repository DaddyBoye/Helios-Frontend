import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './Pages/App.tsx';
import Airdrop from './Pages/Airdrop.tsx';
import Earn from './Pages/Earn.tsx';
import Friends from './Pages/Friends.tsx';
import './index.css';
import Taskbar from './Components/Taskbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Taskbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
