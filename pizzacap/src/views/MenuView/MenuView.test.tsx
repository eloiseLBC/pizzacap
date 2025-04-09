import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuView from './MenuView';

describe('<MenuView />', () => {
  test('it should mount', () => {
    render(<MenuView />);

    const menuView = screen.getByTestId('MenuView');

    expect(menuView).toBeInTheDocument();
  });
});