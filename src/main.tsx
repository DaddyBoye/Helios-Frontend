import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Taskbar from './Components/Taskbar';
import Layout from './Components/Layout';
import App from './Pages/App';
import Airdrop from './Pages/Airdrop';
import Earn from './Pages/Earn';
import Friends from './Pages/Friends';

const RootComponent: React.FC = () => {
  const [isTaskbarVisible, setIsTaskbarVisible] = useState<boolean>(true);

  const handleToggleTaskbar = (isVisible: boolean): void => {
    setIsTaskbarVisible(isVisible);
  };

  return (
    <Router>
      {isTaskbarVisible && <Taskbar />}
      <Routes>
        <Route path="/" element={<Layout toggleTaskbar={handleToggleTaskbar} />}>
          <Route index element={<App toggleTaskbar={handleToggleTaskbar} />} />
          <Route path="airdrop" element={<Airdrop />} />
          <Route path="earn" element={<Earn />} />
          <Route path="friends" element={<Friends toggleTaskbar={handleToggleTaskbar} />} />
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
