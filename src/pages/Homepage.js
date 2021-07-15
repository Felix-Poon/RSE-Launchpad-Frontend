/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import classNames from "classnames";


const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    // '& > * + *': {
    //   marginTop: theme.spacing(3),
    // },
    // backgroundColor: "#FFFFFF",

    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white"
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white"
    },

  },

  placement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //height: 500,
  },
  container: {
    textAlign: 'center',
    width: '50%',
    padding: '100px 0px 0px 100px',
  },
  heading: {
    fontSize: '4rem'
  },
  searchContainer: {
    textAlign: 'center',
    width: '40%',
    padding: '100px 100px 0px 50px',
  },
  searchIcon: {
    float: "left",
    color: 'white'

  },
  searchArea: {
    float: "right",
    width: 450,
    marginTop: 0,
  },

  tag: {
    height: 33,
    position: "relative",
    zIndex: 0,
    fontSize: 14,
    backgroundColor: 'white',
    "& .MuiChip-label": {
      color: "#572CBF",
    },
    "& .MuiChip-deleteIcon": {
      color: "#572CBF",
    },
    "&:after": {
      content: '""',
      right: 10,
      top: 6,
      height: 12,
      width: 12,
      position: "absolute",
      backgroundColor: "white",
      zIndex: -1,
    },
  },


}));

export function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.placement}>
      <div className={classes.container}>
        <h1 className={classes.heading}>Make learning easier with launchpad now.</h1>
        <h2>Find helpful resources, rated by the community.</h2>
      </div>
      <div className={classes.searchContainer}>
        <IconButton className={classes.searchIcon} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <div className={classes.searchArea}>
          <Autocomplete
            multiple
            id="tags-standard"
            className={classes.root}

            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                classes={{
                  root: classNames(classes.tag)
                }}
                variant="outlined"
                label={`${option.title}`}
                {...getTagProps({ index })}
                
                />
              ))
            }


            options={subjectList}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            noOptionsText="Please select one of the dropdown options"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by subject or resource type"
              />
            )}

            

          />
        </div>
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