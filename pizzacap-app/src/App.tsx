import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import PizzaComponent from './components/PizzaComponent/PizzaComponent';

function App() {

    const [posts, setPosts] = useState({
        name: '',
        image_url: '',
        ingredients: [],
        price: 0
    });
    useEffect(() => {
        fetch('http://127.0.0.1:5050/pizzas/2')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, 
    []);
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <PizzaComponent
            name={posts.name}
            image_url={posts.image_url}
            ingredients={posts.ingredients}
            price={posts.price}
          />
        </div>
      );
}

export default App;