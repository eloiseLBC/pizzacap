import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { X } from 'lucide-react'; // Icône de fermeture (tu peux changer)
import clsx from 'clsx';

interface CartOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ isOpen, onClose }) => {
    const { cartItems } = useCart();
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    return (
        <div
            className={clsx(
                'fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out',
                {
                    'translate-x-0': isOpen,
                    'translate-x-full': !isOpen,
                },
            )}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-outfit text-xl font-bold">Mon panier</h2>
                <button onClick={onClose}>
                    <X size={24} />
                </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Ton panier est vide.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 border-b pb-2"
                        >
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex flex-col">
                                <span className="font-semibold">
                                    {item.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {item.quantity} × {item.price}€
                                </span>
                                <span className="text-sm text-gray-500">
                                    Taille: {item.size}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-outfit font-semibold">
                    <span>Total</span>
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full">
                        {totalPrice.toFixed(2)}€
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartOverlay;
