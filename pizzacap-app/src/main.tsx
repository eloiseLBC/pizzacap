import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import rooter from "./components/rooter/root";
import { CartProvider } from './contexts/CartContext.js';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CartProvider>
            <RouterProvider router={rooter}/>
        </CartProvider>
    </StrictMode>,
);
