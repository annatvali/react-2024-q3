import { render, screen } from '@testing-library/react';
import CardsList from '../components/CardsList';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

const mockPokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    type: 'grass',
    base_experience: 64,
    image: 'bulbasaur.png',
  },
  {
    id: 2,
    name: 'Ivysaur',
    type: 'grass',
    base_experience: 142,
    image: 'ivysaur.png',
  },
];

describe('CardsList Component', () => {
  it('renders the specified number of cards', () => {
    render(
      <BrowserRouter>
        <CardsList
          pokemons={mockPokemons}
          currentPage={1}
          onCardClick={() => {}}
        />
      </BrowserRouter>
    );
    const cardImages = screen.getAllByRole('img', {
      name: /bulbasaur|ivysaur/i,
    });
    expect(cardImages).toHaveLength(mockPokemons.length);
  });
});
