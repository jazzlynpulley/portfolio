import React, { useEffect, useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter,
  Box,
} from '@mui/material';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonSearch } from '../PokemonSearch';
import { colors } from 'src/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonInfoModal } from '../PokemonInfoModal';

function sortByKeyAlphabetically<T>(array: T[], key: keyof T): T[] {
  return [...array].sort((a, b) => {
    const valA = String(a[key] ?? '').toLowerCase();
    const valB = String(b[key] ?? '').toLowerCase();
    return valA.localeCompare(valB);
  });
}

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemonOptions, loading } = useGetPokemons();

  const pokemonTypes = Array.from(
    new Set(pokemonOptions.flatMap((pokemon) => pokemon.types))
  );

  const { id } = useParams();
  const navigate = useNavigate();

  // BEGIN - Search states and handlers
  const [queryText, setQueryText] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // sort alphabetically on initial load
  const sortedPokemonOptions = useMemo(() => {
    return sortByKeyAlphabetically(pokemonOptions, 'name');
  }, [pokemonOptions]);

  const tableRows = useMemo(() => {
    if (!queryText && !typeFilter) return sortedPokemonOptions;
    if (queryText && !typeFilter) {
      return sortedPokemonOptions.filter((sortedPokemonOption) =>
        sortedPokemonOption.name.toLowerCase().includes(queryText.toLowerCase())
      );
    }
    if (!queryText && typeFilter) {
      return sortedPokemonOptions.filter((sortedPokemonOption) =>
        sortedPokemonOption.types.includes(typeFilter)
      );
    }
    return sortedPokemonOptions.filter(
      (sortedPokemonOption) =>
        sortedPokemonOption.name
          .toLowerCase()
          .includes(queryText.toLowerCase()) &&
        sortedPokemonOption.types.includes(typeFilter)
    );
  }, [queryText, sortedPokemonOptions, typeFilter]);
  // END - Search states and handlers

  // BEGIN -TablePagination states and handlers
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    setPage(0);
  }, [queryText, tableRows]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // END - TablePagination states and handlers

  return (
    <div className={classes.root}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Who's That Pokemon?</h1>

          <PokemonSearch
            queryText={queryText}
            setQueryText={setQueryText}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            pokemonTypes={pokemonTypes}
          />

          <TableContainer className={classes.tableContainer}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.tableHeaderAndFooterRow}>
                  <TableCell align="center">Number</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Type(s)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows.length ? (
                  <>
                    {tableRows
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((tableRow) => (
                        <TableRow
                          key={tableRow.key}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                          className={classes.tableRow}
                          hover
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate(`/pokemon/${tableRow.key}`)}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {tableRow.number}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {tableRow.name}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {tableRow.types?.join(', ')}
                          </TableCell>
                        </TableRow>
                      ))}
                  </>
                ) : (
                  <TableRow component="th" scope="row" align="center">
                    <TableCell />
                    <TableCell align="center">
                      <h4 className={classes.errorMsg}>
                        Uh-oh! We couldn't find anything like it!
                      </h4>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow className={classes.tableHeaderAndFooterRow}>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={3}
                    count={tableRows?.length ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className={classes.tablePagination}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
      {id && <PokemonInfoModal id={id} navigate={navigate} />}
    </div>
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
    errorMsg: {
      color: 'black',
    },
    tableContainer: {
      width: '50%',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    tableHead: {
      backgroundColor: '#f5f5f5',
    },
    headCell: {
      fontWeight: 'bold',
      color: '#333',
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#fafafa',
      },
      '&:hover': {
        backgroundColor: '#f0f8ff',
      },
    },
    tableCell: {
      padding: '12px 16px',
    },
    tableHeaderAndFooterRow: {
      backgroundColor: colors.ACCENT,
    },
    tablePagination: {
      '& .MuiTablePagination-select, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows':
        {
          color: 'black',
        },
      '& .MuiIconButton-root': {
        color: 'black',
      },
      '& .MuiSvgIcon-root': {
        fill: 'black',
      },
    },
  },
  { name: 'PokemonList' }
);
