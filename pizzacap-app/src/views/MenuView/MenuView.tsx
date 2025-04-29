import React, { useEffect, useState } from 'react';
const PizzaComponent = React.lazy(
    () => import('../../components/PizzaComponent/PizzaComponent'),
);
import { PizzaComponentProps } from '../../models/PizzaComponentProps';

const MenuView = () => {
    const [pizzas, setPizzas] = useState<PizzaComponentProps[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );
    const [showCategories, setShowCategories] = useState(true);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5050/pizzas');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPizzas(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch pizzas. Please try again later.');
            }
        };
        fetchPizzas();
    }, []);

    const allCategories = Array.from(
        new Set(
            pizzas
                .map((p) => p.categorie)
                .filter((c): c is string => typeof c === 'string'),
        ),
    );

    const filteredPizzas = pizzas.filter((p) => {
        const matchesSearch = p.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory
            ? p.categorie === selectedCategory
            : true;
        return matchesSearch && matchesCategory;
    });

    const groupedByCategory: { [key: string]: PizzaComponentProps[] } =
        filteredPizzas.reduce((acc, pizza) => {
            const category = pizza.categorie || 'Autres';
            if (!acc[category]) acc[category] = [];
            acc[category].push(pizza);
            return acc;
        }, {} as { [key: string]: PizzaComponentProps[] });

    return (
        <>
            {/* Erreurs OU liste des pizzas */}
            {error ? (
                <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-surface via-white to-surface text-center p-4">
                    <h1 className="text-5xl font-extrabold text-primary mb-6 ">
                        404: Lost in the sauce 🚩
                    </h1>

                    <img
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGNmc2toNzl2dzJjY29oNnN1c3Rma2tybDVqcWE5ajR5aGRhbGlwYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Pjg7H8LMsK0W54Uqcn/giphy.gif"
                        alt="Error 404"
                        className="w-80 h-80 object-cover rounded-3xl mb-6 shadow-2xl"
                    />

                    <p className="text-lg text-gray-600 mb-2 max-w-md">
                        Impossible de récupérer les données
                    </p>
                </div>
            ) : (
                <div className="w-full pt-20 pb-20">
                    {/* BARRE STICKY indépendante */}
                    <div className="sticky top-0 z-40 bg-surface py-4 shadow-sm">
                        <div className="flex justify-center items-center gap-4 px-4">
                            <button
                                onClick={() =>
                                    setShowCategories(!showCategories)
                                }
                                className="bg-beige rounded-full w-10 h-10 flex items-center justify-center text-xl text-gray-600 shadow-md"
                            >
                                {showCategories ? '-' : '+'}
                            </button>

                            <input
                                type="text"
                                placeholder="Rechercher une pizza..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-xl px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 font-outfit"
                            />
                        </div>

                        {/* Filtres de catégories */}
                        {showCategories && (
                            <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-6 py-2 rounded-full font-outfit text-lg transition-colors duration-200 ${
                                        selectedCategory === null
                                            ? 'bg-green-600 text-white'
                                            : 'bg-beige text-gray-700'
                                    }`}
                                >
                                    Toutes
                                </button>
                                {allCategories.map((cat: string) => (
                                    <button
                                        key={cat}
                                        onClick={() =>
                                            setSelectedCategory(
                                                cat === selectedCategory
                                                    ? null
                                                    : cat,
                                            )
                                        }
                                        className={`px-6 py-2 rounded-full font-outfit text-lg transition-colors duration-200 ${
                                            selectedCategory === cat
                                                ? 'bg-green-600 text-white'
                                                : 'bg-beige text-gray-700'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {Object.keys(groupedByCategory).length === 0 ? (
                        <p className="text-center text-gray-500 mt-8 mb-8 font-outfit">
                            Aucun résultat ne correspond à ta recherche.
                        </p>
                    ) : (
                        Object.entries(groupedByCategory).map(
                            ([category, items]) => (
                                <div
                                    key={category}
                                    className="max-w-screen-xl mx-auto"
                                >
                                    <h2 className="text-3xl font-bold font-outfit mb-8 mt-10 text-left px-6 md:px-10">
                                        {category}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto max-w-[1200px]">
                                        {items.map((pizza) => (
                                            <PizzaComponent
                                                key={pizza.id}
                                                id={pizza.id}
                                                name={pizza.name}
                                                image_url={pizza.image_url}
                                                ingredients={pizza.ingredients}
                                                price={pizza.price}
                                                features={pizza.features}
                                                categorie={pizza.categorie}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ),
                        )
                    )}
                    </div>
            )}
        </>
        
    );
};

export default MenuView;
