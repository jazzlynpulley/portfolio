export type Pokemon = {
  id: string;
  name: string;
  number: string;
  types: string[];
};

export type PokemonOption = {
  key: Pokemon['id'];
  name: Pokemon['name'];
  number: Pokemon['number'];
  types: Pokemon['types'];
};

type TMeasurement = {
  minimum: string;
  maximum: string;
};

export type PokemonById = {
  id: string;
  name: string;
  number: string;
  weight: TMeasurement;
  height: TMeasurement;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: string;
  maxCP: string;
  maxHP: string;
  image: string;
};
