/**
 * @vitest-environment jsdom
 */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../../contexts/CartContext'; // adapte si besoin
import PizzaDetailView from './PizzaDetailView';

// Mock fetch pour retourner une pizza simulée
const mockPizza = {
    id: '1',
    name: 'Margherita',
    ingredients: 'Tomato, Mozzarella, Basil',
    image_url: '/fake-image.jpg',
    price: 10,
    features: { Vegetarian: 'true' },
};

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockPizza),
    }),
) as unknown as typeof fetch;

describe('PizzaDetailView', () => {
    it('affiche "Chargement..." au début', () => {
        render(
            <MemoryRouter initialEntries={['/pizza/1']}>
                <CartProvider>
                    <Routes>
                        <Route
                            path="/pizza/:pizzaId"
                            element={<PizzaDetailView />}
                        />
                    </Routes>
                </CartProvider>
            </MemoryRouter>,
        );

        const loadingText = screen.getByText(/Chargement/i);
        expect(loadingText).to.exist;
    });

    it('affiche les détails de la pizza après chargement', async () => {
        render(
            <MemoryRouter initialEntries={['/pizza/1']}>
                <CartProvider>
                    <Routes>
                        <Route
                            path="/pizza/:pizzaId"
                            element={<PizzaDetailView />}
                        />
                    </Routes>
                </CartProvider>
            </MemoryRouter>,
        );

        // Attend que la pizza soit chargée
        await waitFor(() => {
            expect(screen.getByText('Margherita')).to.exist;
        });

        expect(screen.getByText(/Tomato, Mozzarella, Basil/i)).to.exist;
        expect(screen.getByText('10.00€')).to.exist; // Prix en taille M par défaut
    });

    it('permet de changer la taille et met à jour le prix', async () => {
        render(
            <MemoryRouter initialEntries={['/pizza/1']}>
                <CartProvider>
                    <Routes>
                        <Route
                            path="/pizza/:pizzaId"
                            element={<PizzaDetailView />}
                        />
                    </Routes>
                </CartProvider>
            </MemoryRouter>,
        );

        await waitFor(() => {
            expect(screen.getByText('Margherita')).to.exist;
        });

        // Clique sur 'L' (taille Large)
        fireEvent.click(screen.getByText('L'));

        // Le prix doit être recalculé pour L (10€ * 1.2 = 12€)
        expect(screen.getByText('12.00€')).to.exist;
    });
});
