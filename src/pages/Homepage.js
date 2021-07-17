import React from "react";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import classNames from "classnames";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      color: 'white',
    }, 
    "& label.Mui-focused": {
      color: "white",
      borderBottomColor: "white"
    },
    "& label.MuiInputLabel-root": {
      color: "white",
      borderBottomColor: "white"

    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },   
  },

  placement: {
    display: 'flex',
    height: '100%',
    flexWrap: 'wrap',
  },

  textContainer: {
    width: '40%',
    padding: '10% 0% 0% 5%',

  },
  heading: {
    fontSize: '3.7rem',
  },
  searchContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: '15% 0px 100px 50px',
    width: '50%',
  },
  searchIcon: {
    color: 'white'
  },
  searchBarArea: {
    width: '60%',
    "& .MuiSvgIcon-root": {
      color: 'white',
    },

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
  },


}));

const filter = createFilterOptions();

export function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.placement}>
      <div className={classes.textContainer}>
        <h1 className={classes.heading}>Make learning easier with launchpad now.</h1>
        <h2>Find helpful resources, rated by the community.</h2>
      </div>
      <div className={classes.searchContainer}>
        <IconButton className={classes.searchIcon} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <div className={classes.searchBarArea}>
          <Autocomplete
            multiple
            name="search"
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
            filterSelectedOptions

            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by subject or resource type"   
              />
            )}
            onChange={(event, value) => console.log(value)}


            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.title;
            }}


            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              // Suggest the creation of a new value
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `${params.inputValue}`
                });
              }
              
              return filtered;
            }}


            /> 
        </div>
      </div>
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