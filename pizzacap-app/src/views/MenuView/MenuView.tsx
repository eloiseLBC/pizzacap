import React, { FC } from 'react';
import PizzaComponent from '../../components/PizzaComponent/PizzaComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { useState, useEffect } from 'react';
import { PizzaComponentProps } from '../../models/PizzaComponentProps';

interface MenuViewProps {}

const MenuView: FC<MenuViewProps> = () => {
    const [posts, setPosts] = useState<PizzaComponentProps[]>([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5050/pizzas')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <NavbarComponent></NavbarComponent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-100 min-h-screen">
            {posts.map((posts: PizzaComponentProps) => {
                    return (
                        <div key={posts.name} className="flex flex-col items-center">
                            <PizzaComponent
                                name={posts.name}
                                image_url={posts.image_url}
                                ingredients={posts.ingredients}
                                price={posts.price} />
                        </div>
                    );
                }
                )}
            </div>
        </>
    );
};

export default MenuView;
