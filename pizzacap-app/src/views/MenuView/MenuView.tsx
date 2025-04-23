import React, { useEffect, useState } from 'react';
import PizzaComponent from '../../components/PizzaComponent/PizzaComponent';
import { PizzaComponentProps } from '../../models/PizzaComponentProps';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

const MenuView = () => {
    const [pizzas, setPizzas] = useState<PizzaComponentProps[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    useEffect(() => {
        fetch('http://127.0.0.1:5050/pizzas')
            .then((res) => res.json())
            .then((data) => setPizzas(data))
            .catch((err) => console.log(err));
    }, []);

    // Liste des catégories uniques sans undefined
    const allCategories = Array.from(
        new Set(
            pizzas
                .map((p) => p.categorie)
                .filter((c): c is string => typeof c === 'string'),
        ),
    );

    // Filtrage par recherche et catégorie
    const filteredPizzas = pizzas.filter((p) => {
        const matchesSearch = p.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory
            ? p.categorie === selectedCategory
            : true;
        return matchesSearch && matchesCategory;
    });

    // Groupement par catégorie
    const groupedByCategory: { [key: string]: PizzaComponentProps[] } =
        filteredPizzas.reduce((acc, pizza) => {
            const category = pizza.categorie || 'Autres';
            if (!acc[category]) acc[category] = [];
            acc[category].push(pizza);
            return acc;
        }, {} as { [key: string]: PizzaComponentProps[] });

    return (
        <>
            <div className="w-full">
                {/* Barre de recherche */}
                <div className="flex justify-center mt-10 mb-6 px-4">
                    <input
                        type="text"
                        placeholder="Rechercher une pizza..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-xl px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 font-outfit"
                    />
                </div>

                {/* Filtres de catégories */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 px-4">
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
                                    cat === selectedCategory ? null : cat,
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

                {/* Message si aucun résultat */}
                {Object.keys(groupedByCategory).length === 0 && (
                    <p className="text-center text-gray-500 mt-8 font-outfit">
                        Aucun résultat ne correspond à ta recherche.
                    </p>
                )}

                {/* Affichage des pizzas par catégorie */}
                {Object.entries(groupedByCategory).map(([category, items]) => (
                    <div
                        key={category}
                        className="max-w-screen-xl mx-auto mb-20"
                    >
                        <h2 className="text-3xl font-bold font-outfit mb-8 mt-20 text-left px-6 md:px-10">
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-10">
                            {items.map((pizza) => (
                                <PizzaComponent
                                    key={pizza.id}
                                    id={pizza.id}
                                    name={pizza.name}
                                    image_url={pizza.image_url}
                                    ingredients={pizza.ingredients}
                                    price={pizza.price}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MenuView;
