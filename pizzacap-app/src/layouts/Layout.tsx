// src/layouts/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';

const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
