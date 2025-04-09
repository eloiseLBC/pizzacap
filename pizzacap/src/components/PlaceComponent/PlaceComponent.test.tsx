import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlaceComponent from './PlaceComponent';

describe('<PlaceComponent />', () => {
  test('it should mount', () => {
    render(<PlaceComponent />);

    const placeComponent = screen.getByTestId('PlaceComponent');

    expect(placeComponent).toBeInTheDocument();
  });
});