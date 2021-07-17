import React from 'react';
import { SearchCard } from '../components/SearchCard';
//import { makeStyles } from '@material-ui/core/styles';

export function UserResources() {
  //const classes = useStyles();

  return(
    <div >
      <div>
        <div style={{margin:'30px 40px'}}>
          <h2>Your Resources</h2>
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