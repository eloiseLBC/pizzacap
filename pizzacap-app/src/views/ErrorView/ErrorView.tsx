import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorView: FC = () => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-surface text-center">
      <h1 className="text-4xl font-bold mb-6">404: Page non trouvée 🧚🏽‍♀️</h1>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm9veHJmZHNjc2o1Z2l1OHd0dTZ0dzAzc2dlaW51ZWVuNW9vZWcweiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dOOKk7VHAvJja/giphy.gif"
        alt="Error 404"
        className="w-80 h-80 object-cover rounded-2xl mb-8 shadow-lg"
      />
      <button
        onClick={handleBackToMenu}
        className="px-6 py-3 bg-primary-variant hover:bg-primary-dark text-white rounded-full font-semibold transition duration-300"
      >
        Back to Menu
      </button>
    </div>
  );
};

export default ErrorView;
