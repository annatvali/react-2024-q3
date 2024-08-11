import reducer, {
  setCurrentPage,
  setIsPokemonDetailsOpen,
  setTheme,
  setSelectedId,
  setSearchQuery,
  PokemonState,
} from '../src/features/PokemonSlice';
import { Theme } from '../src/types/types';

describe('PokemonSlice', () => {
  const initialState: PokemonState = {
    currentPage: 1,
    isPokemonDetailsOpen: false,
    theme: 'dark' as Theme,
    detailsId: null,
    searchQuery: '',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setCurrentPage', () => {
    const actual = reducer(initialState, setCurrentPage(2));
    expect(actual.currentPage).toEqual(2);
  });

  it('should handle setIsPokemonDetailsOpen', () => {
    const actual = reducer(initialState, setIsPokemonDetailsOpen(true));
    expect(actual.isPokemonDetailsOpen).toEqual(true);
  });

  it('should handle setTheme', () => {
    const actual = reducer(initialState, setTheme('light'));
    expect(actual.theme).toEqual('light');
  });

  it('should handle setSelectedId', () => {
    const actual = reducer(initialState, setSelectedId(25));
    expect(actual.detailsId).toEqual(25);
  });

  it('should handle setSearchQuery', () => {
    const actual = reducer(initialState, setSearchQuery('pikachu'));
    expect(actual.searchQuery).toEqual('pikachu');
  });
});
