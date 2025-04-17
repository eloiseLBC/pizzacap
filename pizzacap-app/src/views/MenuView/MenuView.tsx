import React, { useEffect, useState } from 'react';
import PizzaComponent from '../../components/PizzaComponent/PizzaComponent';
import { PizzaComponentProps } from '../../models/PizzaComponentProps';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

const MenuView = () => {
    const [pizzas, setPizzas] = useState<PizzaComponentProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetch('http://127.0.0.1:5050/pizzas')
            .then((res) => res.json())
            .then((data) => setPizzas(data))
            .catch((err) => console.log(err));
    }, []);

    // Filtrage par mot-clé
    const filteredPizzas = pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Regroupement par catégorie
    const groupedByCategory: { [key: string]: PizzaComponentProps[] } =
        filteredPizzas.reduce((acc, pizza) => {
            const category = pizza.categorie || 'Autres';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(pizza);
            return acc;
        }, {} as { [key: string]: PizzaComponentProps[] });

    return (
        <>
            <NavbarComponent />

            {/* Barre de recherche */}
            <div className="flex justify-center mt-8">
                <input
                    type="text"
                    placeholder="Rechercher une pizza..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 font-outfit"
                />
            </div>

            {/* Pizzas */}
            <div className="p-8 max-w-screen-xl mx-auto">
                {Object.keys(groupedByCategory).length === 0 ? (
                    <p className="text-center text-gray-500 mt-8 font-outfit">
                        Aucun résultat ne correspond à ta recherche.
                    </p>
                ) : (
                    Object.entries(groupedByCategory).map(
                        ([category, items]) => (
                            <div key={category} className="mb-12">
                                <h2 className="text-3xl font-bold font-outfit mb-6 text-left">
                                    {category}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                        ),
                    )
                )}
            </div>
        </>
    );
};

export default MenuView;
