import { Pokemon, PokemonListResponse } from '../types/types';

export const transformPokemonData = (
  response: PokemonListResponse
): {
  count: number;
  results: Pokemon[];
} => {
  return {
    count: response.count,
    results: response.results.map((data) => {
      const id = parseInt(data.url.split('/').slice(-2, -1)[0], 10);
      return {
        id,
        name: data.name,
        sprites: {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        },
      };
    }),
  };
};
