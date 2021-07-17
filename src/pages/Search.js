import React from 'react';
import { SearchCard } from '../components/SearchCard';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    /* argin: '50px' */
  }
}));

export function Search() {
  const classes = useStyles();
  const location = useLocation();

  // Make array from URL path
  const path = location.pathname.split('/').pop()
  const searchArr = path.split('&')
  
  console.log(searchArr)

  return(
    <div className={classes.root}>
      <div>
        <div style={{margin:'30px 40px'}}>
          ADD SEARCH BAR
        </div>
        <SearchCard 
          title='TITLE'
          link='linkkk'
          text='heyyy'
          author='author'
          rating='2'
        />
        <SearchCard 
          title='TITLE'
          link='linkkk'
          text='heyyy'
          author='author'
          rating='2'
        />
        <SearchCard 
          title='TITLE'
          link='linkkk'
          text='heyyy'
          author='author'
          rating='2'
        />
      </div>
    </div>
    
  );
}