import { Pokemon, TypeInfo } from '../types/type';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_ENDPOINT = '/pokemon';

export default class PokemonAPI {
  static async fetchAllPokemons(): Promise<{ results: { url: string }[] }> {
    const response = await fetch(`${BASE_URL}${POKEMON_ENDPOINT}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }

  static async searchPokemon(query: string): Promise<Pokemon | null> {
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
      type: data.types
        .map((typeInfo: TypeInfo) => typeInfo.type.name)
        .join(', '),
    };
  }
}
