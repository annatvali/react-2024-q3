import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonListResponse, PokemonResult } from '../types/types';
import { ITEMS_PER_PAGE } from '../utils/constants';

export interface GetPokemonsParams {
  page: number;
  offset?: number;
}

export interface GetPokemonsResponse {
  results: Pokemon[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<GetPokemonsResponse, GetPokemonsParams>({
      query: ({ page = 1 }) => {
        const offset = (page - 1) * ITEMS_PER_PAGE;
        return `?limit=${ITEMS_PER_PAGE}&offset=${offset}`;
      },
      transformResponse: async (
        response: PokemonListResponse
      ): Promise<GetPokemonsResponse> => {
        const getPokemonsResults = await Promise.all(
          response.results.map(async (data: PokemonResult) => {
            const pokemonResponse = await fetch(data.url);
            const pokemonData: Pokemon = await pokemonResponse.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              sprites: {
                front_default: pokemonData.sprites.front_default,
                back_default: pokemonData.sprites.back_default,
                front_shiny: pokemonData.sprites.front_shiny,
                back_shiny: pokemonData.sprites.back_shiny,
              },
              base_experience: pokemonData.base_experience,
              height: pokemonData.height,
              weight: pokemonData.weight,
              types: pokemonData.types,
            };
          })
        );

        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: getPokemonsResults,
        };
      },
    }),
    getPokemonDetails: builder.query<Pokemon, number>({
      query: (detailsId) => `/${detailsId}`,
    }),
    searchPokemon: builder.query<GetPokemonsResponse, string>({
      query: (searchQuery) => `?limit=100&offset=0?search=${searchQuery}`,
      transformResponse: async (
        response: PokemonListResponse,
        _meta,
        searchQuery: string
      ): Promise<GetPokemonsResponse> => {
        const filteredResults = response.results.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

        const detailedPokemons = await Promise.all(
          filteredResults.map(async (data: PokemonResult) => {
            const pokemonResponse = await fetch(data.url);
            const pokemonData: Pokemon = await pokemonResponse.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              sprites: {
                front_default: pokemonData.sprites.front_default,
                back_default: pokemonData.sprites.back_default,
                front_shiny: pokemonData.sprites.front_shiny,
                back_shiny: pokemonData.sprites.back_shiny,
              },
              base_experience: pokemonData.base_experience,
              height: pokemonData.height,
              weight: pokemonData.weight,
              types: pokemonData.types,
            };
          })
        );

        return {
          results: detailedPokemons,
          count: detailedPokemons.length,
          next: null,
          previous: null,
        };
      },
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonDetailsQuery,
  useSearchPokemonQuery,
} = pokemonApi;
