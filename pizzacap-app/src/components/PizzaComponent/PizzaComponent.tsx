import React, { FC, useState, useEffect } from 'react';
import { PizzaComponentProps } from '../../models/PizzaComponentProps';
import { useCart } from '../../contexts/CartContext';
import leafIcon from '../../assets/Vegetarien_logo.png';
import { useNavigate } from 'react-router-dom';

const PizzaComponent: React.FC<PizzaComponentProps> = ({
    id,
    name,
    image_url,
    ingredients,
    price,
    features,
}) => {
    const navigate = useNavigate();
    const [size, setSize] = useState<'S' | 'M' | 'L'>('S');
    const [quantity, setQuantity] = useState(0);

    const { updateCartItem } = useCart();

    useEffect(() => {
        updateCartItem({ name, image_url, price, size, quantity });
    }, [quantity, size]);

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(0, prev + delta));
    };

    const isVegetarian = features?.includes('Vegetarian');

    return (
        <div onClick={() => navigate(`/details/${id}`)} className="w-72 rounded-3xl border border-green-500 flex flex-col items-center shadow-md">
            <div className="w-full bg-green-600 rounded-t-3xl py-2 flex justify-center">
                <h2 className="font-outfit text-lg font-bold text-white text-2xl">
                    {name}
                </h2>
            </div>
            <div className="relative w-full">
                <img
                    src={image_url}
                    alt={name}
                    className="rounded-b-xl w-full h-36 object-cover mb-3"
                />
                {isVegetarian && (
                    <img
                        src={leafIcon}
                        alt="Végétarienne"
                        className="absolute -right-4 bottom-4 translate-y-1/2 w-26 h-20 drop-shadow-md"
                    />
                )}
            </div>
            <div className="flex flex-col items-center p-3">
                <div className="w-full text-left">
                    <h3 className="font-semibold">Ingrédients</h3>
                    <p className="text-sm text-gray-600">{ingredients}</p>
                </div>
                <div className="flex justify-center mt-3 gap-2">
                    {['S', 'M', 'L'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s as 'S' | 'M' | 'L')}
                            className={`rounded-full px-3 py-1 text-white text-sm font-semibold ${
                                size === s
                                    ? 'bg-red-500'
                                    : 'bg-gray-200 text-black'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="flex items-center mt-3 gap-4 bg-green-500 rounded-full px-4 py-2 text-white font-bold text-lg">
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <div className="mt-3 bg-green-500 text-white px-6 py-1 rounded-full font-bold">
                    {price}€
                </div>
            </div>
        </div>
    );
};

export default PizzaComponent;
