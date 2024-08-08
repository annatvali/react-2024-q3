// type MinimalLink = {
//   name: string;
//   url: string;
// };

// type Sprites = {
//   back_female: string;
//   back_shiny_female: string;
//   back_default: string;
//   front_female: string;
//   front_shiny_female: string;
//   back_shiny: string;
//   front_default: string;
//   front_shiny: string;
//   other: {
//     dream_world: unknown;
//     'official-artwork': unknown;
//   };
//   versions: {
//     'generation-i': {
//       'red-blue': unknown;
//       yellow: unknown;
//     };
//     'generation-ii': {
//       crystal: unknown;
//       gold: unknown;
//       silver: unknown;
//     };
//     'generation-iii': {
//       emerald: unknown;
//       'firered-leafgreen': unknown;
//       'ruby-sapphire': unknown;
//     };
//     'generation-iv': {
//       'diamond-pearl': unknown;
//       'heartgold-soulsilver': unknown;
//       platinum: unknown;
//     };
//     'generation-v': {
//       'black-white': unknown;
//     };
//     'generation-vi': {
//       'omegaruby-alphsapphire': unknown;
//       'x-y': unknown;
//     };
//     'generation-vii': {
//       icons: unknown;
//       'ultra-sun-ultra-moon': unknown;
//     };
//     'generation-viii': {
//       icons: unknown;
//     };
//   };
// };

// export type Pokemon = {
//   id: number;
//   name: string;
//   base_experience: number;
//   height: number;
//   is_default: boolean;
//   order: number;
//   weight: number;
//   abilities: {
//     is_hidden: boolean;
//     slot: number;
//     ability: MinimalLink;
//   }[];
//   forms: MinimalLink[];
//   game_indices: {
//     game_index: number;
//     version: MinimalLink;
//   }[];
//   held_items: {
//     item: MinimalLink;
//     version_details: {
//       rarity: number;
//       version: MinimalLink;
//     };
//   }[];
//   location_area_encounters: string;
//   moves: {
//     move: MinimalLink;
//     version_group_details: {
//       level_learned_at: number;
//       version_group: MinimalLink;
//       move_learn_method: MinimalLink;
//     }[];
//   }[];
//   species: MinimalLink;
//   sprites: Sprites;
//   stats: {
//     base_stat: number;
//     effort: number;
//     stat: MinimalLink;
//   };
//   types: {
//     slot: number;
//     type: MinimalLink;
//   };
// };

// export type PokemonPageResult = {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: { name: string; url: string }[];
// };

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

interface Species {
  name: string;
  url: string;
}
export interface Sprites {
  front_default: string;
  back_default?: string;
  front_shiny?: string;
  back_shiny?: string;
  other?: {
    official_artwork: {
      front_default?: string;
      front_shiny?: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  species?: Species;
  base_experience?: number;
  sprites: {
    back_default: string | undefined;
    front_shiny: string | undefined;
    back_shiny: string | undefined;
    front_default: string;
  };
  url?: string;
}

type PokemonTypes = {
  name: string;
  type: {
    name: string;
    url: string;
  };
};
export interface PokemonExtended extends Pokemon {
  base_experience: number;
  weight: number;
  height: number;
  types: PokemonTypes[];
}

export type Theme = 'light' | 'dark';
