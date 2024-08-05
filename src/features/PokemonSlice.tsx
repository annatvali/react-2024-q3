import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../types/types';

export interface PokemonState {
  currentPage: number;
  isPokemonDetailsOpen: boolean;
  theme: Theme;
  detailsId: string | null;
  searchQuery: string;
}

const initialState: PokemonState = {
  currentPage: 1,
  isPokemonDetailsOpen: false,
  theme: 'dark',
  detailsId: null,
  searchQuery: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setIsPokemonDetailsOpen(state, action: PayloadAction<boolean>) {
      state.isPokemonDetailsOpen = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setSelectedId(state, action: PayloadAction<string | null>) {
      state.detailsId = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setIsPokemonDetailsOpen,
  setTheme,
  setSelectedId,
  setSearchQuery,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
