import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCard from './UserCard';

describe('UserCard', () => {
    const mockUser = { id: '1', name: 'Leanne Graham', email: 'leanne@example.com', city: 'Gwenborough' };

    it('ejecuta onToggleFavorite con el id correcto al hacer clic', async () => {
        const onToggle = vi.fn();
        render(<UserCard user={mockUser} isFavorite={false} onToggleFavorite={onToggle} />);

        const button = screen.getByRole('button', { name: /Marcar como Favorito/i });
        await userEvent.click(button);

        expect(onToggle).toHaveBeenCalledWith('1');
    });
});