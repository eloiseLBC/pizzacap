// src/layouts/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterComponent from '../components/FooterComponent/FooterComponent';

const Layout = () => {
    return (
        <div className="bg-surface top-0 absolute w-full">
            <NavbarComponent />
            <main>
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    );
};

export default Layout;
