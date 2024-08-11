import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CardList from '../src/components/CardList';
import { useAppDispatch, useAppSelector } from '../src/app/store';
import { selectItem, unselectItem } from '../src/features/SelectedItemsSlice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../src/app/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: (state = { selectedItems: [] }, action) => {
      switch (action.type) {
        case selectItem.type:
          return { selectedItems: [...state.selectedItems, action.payload] };
        case unselectItem.type:
          return {
            selectedItems: state.selectedItems.filter(
              (item) => item !== action.payload
            ),
          };
        default:
          return state;
      }
    },
  },
});

describe('CardList Component', () => {
  const mockPokemons = [
    {
      id: 1,
      name: 'Bulbasaur',
      sprites: { front_default: 'http://github.com/bulbasaur.png' },
    },
    {
      id: 2,
      name: 'Ivysaur',
      sprites: { front_default: 'http://github.com/ivysaur.png' },
    },
  ];

  const mockOnClick = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
  });

  test('renders CardList component', () => {
    render(
      <Provider store={mockStore}>
        <CardList pokemons={mockPokemons} onCardClick={mockOnClick} />
      </Provider>
    );

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByText(`${pokemon.id}`)).toBeInTheDocument();

      const imageElement = screen.getByRole('img', { name: pokemon.name });
      expect(imageElement).toHaveAttribute('src');
      expect(imageElement.getAttribute('src')).toContain(
        encodeURIComponent(pokemon.sprites.front_default)
      );
    });
  });
});
