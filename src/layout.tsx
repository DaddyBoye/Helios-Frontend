// src/Components/Layout.tsx
import React from 'react';
import Taskbar from './Components/Taskbar'; // Import your Taskbar component
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Helios',
    description: 'Helios Bot'
  };

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Taskbar />
    <main>{children}</main>
  </div>
);

export default Layout;
