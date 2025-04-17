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
          <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="col-span-full">
              <h2 className="text-3xl font-bold font-outfit mb-4 text-left">
                {category}
              </h2>
            </div>
            
            {items.map((pizza) => (
              <PizzaComponent
                key={pizza.name}
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
