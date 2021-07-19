import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { CardActionArea, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'white'
  },
  box: {
    textAlign: 'left',
    justifyContent: 'left',
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(0,0,0,.3)',
    padding: '20px',
    margin: '30px 40px',
    width: '55vw',
    '&:hover': {
      background: "#c1bfec",       
      }
  },
  cardHeader: {
    margin: '10px 0',
  },
  cardTitle: {
    margin: 0,
  },
  cardText: {
    margin: 0,
  },
  cardAuthor: {
    margin: '25px 0 0 0',
    fontSize: '0.75rem'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    margin: '20px 0 0 0',
    float: 'right'
  }
}));


export function SearchCard(props) {
  const classes = useStyles();
  const href = `/${props.link}`;
  const rating = `${Math.round(props.rating,2)}/10`

  return(
    <a href={href}>
      <Box bgcolor='white' color="black" className={classes.box} key={props.key}>
        <div>
          <div className={classes.cardHeader}>
            <h2 className={classes.cardTitle}>{props.title}</h2>
            {/* <a href={href}>
              <u>{props.link}</u>
            </a> */}
          </div>
          <p className={classes.cardText}>{props.text}</p>
        </div>
        <div className={classes.footer}>

          <p className={classes.cardAuthor}>Submitted by {props.author}</p>
          <div style={{flex:1}}/>
          <h4 className={classes.rating}>
            {rating}
          </h4>
        </div>
      </Box>


    </a>
    
  );
}