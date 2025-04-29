import React, { useState } from 'react';
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
    categorie,
}) => {
    const navigate = useNavigate();
    const [size, setSize] = useState<'S' | 'M' | 'L'>(() => {
        if (categorie === 'Antipasti & Snacks' || categorie === 'Boissons') {
            return 'M';
        }
        return 'S';
    });

    const { cartItems, updateCartItem } = useCart();

    // Trouver la quantité actuelle dans le panier
    const currentCartItem = cartItems.find(
        (item) => item.name === name && item.size === size,
    );
    const quantity = currentCartItem?.quantity || 0;

    // Fonction pour obtenir le prix selon la taille
    const getPriceForSize = (basePrice: number, size: 'S' | 'M' | 'L') => {
        if (categorie === 'Antipasti & Snacks' || categorie === 'Boissons') {
            return basePrice;
        }
        if (size === 'S') return basePrice * 0.8;
        if (size === 'L') return basePrice * 1.2;
        return basePrice;
    };

    // Gérer changement de quantité
    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(0, quantity + delta);

        const finalPrice =
            categorie === 'Antipasti & Snacks' || categorie === 'Boissons'
                ? price
                : parseFloat(getPriceForSize(price, size).toFixed(2));

        updateCartItem({
            name,
            image_url,
            price: finalPrice,
            size,
            quantity: newQuantity,
        });
    };

    const isVegetarian = features?.Vegetarian === true;
    console.log("pizza : ", name, " features : ", features, " isVegetarien : ", isVegetarian )

    return (
        <div className="w-72 rounded-3xl border border-primary-variant flex flex-col items-center shadow-md">
            {/* Nom de la pizza */}
            <div className="w-full bg-primary-variant rounded-t-3xl py-2 flex justify-center">
                <h2 className="font-outfit font-bold text-white text-2xl">
                    {name}
                </h2>
            </div>

            {/* Image */}
            <div className="relative w-full">
                <img
                    onClick={() => navigate(`/details/${id}`)}
                    src={image_url}
                    alt={name}
                    className="rounded-b-xl w-full h-36 object-cover mb-3 transition-transform cursor-pointer"
                />
                {isVegetarian && (
                    <img
                        src={leafIcon}
                        alt="Végétarienne"
                        className="absolute -right-4 bottom-4 translate-y-1/2 w-26 h-20 drop-shadow-md"
                    />
                )}
            </div>

            {/* Description */}
            <div className="flex flex-col items-center p-3">
                <div className="w-full text-left">
                    <h3 className="font-semibold">Ingrédients</h3>
                    <p className="text-sm text-gray-600">{ingredients}</p>
                </div>

                {/* Boutons tailles uniquement pour les pizzas */}
                {categorie !== 'Antipasti & Snacks' &&
                    categorie !== 'Boissons' && (
                        <div className="flex justify-center mt-3 gap-2">
                            {['S', 'M', 'L'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() =>
                                        setSize(s as 'S' | 'M' | 'L')
                                    }
                                    className={`rounded-full px-3 py-1 text-white text-sm font-semibold ${
                                        size === s
                                            ? 'bg-tertiary'
                                            : 'bg-secondary-variant text-black'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                {/* Boutons + / - */}
                <div className="flex items-center mt-3 gap-4 bg-primary-variant rounded-full px-4 py-2 text-white font-bold text-lg">
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>

                {/* Affichage prix */}
                <div className="mt-3 bg-primary-variant text-white px-6 py-1 rounded-full font-bold">
                    {categorie === 'Antipasti & Snacks' ||
                    categorie === 'Boissons'
                        ? price.toFixed(2)
                        : getPriceForSize(price, size).toFixed(2)}
                    €
                </div>
            </div>
        </div>
    );
};

export default PizzaComponent;
