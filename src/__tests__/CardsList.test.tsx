import { render, screen } from '@testing-library/react';
import CardsList from '../components/CardsList';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
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
  test('renders the specified number of cards', () => {
    render(
      <BrowserRouter>
        <CardsList pokemons={mockPokemons} />
      </BrowserRouter>
    );
    const cardImages = screen.getAllByRole('img', {
      name: /bulbasaur|ivysaur/i,
    });
    expect(cardImages).toHaveLength(mockPokemons.length);
  });

  test('displays an appropriate message if no cards are present', () => {
    render(
      <BrowserRouter>
        <CardsList pokemons={[]} />
      </BrowserRouter>
    );
    const message = screen.getByText((_content, node) => {
      const hasText = (node: Element | null) =>
        node?.textContent === 'No Pokémon found.';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node?.children ?? []).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });
    expect(message).toBeInTheDocument();
  });
});
