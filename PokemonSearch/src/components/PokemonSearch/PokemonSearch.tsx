import * as React from 'react';
import { createUseStyles } from 'react-jss';
import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { colors } from 'src/constants';

type TPokemonSearchProps = {
  queryText: string;
  setQueryText: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  pokemonTypes: string[];
};

export const PokemonSearch = ({
  queryText,
  setQueryText,
  typeFilter,
  setTypeFilter,
  pokemonTypes,
}: TPokemonSearchProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mb: 3 }}
    >
      <Grid size={6}>
        <TextField
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          label="Search by Name"
          className={classes.textField}
          fullWidth
          sx={{ mr: 2 }}
        />
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth className={classes.selectInput}>
          <InputLabel id="type-filter-label">Type</InputLabel>
          <Select
            labelId="type-filter-id"
            value={typeFilter}
            label="Type"
            onChange={(event: SelectChangeEvent) => {
              setTypeFilter(event.target.value as string);
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#1e1e1e',
                  borderRadius: 2,
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {pokemonTypes?.map((pokemonType) => (
              <MenuItem value={pokemonType}>{pokemonType}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    textField: {
      '& .MuiInputBase-root': {
        color: '#fff',
        backgroundColor: colors.DARK_GREY('08'),
        borderRadius: 6,
        paddingRight: '4px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: colors.DARK_GREY('12'),
        },
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: colors.DARK_GREY('3'),
        },
        '&:hover fieldset': {
          borderColor: colors.ACCENT_BLUE_HOVER,
        },
        '&.Mui-focused fieldset': {
          borderColor: colors.ACCENT_BLUE_FOCUSED,
          borderWidth: 2,
        },
      },
      '& .MuiFormLabel-root': {
        color: colors.DARK_GREY('7'),
        '&.Mui-focused fieldset': {
          color: colors.ACCENT_BLUE_FOCUSED,
          borderWidth: 2,
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#64b5f6',
      },
    },
    selectInput: {
      '& .MuiInputBase-root': {
        color: '#fff',
        backgroundColor: colors.DARK_GREY('08'),
        borderRadius: 6,
        paddingRight: '4px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: colors.DARK_GREY('12'),
        },
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: colors.DARK_GREY('3'),
        },
        '&:hover fieldset': {
          borderColor: colors.ACCENT_BLUE_HOVER,
        },
        '&.Mui-focused fieldset': {
          borderColor: colors.ACCENT_BLUE_FOCUSED,
          borderWidth: 2,
        },
      },
      '& .MuiInputLabel-root': {
        color: colors.DARK_GREY('7'),
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: colors.ACCENT_BLUE_FOCUSED,
      },
      '& .MuiMenuItem-root': {
        color: '#fff',
        backgroundColor: colors.DARK_GREY('08'),
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(100, 181, 246, 0.3)',
        },
        '&.Mui-selected': {
          backgroundColor: 'rgba(100, 181, 246, 0.4)',
          '&:hover': {
            backgroundColor: 'rgba(100, 181, 246, 0.5)',
          },
        },
      },
    },
  },
  { name: 'PokemonSearch' }
);
