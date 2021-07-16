import React from 'react';
import { SearchCard } from '../components/SearchCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    /* argin: '50px' */
  }
}));

export function Search() {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <div>

        <SearchCard 
          title='TITLE'
          link='linkkk'
          text='heyyy'
          author='author'
          rating='2'
        />

        <SearchCard />
      </div>
    </div>
    
  );
}