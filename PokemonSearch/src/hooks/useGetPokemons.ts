import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Pokemon, PokemonById, PokemonOption } from 'src/types';

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      types
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151,
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () =>
      pokemons.map((p: Pokemon) => ({
        key: p.id,
        name: p.name,
        number: p.number,
        types: p.types,
      })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};

export const GET_POKEMON_BY_ID = gql`
  query pokemon($id: String) {
    pokemon(id: $id) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonById = ({ id }: { id: string }) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_BY_ID, {
    variables: {
      id,
    },
  });

  const pokemonById: PokemonById = useMemo(() => data?.pokemon || {}, [data]);

  return {
    pokemonById,
    ...queryRes,
  };
};
