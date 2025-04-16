import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PizzaDetailView from './PizzaDetailView';

describe('<PizzaDetailView />', () => {
  test('it should mount', () => {
    render(<PizzaDetailView />);

    const pizzaDetailView = screen.getByTestId('PizzaDetailView');

    expect(pizzaDetailView).toBeInTheDocument();
  });
});