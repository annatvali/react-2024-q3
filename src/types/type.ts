export interface TypeInfo {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}
export interface Ability {
  isHidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export type PokemonDetails = {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  weight: number;
  types: string[];
  image: string;
};
