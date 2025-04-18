import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import { RouterProvider } from "react-router-dom";
import rooter from "./components/rooter/root";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={rooter}>
            <App />
        </RouterProvider>
    </StrictMode>,
);
