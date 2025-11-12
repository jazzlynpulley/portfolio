import React from 'react';
import { Box, Modal } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { useGetPokemonById } from 'src/hooks/useGetPokemons';
import { Skeleton, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { PokemonById } from 'src/types';
import { NavigateFunction } from 'react-router-dom';

type TPokemonInfoProps = {
  id: string;
  navigate: NavigateFunction;
};

const mapPokemonByIdData = (pokemonById: PokemonById) => {
  return [
    {
      label: 'Max HP',
      value: pokemonById?.maxHP ?? '--',
    },
    {
      label: 'Max CP',
      value: pokemonById?.maxCP ?? '--',
    },
    {
      label: 'Weight',
      value: `${pokemonById?.weight?.minimum} - ${pokemonById?.weight?.maximum}`,
    },
    {
      label: 'Height',
      value: `${pokemonById?.height?.minimum} - ${pokemonById?.height?.maximum}`,
    },
  ];
};

export const PokemonInfoModal = ({ id, navigate }: TPokemonInfoProps) => {
  const classes = useStyles();

  const { pokemonById, loading } = useGetPokemonById({ id });

  const pokemonStatsMap = mapPokemonByIdData(pokemonById);

  const handleModalClose = () => navigate('/pokemon');

  let children: ReactNode;

  if (loading) {
    children = (
      <>
        <Skeleton
          variant="text"
          width={200}
          height={40}
          sx={{ mx: 'auto', my: 2 }}
        />

        <Skeleton
          variant="rectangular"
          width={150}
          height={150}
          sx={{ mx: 'auto', mb: 4, borderRadius: 2 }}
        />

        <Grid container spacing={10} sx={{ my: 4 }} justifyContent="center">
          <Grid size="auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={150}
                height={24}
                sx={{ mb: 1 }}
              />
            ))}
          </Grid>

          <Grid size="auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={150}
                height={24}
                sx={{ mb: 1 }}
              />
            ))}
          </Grid>
        </Grid>
      </>
    );
  } else if (!pokemonById.id) {
    children = (
      <Box sx={{ p: 10 }}>
        <h1 className={classes.header}>Uh-oh! We couldn't catch that one!</h1>
      </Box>
    );
  } else {
    children = (
      <>
        <h1 className={classes.header}>{pokemonById.name}</h1>
        {pokemonById?.classification && (
          <h4 className={classes.subheader}>{pokemonById.classification}</h4>
        )}
        <img
          className={classes.image}
          src={pokemonById.image}
          alt={`${pokemonById.name}-img`}
        />
        <Grid container spacing={10} sx={{ my: 4 }} justifyContent="center">
          <Grid>
            {pokemonStatsMap
              .slice(0, Math.ceil(pokemonStatsMap.length / 2))
              .map((item, i) => (
                <Grid container key={i} sx={{ mb: 1 }} alignItems="center">
                  <Typography
                    fontWeight="bold"
                    color="black"
                    sx={{ mr: 1, minWidth: 80 }}
                  >
                    {item.label}:
                  </Typography>
                  <Typography color="black">{item.value}</Typography>
                </Grid>
              ))}
          </Grid>

          <Grid>
            {pokemonStatsMap
              .slice(Math.ceil(pokemonStatsMap.length / 2))
              .map((item, i) => (
                <Grid container key={i} sx={{ mb: 1 }} alignItems="center">
                  <Typography
                    fontWeight="bold"
                    color="black"
                    sx={{ mr: 1, minWidth: 80 }}
                  >
                    {item.label}:
                  </Typography>
                  <Typography color="black">{item.value}</Typography>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <Modal open={true} onClose={handleModalClose}>
      <div className={classes.root}>
        <Box className={classes.modal}>{children}</Box>{' '}
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      outline: 'none',
    },
    header: {
      color: '#171E2b',
    },
    subheader: {
      color: 'black',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100px',
      height: 'auto',
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      backgroundColor: 'white',
      boxShadow: 24,
      borderRadius: 20,
    },
  },
  { name: 'PokemonInfoModal' }
);
