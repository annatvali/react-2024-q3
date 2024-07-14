import { Pokemon, TypeInfo } from '../types/type';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_ENDPOINT = '/pokemon';

export const getPokemonsList = async (
  offset = 0,
  limit = 20
): Promise<{
  results: { url: string }[];
  count: number;
  next: string | null;
  previous: string | null;
}> => {
  const response = await fetch(
    `${BASE_URL}${POKEMON_ENDPOINT}?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getPokemon = async (query: string): Promise<Pokemon | null> => {
  const response = await fetch(`${BASE_URL}${POKEMON_ENDPOINT}/${query}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    type: data.types.map((typeInfo: TypeInfo) => typeInfo.type.name).join(', '),
  };
};

export const getPokemonDetails = async (pokemonId: number) => {
  const response = await fetch(`${BASE_URL}${POKEMON_ENDPOINT}/${pokemonId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    baseExperience: data.base_experience,
    height: data.height,
    weight: data.weight,
    types: data.types.map((typeInfo: TypeInfo) => typeInfo.type.name),
  };
};
