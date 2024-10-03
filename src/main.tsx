import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import Airdrop from './Pages/Airdrop';
import Earn from './Pages/Earn';
import Friends from './Pages/Friends';
import './index.css';
import Taskbar from './Components/Taskbar';

const RootComponent = () => {
  const [isTaskbarVisible, setIsTaskbarVisible] = useState(true);

  const handleToggleTaskbar = (isVisible: boolean) => {
    setIsTaskbarVisible(isVisible);
  };

  return (
    <Router>
      {isTaskbarVisible && <Taskbar />} {/* Taskbar only shows if isTaskbarVisible is true */}
      <Routes>
      <Route
          path="/"
          element={<App toggleTaskbar={handleToggleTaskbar} />} 
        />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/earn" element={<Earn />} />
        <Route
          path="/friends"
          element={<Friends toggleTaskbar={handleToggleTaskbar} />} 
        />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
