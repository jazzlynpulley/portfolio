import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import { Header, PokemonInfo } from 'src/components';

export const InfoPage = () => {
  const { id } = useParams();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header title="Who's That Pokemon?" showBackButton />
      {id && <PokemonInfo id={id} />}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'InfoPage' }
);
