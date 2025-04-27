import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import logo from '../../assets/Logo_PizzaCap_Couleur.png';
import bagShopping from '../../assets/bag-shopping-solid.svg';
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
    <>
      <div className="bg-primary text-white flex font-outfit font-light rounded-b-xl p-2">
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
          <img
            src={bagShopping}
            alt="Panier"
            className="w-10 p-2 cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          />
          
          {totalItems > 0 && (
  <span className={`absolute top-1 right-1 bg-red-500 rounded-full w-3 h-3
    ${isVibrating ? 'gentle-shake-animation' : ''} transition-all duration-300`} />
)}

        </div>
      </div>

      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavbarComponent;
