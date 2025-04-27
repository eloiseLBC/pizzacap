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
    const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
    const [quantity, setQuantity] = useState(1);
    const { updateCartItem } = useCart();

    useEffect(() => {
        fetch(`http://127.0.0.1:5050/pizzas/${pizzaId}`)
            .then((res) => res.json())
            .then((data) => setPizza(data))
            .catch((err) => console.error(err));
    }, [pizzaId]);

    useEffect(() => {
        if (pizza?.features) {
            console.log('Features (values):', Object.values(pizza.features));
        }
    }, [pizza]);

    if (!pizza) return <div className="text-center mt-20">Chargement...</div>;

    const featureIcons: { [key: string]: string } = {
        Vegetarian: leafIcon,
        GlutenFree: glutenIcon,
        Spicy: spicyIcon,
    };

    const handleAddToCart = () => {
        updateCartItem({
            name: pizza.name,
            image_url: pizza.image_url,
            price: pizza.price,
            size,
            quantity,
        });
    };

    return (
        <div className="min-h-screen bg-beige font-outfit text-black">
            <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h1 className="text-5xl font-bold mb-4">{pizza.name}</h1>
                    <h2 className="text-2xl font-semibold mb-2">Ingrédients</h2>
                    <p className="text-gray-700 mb-6 max-w-xl leading-relaxed font-jost">
                        {pizza.ingredients}
                    </p>

                    <div className="flex flex-col gap-4 mb-6">
                        <div className="inline-flex items-center gap-2 bg-[#D1B381] rounded-full px-4 py-2 text-white font-outfit shadow-sm w-fit">
                            {['S', 'M', 'L'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() =>
                                        setSize(s as 'S' | 'M' | 'L')
                                    }
                                    className={`px-4 py-1 rounded-full font-bold text-sm transition-all ${
                                        size === s
                                            ? 'bg-green-600 text-white shadow'
                                            : 'bg-beige text-white'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="inline-flex bg-[#D1B381] rounded-full px-6 py-2 text-white font-outfit text-lg font-semibold shadow-sm w-fit">
                            {pizza.price}€
                        </div>

                        <div className="inline-flex items-center gap-6 bg-[#D1B381] rounded-full px-6 py-2 text-white font-outfit shadow-sm w-fit">
                            <div className="flex flex-col items-center">
                                <span className="text-xs mb-1">Nutriscore</span>
                                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shadow-sm">
                                    B
                                </span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs mb-1">Note</span>
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold text-base">
                                        5
                                    </span>
                                    <div className="w-5 h-5 rounded-full bg-[#D9C299] flex items-center justify-center text-sm text-white">
                                        <img
                                            src={starsIcon}
                                            alt="Étoiles"
                                            className="w-4 h-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-[900px] top-8">
                    {/* Badge de features */}
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
                                            : normalized.includes('seafood')
                                            ? 'Seafood'
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

                    {/* Image de la pizza */}
                    <img
                        src={pizza.image_url}
                        alt={pizza.name}
                        className="object-cover rounded-[30px]"
                        style={{ height: '456px', width: '900px' }}
                    />

                    {/* Forme blanche arrondie en bas */}
                    <div
                        className="absolute bottom-0 left-0 w-[160px] h-[130px] bg-white z-10"
                        style={{
                            clipPath: 'url(#pizzaShape)',
                            borderTopRightRadius: '30px',
                        }}
                    ></div>

                    {/* Bouton + */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-[25px] left-[35px] w-20 h-20 bg-green-600 text-white rounded-full z-20 shadow text-5xl flex items-center justify-center transition-transform duration-300 transform hover:scale-105 "
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex justify-center mt-6 gap-4">
                <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-sm text-center">
                    -30% sur la 2ᵠ
                </span>
                <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-sm text-center">
                    3 achetées 1 offerte
                </span>
            </div>
        </div>
    );
};

export default PizzaDetailView;
