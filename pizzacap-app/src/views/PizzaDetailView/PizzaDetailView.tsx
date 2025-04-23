import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import leafIcon from '../../assets/Vegetarien_logo.png';

interface Pizza {
  id: string;
  name: string;
  image_url: string;
  ingredients: string;
  price: number;
  features?: string[];
  nutriscore?: string;
  stars?: number;
  promos?: string[];
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

  if (!pizza) return <div>Chargement...</div>;

  const handleAddToCart = () => {
    updateCartItem({
      name: pizza.name,
      image_url: pizza.image_url,
      price: pizza.price,
      size,
      quantity,
    });
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(0, prev + delta));
};

return (
    <div className="p-8 font-outfit">
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
                <img src={pizza.image_url} alt={pizza.name} className="rounded-xl w-full max-w-md" />
                {pizza.features?.includes('Vegetarian') && (
                    <div className="absolute top-4 right-4 bg-beige p-3 rounded-xl shadow-md flex items-center gap-2">
                        <span className="text-green-600 font-bold text-lg">🥬</span>
                        <span className="text-black font-semibold">Végétarienne</span>
                    </div>
                )}
            </div>

            <div className="max-w-xl w-full space-y-4">
                <h1 className="text-4xl font-bold">{pizza.name}</h1>
                <h2 className="text-2xl font-semibold">Ingrédients</h2>
                <p className="text-gray-700">{pizza.ingredients}</p>

                <div className="flex gap-4">
                    {['S', 'M', 'L'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s as 'S' | 'M' | 'L')}
                            className={`px-4 py-2 rounded-full font-bold border ${
                                size === s ? 'bg-green-500 text-white' : 'bg-beige text-black'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="bg-beige text-black px-4 py-2 rounded-full font-bold text-xl w-fit">
                    {pizza.price}€
                </div>

                <div className="flex gap-4 items-center">
                    <div className="bg-beige rounded-full px-4 py-1 flex items-center gap-2">
                        <span className="text-gray-600">Nutriscore</span>
                        <span className="bg-green-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full">B</span>
                    </div>
                    <div className="bg-beige rounded-full px-4 py-1 flex items-center gap-2">
                        <span className="text-gray-600">Note</span>
                        <span className="text-xl font-bold">5 ⭐</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="bg-green-500 text-white px-4 py-2 rounded-full text-xl font-bold"
                    >
                        -
                    </button>
                    <span className="text-xl font-bold">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="bg-green-500 text-white px-4 py-2 rounded-full text-xl font-bold"
                    >
                        +
                    </button>
                </div>

                <div className="flex gap-4 mt-4">
                    <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full font-semibold text-sm">
                        -30% sur la 2e
                    </span>
                    <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full font-semibold text-sm">
                        3 achetées 1 offerte
                    </span>
                </div>
            </div>
        </div>
    </div>
);
};

export default PizzaDetailView;