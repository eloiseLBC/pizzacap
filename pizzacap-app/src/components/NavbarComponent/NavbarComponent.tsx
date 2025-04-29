import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import logo from '../../assets/Logo_PizzaCap_Couleur.png';
import bagShopping from '../../assets/bag-shopping-solid.svg';
import house from '../../assets/house-solid.svg';
import tag from '../../assets/tag-solid.svg';
import location from '../../assets/location-dot-solid.svg';
import { Link } from 'react-router-dom';
import CartOverlay from '../CartOverlayComponent/CartOverlayComponent';

const NavbarComponent: React.FC = () => {
    const { cartItems, lastAddedTime } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isVibrating, setIsVibrating] = useState(false);

    // Quand un nouvel item est ajouté au panier
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (totalItems > 0) {
            setIsVibrating(true);
            const timeout = setTimeout(() => setIsVibrating(false), 400); // reset après l'animation
            return () => clearTimeout(timeout);
        }
    }, [totalItems]);

    // Dès qu'on ajoute une pizza => vibration de la pastille !
    useEffect(() => {
        if (lastAddedTime) {
            setIsVibrating(true);
            const timeout = setTimeout(() => setIsVibrating(false), 500); // vibration 500ms
            return () => clearTimeout(timeout);
        }
    }, [lastAddedTime]);

    return (
        <div>
            <div
                data-testid="NavbarComponent"
                className="bg-primary text-white flex font-outfit font-light lg:rounded-b-xl lg:rounded-t-none rounded-t-xl p-2 justify-center align-center  fixed w-full lg:top-0 bottom-0 lg:bottom-auto z-[1200] place-content-between "
            >
                <Link to="/">
                    <img
                        src={house}
                        alt="My logo"
                        className="w-12 p-2  mx-4 lg:hidden"
                    />
                </Link>
                <Link to="#">
                    <img
                        src={location}
                        alt="My logo"
                        className="w-10 p-2  mx-4 lg:hidden"
                    />
                </Link>

                <Link to="/" className='hidden lg:block'>
                    <img src={logo} alt="My logo" className="w-20 mx-4 " />
                </Link>
                <Link to="/menu" className='lg:hidden'>
                    <img src={logo} alt="My logo" className="w-20  mx-4" />
                </Link>
                <div className="flex-grow hidden lg:inline-flex gap-4 items-center justify-center">
                    <Link to="/menu">Commander</Link>
                    <a href="#">Offres</a>
                    <a href="#">Uber/Deliveroo</a>
                    <a href="#">Nous trouver</a>
                </div>
                <div className="relative mx-4 lg:mr-8">
                    <img
                        src={bagShopping}
                        alt="Panier"
                        className="w-10 p-2 cursor-pointer sm:w-14"
                        onClick={() => setIsCartOpen(true)}
                    />

                    {totalItems > 0 && (
                        <span
                            className={`absolute top-1 right-1 bg-red-500 rounded-full w-3 h-3
    ${isVibrating ? 'gentle-shake-animation' : ''} transition-all duration-300`}
                        />
                    )}
                </div>
                <Link to="#">
                <img
                    src={tag}
                    alt="My logo"
                    className="w-11 p-2 mx-4 lg:hidden"
                />
            </Link>
            </div>
            
            <CartOverlay
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
};

export default NavbarComponent;
