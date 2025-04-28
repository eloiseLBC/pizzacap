import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterComponent from './HeroComponent';

describe('<HeroComponent />', () => {
    test('it should mount', () => {
        render(<FooterComponent />);

        const footerComponent = screen.getByTestId('FooterComponent');

        expect(footerComponent).toBeInTheDocument();
    });
});
