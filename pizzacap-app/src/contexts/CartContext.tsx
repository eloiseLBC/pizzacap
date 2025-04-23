import React, { createContext, useContext, useState } from 'react';

interface CartItem {
    name: string;
    image_url: string;
    price: number;
    size: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    updateCartItem: (item: CartItem) => void;
    getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const updateCartItem = (item: CartItem) => {
        setCartItems((prev) => {
            const exists = prev.find(
                (i) => i.name === item.name && i.size === item.size,
            );
            if (item.quantity === 0) {
                return prev.filter(
                    (i) => !(i.name === item.name && i.size === item.size),
                );
            }
            if (exists) {
                return prev.map((i) =>
                    i.name === item.name && i.size === item.size ? item : i,
                );
            }
            return [...prev, item];
        });
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, updateCartItem, getCartItemCount }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
