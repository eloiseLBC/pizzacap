import React, { FC } from 'react';
import logo from '../../assets/Logo_PizzaCap_Couleur.png';
import bagShopping from '../../assets/bag-shopping-solid.svg';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const NavbarComponent: FC = () => {
    const { cartItems, getCartItemCount } = useCart();
    const itemCount = getCartItemCount();

    return (
        <div
            data-testid="NavbarComponent"
            className="bg-primary text-white flex font-outfit font-light rounded-b-xl p-2"
        >
            <Link to="/">
                <img src={logo} alt="My logo" className="w-20" />
            </Link>

            <div className="flex-grow inline-flex gap-4 items-center justify-center">
                <Link to="/menu">Commander</Link>
                <a href="#">Offres</a>
                <a href="#">Uber/Deliveroo</a>
                <a href="#">Nous trouver</a>
            </div>

            <div className="relative mr-8">
                <img src={bagShopping} alt="Panier" className="w-10 p-2" />
                {itemCount > 0 && (
                    <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-red-600" />
                )}
            </div>
        </div>
    );
};

export default NavbarComponent;
