import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import leafIcon from '../../assets/leaf_details.png';
import glutenIcon from '../../assets/gluten_details.png';
import spicyIcon from '../../assets/pepper-hot-solid.svg';
import starsIcon from '../../assets/stars.png';

interface Pizza {
    id: string;
    name: string;
    ingredients: string;
    image_url: string;
    price: number;
    features?: { [key: string]: string };
}

const PizzaDetailView: React.FC = () => {
    const { pizzaId } = useParams<{ pizzaId: string }>();
    const [pizza, setPizza] = useState<Pizza | null>(null);
    const { cartItems, updateCartItem } = useCart();

    const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
    const quantity =
        cartItems.find(
            (item) => item.name === pizza?.name && item.size === size,
        )?.quantity || 0;

    const [ripple, setRipple] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:5050/pizzas/${pizzaId}`)
            .then((res) => res.json())
            .then((data) => setPizza(data))
            .catch((err) => console.error(err));
    }, [pizzaId]);

    if (!pizza) return <div className="text-center mt-20">Chargement...</div>;

    const featureIcons: { [key: string]: string } = {
        Vegetarian: leafIcon,
        GlutenFree: glutenIcon,
        Spicy: spicyIcon,
    };

    const handleQuantityChange = (newQuantity: number) => {
        updateCartItem({
            name: pizza.name,
            image_url: pizza.image_url,
            price: pizza.price,
            size,
            quantity: newQuantity,
        });
    };

    const handleAddFirstPizza = () => {
        handleQuantityChange(1);
        setRipple(true);
        setTimeout(() => setRipple(false), 500);
    };

    const handleSizeChange = (newSize: 'S' | 'M' | 'L') => {
        setSize(newSize);
    };

    return (
        <div className="min-h-screen bg-beige font-outfit text-black">
            <div className="max-w-[1200px] mx-auto px-6 py-11 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Partie Gauche */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left pl-8 pt-10">
                    <h1 className="text-5xl font-bold mb-4">{pizza.name}</h1>
                    <h2 className="text-2xl font-semibold mb-2">Ingrédients</h2>
                    <p className="text-gray-700 mb-6 max-w-xl leading-relaxed font-jost">
                        {pizza.ingredients}
                    </p>

                    <div className="flex flex-col gap-4 mb-6 items-center lg:items-start">
                        {/* Choix Taille */}
                        <div className="inline-flex items-center gap-2 bg-[#D1B381] rounded-full px-4 py-2 text-white font-outfit shadow-sm w-fit">
                            {['S', 'M', 'L'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() =>
                                        handleSizeChange(s as 'S' | 'M' | 'L')
                                    }
                                    className={`px-4 py-1 rounded-full font-bold text-2xl transition-all ${
                                        size === s
                                            ? 'bg-green-600 text-white shadow'
                                            : 'bg-beige text-white'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Prix */}
                        <div className="inline-flex bg-[#D1B381] rounded-full px-6 py-2 text-white font-outfit text-lg font-semibold shadow-sm w-fit">
                            {pizza.price}€
                        </div>

                        {/* Nutriscore / Note */}
                        <div className="inline-flex items-center gap-6 bg-[#D1B381] rounded-full px-6 py-2 text-white font-outfit shadow-sm w-fit">
                            <div className="flex flex-col items-center">
                                <span className="text-m mb-1">Nutriscore</span>
                                <span className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-sm">
                                    B
                                </span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-m mb-1">Note</span>
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold text-base">
                                        5
                                    </span>
                                    <img
                                        src={starsIcon}
                                        alt="Étoiles"
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partie Droite */}
                <div className="relative w-full max-w-[900px] top-8">
                    {pizza.features &&
                        Object.keys(pizza.features).length > 0 && (
                            <div className="absolute top-12 right-[-70px] bg-secondary-variant rounded-full px-8 py-4 shadow-md flex gap-5 items-center z-30 min-h-[70px]">
                                {Object.entries(pizza.features).map(
                                    ([featureName, isEnabled], index) => {
                                        if (!isEnabled) return null;
                                        const normalized = featureName
                                            .toLowerCase()
                                            .replace(/[^a-z]/g, '');
                                        const matchKey = normalized.includes(
                                            'vegetarian',
                                        )
                                            ? 'Vegetarian'
                                            : normalized.includes('gluten')
                                            ? 'GlutenFree'
                                            : normalized.includes('spicy') ||
                                              normalized.includes('epice')
                                            ? 'Spicy'
                                            : null;
                                        return matchKey &&
                                            featureIcons[matchKey] ? (
                                            <img
                                                key={index}
                                                src={featureIcons[matchKey]}
                                                alt={matchKey}
                                                className="w-16 h-16 object-contain transition-transform duration-300 transform hover:scale-110"
                                            />
                                        ) : null;
                                    },
                                )}
                            </div>
                        )}

                    <div className="relative">
                        {/* Div blanche arrondie */}
                        <div
                            className={`absolute bottom-0 left-0 ${
                                quantity > 0 ? 'w-[220px]' : 'w-[160px]'
                            } h-[130px] bg-white z-30 transition-all duration-700 ease-out rounded-tr-[30px]`}
                        >
                            <div className="absolute top-0 left-0 w-[60px] h-[60px] bg-beige rounded-br-[30px]"></div>
                            <div className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-beige rounded-tl-[30px]"></div>
                        </div>

                        {/* Image pizza */}
                        <img
                            src={pizza.image_url}
                            alt={pizza.name}
                            className="object-cover rounded-[30px] z-10"
                            style={{ height: '456px', width: '900px' }}
                        />

                        {/* Bouton contrôleur */}
                        <div className="absolute bottom-[25px] left-[35px] z-40">
                            <div
                                className={`bg-green-600 text-white rounded-full shadow flex items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
                                    quantity > 0 ? 'w-[160px] px-6' : 'w-20'
                                } h-20`}
                            >
                                {quantity > 0 ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    quantity > 0
                                                        ? quantity - 1
                                                        : 0,
                                                )
                                            }
                                            className="text-4xl font-bold transition-transform duration-200 active:scale-90"
                                        >
                                            -
                                        </button>
                                        <span className="text-3xl font-bold mx-4">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    quantity + 1,
                                                )
                                            }
                                            className="text-4xl font-bold transition-transform duration-200 active:scale-90"
                                        >
                                            +
                                        </button>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <div
                                            className={`absolute inset-0 rounded-full bg-white opacity-30 scale-0 transition-transform duration-500 ${
                                                ripple
                                                    ? 'scale-150 opacity-0'
                                                    : ''
                                            }`}
                                        />
                                        <button
                                            onClick={handleAddFirstPizza}
                                            className="text-4xl font-bold transition-transform duration-200 active:scale-90 relative z-10"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bandeau Offres */}
            <div className="flex justify-center mt-6 gap-4">
                <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-sm text-center">
                    -30% sur la 2ᵉ
                </span>
                <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-sm text-center">
                    3 achetées 1 offerte
                </span>
            </div>
        </div>
    );
};

export default PizzaDetailView;
