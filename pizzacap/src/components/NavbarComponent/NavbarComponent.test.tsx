import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarComponent from './NavbarComponent';

describe('<NavbarComponent />', () => {
  test('it should mount', () => {
    render(<NavbarComponent />);

    const navbarComponent = screen.getByTestId('NavbarComponent');

    expect(navbarComponent).toBeInTheDocument();
  });
});