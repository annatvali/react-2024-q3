import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonListResponse, PokemonExtended } from '../types/types';
import { transformPokemonData } from '../utils/dataTransforms';
import { ITEMS_PER_PAGE } from '../utils/constants';

export interface GetPokemonsParams {
  page: number;
  offset?: number;
}

export interface GetPokemonsResponse {
  results: Pokemon[];
  count: number;
  next?: string | null;
  previous?: string | null;
}

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<GetPokemonsResponse, GetPokemonsParams>({
      query: ({ page = 1 }) => {
        const offset = (page - 1) * ITEMS_PER_PAGE;
        return `?offset=${offset}&limit=${ITEMS_PER_PAGE}`;
      },
      transformResponse: (response: PokemonListResponse) => {
        const transformedData = transformPokemonData(response);
        return {
          ...transformedData,
          count: response.count,
          next: response.next,
          previous: response.previous,
        };
      },
    }),
    getPokemonDetails: builder.query<PokemonExtended, string>({
      query: (detailsId) => `/${detailsId}`,
    }),
    searchPokemon: builder.query<GetPokemonsResponse, string>({
      query: (searchQuery: string) => `?search=${searchQuery.toLowerCase()}`,
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonDetailsQuery,
  useSearchPokemonQuery,
} = pokemonApi;
