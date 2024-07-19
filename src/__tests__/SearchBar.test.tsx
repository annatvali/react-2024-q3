import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { describe, test, expect, vi, beforeEach } from 'vitest';

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(Storage.prototype, 'setItem');
  vi.spyOn(Storage.prototype, 'getItem');
});

describe('SearchBar Component', () => {
  test('saves the entered value to local storage when clicking the Search button', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Search Pokémon...');
    const searchButton = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'Pikachu' } });
    fireEvent.click(searchButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('searchQuery', 'Pikachu');
    expect(onSearchMock).toHaveBeenCalledWith('Pikachu');
  });

  test('retrieves the value from local storage upon mounting', async () => {
    localStorage.setItem('searchQuery', 'Charmander');

    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Search Pokémon...');

    waitFor(() => {
      expect(inputElement).toHaveValue('Charmander');
    });
  });
});