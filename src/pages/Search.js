import React from 'react';
import { SearchCard } from '../components/SearchCard';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
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
  searchContainer: {
    textAlign: 'left',
    justifyContent: 'left',
    alignItems: 'left',
    display: 'flex',
    /* padding: '50px 0px 50px 0px', */
    padding: '0 0 10px 0',
    width: '100%',
  },
  searchIcon: {
    color: 'white'
  },
  searchBarArea: {
    width: '55%',
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
  label: {
    fontFamily: 'Poppins, sans-serif',
    /* padding: '0 0 10px 0',
    margin: '0 0 100px 0', */
  }
}));

export function Search() {
  const classes = useStyles();
  const location = useLocation();
  const filter = createFilterOptions();

  // Make array from URL path
  const path = location.pathname.split('/').pop()
  const searchArr = path.split('&')

  const tags = [];

  const def = JSON.parse(
    '{"title": "Art"}'
  )
  
  searchArr.forEach(label => {
    tags.push({title:label})
  })


  //defaultValue={[{title:"Art"}]}
  console.log(tags)

  console.log(searchArr)
  

  return(
    <div className={classes.root}>
      <div>
        <div style={{margin:'0 0 40px 40px'}}>
          <div className={classes.searchContainer}>
          <IconButton className={classes.searchIcon} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <div className={classes.searchBarArea}>
            <Autocomplete
              multiple
              id="tags-standard"
              className={classes.root}
              value={tags}
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
                  label={<div className={classes.label}>Search by subject or resource type</div>} 
                />
              )}

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