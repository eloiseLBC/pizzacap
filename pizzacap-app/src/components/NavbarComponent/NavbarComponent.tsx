import React, { FC } from 'react';
import logo from '../../assets/Logo_PizzaCap_Couleur.png';
import bagShopping from '../../assets/bag-shopping-solid.svg';

interface NavbarComponentProps {}

const NavbarComponent: FC<NavbarComponentProps> = () => (
    <div
        data-testid="NavbarComponent"
        className="bg-primary text-white flex  font-outfit font-light rounded-b-xl p-2"
    >
        <img src={logo} alt="My logo" className="w-20" />
        <div className="flex-grow inline-flex gap-4 items-center justify-center">
            <a href="#" className="">
                Commander
            </a>
            <a href="#">Offres</a>
            <a href="#">Uber/Deliveroo</a>
            <a href="#">Nous trouver</a>
        </div>
        <img src={bagShopping} alt="My logo" className="w-10 p-2 mr-8" />
    </div>
);

export default NavbarComponent;
