import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('Test inicial del Home', () => {
    it('Render index', () => {
        render(<Home toogleTheme={() => {}} />);

        const button = screen.getByRole('button', { name: /Ir al Listado de Crypto Currencies/i });

        expect(button);
    });
});
