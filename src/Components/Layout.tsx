import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import App from '../Pages/App';
import Airdrop from '../Pages/Airdrop';
import Earn from '../Pages/Earn';
import Friends from '../Pages/Friends';

interface LayoutProps {
  toggleTaskbar: (isVisible: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ toggleTaskbar }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App toggleTaskbar={toggleTaskbar} />} />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/friends" element={<Friends toggleTaskbar={toggleTaskbar} />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default Layout;
