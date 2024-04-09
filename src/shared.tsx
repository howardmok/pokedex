export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: false;
  slot: number;
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonInfo {
  abilities: Ability[];
  base_experience: number;
  forms: string[];
  game_indices: string[];
  height: number;
  held_items: string[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: string;
  sprites: any;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeHyphenAndCapitalize(str: string) {
  return str.split("-").map(capitalizeFirstLetter).join(" ");
}

export const typeToColorMap = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
