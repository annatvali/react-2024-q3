import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../reducers/pokemonReducer';

type GetPokemonParams = {
  page: number;
  itemsPerPage: number;
};

type SearchPokemonRes = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  base_experience: number;
  weight: number;
  height: number;
};

type PokemonRes = {
  results: Pokemon[];
  count: number;
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getAllPokemons: builder.query<PokemonRes, { count: number }>({
      query: ({ count }) => `/pokemon?limit=${count}`,
    }),
    getPokemonsByPage: builder.query<PokemonRes, GetPokemonParams>({
      query: ({ page, itemsPerPage }) => {
        const offset = (page - 1) * itemsPerPage;
        const limit = itemsPerPage;
        return `/pokemon?offset=${offset}&limit=${limit}`;
      },
    }),
    searchPokemon: builder.query<SearchPokemonRes, { searchTerm: string }>({
      query: ({ searchTerm }) => ({
        url: `/pokemon?search=${searchTerm}`,
      }),
    }),
    getPokemonDetails: builder.query<SearchPokemonRes, string>({
      query: (pokemonId) => `/pokemon/${pokemonId}`,
    }),
  }),
});

export const {
  useGetAllPokemonsQuery,
  useGetPokemonsByPageQuery,
  useSearchPokemonQuery,
  useGetPokemonDetailsQuery,
} = pokemonApi;
