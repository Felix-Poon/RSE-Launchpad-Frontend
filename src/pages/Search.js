import React from 'react';
import { SearchCard } from '../components/SearchCard';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '40px'
  }
}));

export function Search() {
  const classes = useStyles();
  return(
    <Container component="main" maxWidth="sm">
      <Box bgcolor='white' color="black" className='box-generic'>
      <div>
        <SearchCard />
      </div>
      <div>
        div2sdff
      </div>


      </Box>


    </Container>
    
  );
}