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

  return (
    <div className="p-6 md:p-12 font-outfit">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">{pizza.name}</h1>
          <h2 className="text-2xl mb-4">Ingrédients</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{pizza.ingredients}</p>

          <div className="flex gap-4 mb-4">
            {['S', 'M', 'L'].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s as 'S' | 'M' | 'L')}
                className={`px-4 py-2 rounded-full text-white font-semibold text-lg transition ${
                  size === s ? 'bg-green-600' : 'bg-beige text-black'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="text-xl bg-beige px-4 py-2 rounded-full inline-block font-semibold mb-4">
            {pizza.price}€
          </div>

          <div className="flex gap-4 mb-4">
            {pizza.nutriscore && (
              <div className="flex items-center gap-2 bg-beige rounded-full px-4 py-2">
                <span>Nutriscore</span>
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {pizza.nutriscore}
                </span>
              </div>
            )}
            {pizza.stars && (
              <div className="flex items-center gap-2 bg-beige rounded-full px-4 py-2">
                <span>Note</span>
                <span>🌟 {pizza.stars}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 mb-6">
            {pizza.promos?.map((promo, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold"
              >
                {promo}
              </div>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-16 h-16 rounded-full bg-green-600 text-white text-3xl flex items-center justify-center shadow-lg"
          >
            +
          </button>
        </div>

        <div className="relative">
          <img
            src={pizza.image_url}
            alt={pizza.name}
            className="rounded-xl shadow-xl w-full"
          />
          {pizza.features?.includes('végétarienne') && (
            <img
              src={leafIcon}
              alt="Végétarienne"
              className="absolute top-4 right-4 w-14 h-14 drop-shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PizzaDetailView;