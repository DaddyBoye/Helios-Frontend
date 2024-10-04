import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import Airdrop from './Pages/Airdrop';
import Earn from './Pages/Earn';
import Friends from './Pages/Friends';
import './index.css';
import Taskbar from './Components/Taskbar';

const RootComponent = () => {
  const [isTaskbarVisible, setIsTaskbarVisible] = useState(true);
  const [isAppVisible, setIsAppVisible] = useState(true);
  const location = useLocation(); // Get the current location

  const handleToggleTaskbar = (isVisible: boolean) => {
    setIsTaskbarVisible(isVisible);
  };

  useEffect(() => {
    // Hide App when navigating away from the home page
    if (location.pathname !== '/') {
      setIsAppVisible(false);
    } else {
      setIsAppVisible(true);
    }
  }, [location.pathname]);

  return (
    <>
      {isTaskbarVisible && <Taskbar />}
      {/* Always render App but control its visibility */}
      <div style={{ display: isAppVisible ? 'block' : 'none' }}>
        <App toggleTaskbar={handleToggleTaskbar} />
      </div>
      <Routes>
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/friends" element={<Friends toggleTaskbar={handleToggleTaskbar} />} />
      </Routes>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <RootComponent />
    </Router>
  </React.StrictMode>
);
