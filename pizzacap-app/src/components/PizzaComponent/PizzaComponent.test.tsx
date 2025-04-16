import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PizzaComponent from './PizzaComponent';

describe('<PizzaComponent />', () => {
  test('it should mount', () => {
    render(<PizzaComponent name={''} image_url={''} ingredients={[]} price={0} />);

    const pizzaComponent = screen.getByTestId('PizzaComponent');

    expect(pizzaComponent).toBeInTheDocument();
  });
});