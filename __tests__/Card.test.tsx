import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../src/app/store';
import { selectItem, unselectItem } from '../src/features/SelectedItemsSlice';
import { Pokemon } from '../src/types/types';
import MemoizedCard from '../src/components/Card';

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

describe('Card Component', () => {
  const mockPokemon: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    sprites: { front_default: 'http://github.com/bulbasaur.png' },
  };

  const mockOnClick = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
  });

  test('renders Card component', () => {
    render(
      <Provider store={mockStore}>
        <MemoizedCard pokemon={mockPokemon} onClick={mockOnClick} />
      </Provider>
    );

    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockPokemon.id}`)).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement.getAttribute('src')).toContain(
      encodeURIComponent(mockPokemon.sprites.front_default)
    );
  });

  test('calls onClick when card is clicked', () => {
    render(
      <Provider store={mockStore}>
        <MemoizedCard pokemon={mockPokemon} onClick={mockOnClick} />
      </Provider>
    );

    fireEvent.click(screen.getByText(mockPokemon.name));
    expect(mockOnClick).toHaveBeenCalledWith(mockPokemon.id);
  });

  test('dispatches selectItem action when checkbox is checked', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    render(
      <Provider store={mockStore}>
        <MemoizedCard pokemon={mockPokemon} onClick={mockOnClick} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledWith(selectItem(mockPokemon.name));
  });

  test('dispatches unselectItem action when checkbox is unchecked', () => {
    (useAppSelector as jest.Mock).mockReturnValue([mockPokemon.name]);

    render(
      <Provider store={mockStore}>
        <MemoizedCard pokemon={mockPokemon} onClick={mockOnClick} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledWith(unselectItem(mockPokemon.name));
  });

  test('handles null sprite URL', () => {
    const mockPokemonWithNullSprite: Pokemon = {
      ...mockPokemon,
      sprites: { front_default: '' },
    };

    render(
      <Provider store={mockStore}>
        <MemoizedCard
          pokemon={mockPokemonWithNullSprite}
          onClick={mockOnClick}
        />
      </Provider>
    );

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', '');
  });
});
