export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default?: string | undefined;
    front_shiny?: string | undefined;
    back_shiny?: string | undefined;
  };
  base_experience?: number;
  height?: number;
  weight?: number;
  types?: { type: { name: string } }[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: PokemonResult[];
}

export type Theme = 'light' | 'dark';
