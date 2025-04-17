import React, { useEffect, useState } from 'react';
import PizzaComponent from '../../components/PizzaComponent/PizzaComponent';
import { PizzaComponentProps } from '../../models/PizzaComponentProps';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

const MenuView = () => {
  const [pizzas, setPizzas] = useState<PizzaComponentProps[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5050/pizzas')
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.log(err));
  }, []);

  const groupedByCategory: { [key: string]: PizzaComponentProps[] } = pizzas.reduce((acc, pizza) => {
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
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-10 max-w-screen-xl mx-auto">
        {Object.entries(groupedByCategory).map(([category, items]) => (
          <div key={category} className="mb-16">
            <h2 className="text-3xl font-bold font-outfit text-left ml-2 sm:ml-4 mb-6">{category}</h2>

            <div className="flex flex-wrap justify-center gap-8">
              {items.map((pizza) => (
                <PizzaComponent
                  key={pizza.name} // important pour éviter les warnings React
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
