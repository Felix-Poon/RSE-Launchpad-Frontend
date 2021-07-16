/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    backgroundColor: "#FFFFFF",
    },

  placement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75vh',
  },

  iconButton: {
    padding: 10,
    float: "left",

  },

  searchArea: {
    float: "right",
    width: 450,
    marginTop: 0

  },
  container: {
    textAlign: 'center',
    width: '50%',
    padding: '0 70px'
  },
  heading: {
    fontSize: '3rem'
  }
}));

export function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.placement}>
      <div className={classes.container}>
        <h1 className={classes.heading}>Make learning easier with Launchpad now</h1>
      </div>
      <div className={classes.container}>
        Put search bar here :)
      </div>

      {/* <div className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
            <SearchIcon />
          </IconButton>
        <div className={classes.searchArea}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={subjectList}
            getOptionLabel={(option) => option.title}
            // defaultValue={[subjectList[5]]}
            
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for resources"
                placeholder="Selected"
              />
            )}

          />

        </div>
      </div> */}

    </div>
  );
}

const subjectList = [
  { title: 'Accenture'},
  { title: 'Art'},
  { title: 'AWS'},
  { title: 'Books'},
  { title: 'C++'},
  { title: 'Engineering'},
  { title: 'Geography'},
  { title: 'Plants'},
  { title: 'Python'},
  { title: 'React'},
  { title: 'Stoicism'},
  { title: 'Software development'},
];