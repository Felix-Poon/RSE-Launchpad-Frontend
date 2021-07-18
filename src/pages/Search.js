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
import { mdiRocket } from '@mdi/js';
import Icon from '@mdi/react';
import { useHistory, useParams } from 'react-router-dom';

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
    color: 'white',
    margin: '20px 10px 0 0',
  },
  searchBarArea: {
    width: '50%',
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
  },
  searchBtn: {
    margin: '0 0 0 10px',
    backgroundColor: 'rgb(255,255,255,0.1)',
  },
  disabledSearchBtn: {
    width: 0,
  },
}));

/* function tagToList(array) {
  const list = [];
  array.forEach(elt => {
    list.push({title:elt})
    console.log(list)
  });
  console.log(list)
  return list;
} */
function searchQuery(array) {
  let titles = [];
  array.forEach(value => titles.push(value.title));
  const query = titles.join('&');
  return query;
}


export function Search() {
  const classes = useStyles();
  const location = useLocation();
  //const [tags, setTags] = React.useState([]);
  const filter = createFilterOptions();
  const [searchValue, setSearchValue] = React.useState([]);
  const history = useHistory();
  const [resources, setResources] = React.useState([]);
  const firstRender = React.useRef(true);

  // Make array from URL path
  const path = location.pathname.split('/').pop()
  const searchArr = path.split('&')
  // Make tags to be rendered in search bar
  //const tags = [];
  /* searchArr.forEach(label => {
    tags.push({title:label})
  }) */
  React.useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false;
    } else {
      console.log(resources)
    }
  },[resources])

  React.useEffect(() => {
    getResources();
  },[])

  // call api to get resources
  async function getResources () {
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // call api to get resources based on author
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    try {
      const response = await fetch(`https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource?SearchKey=standardInput&Input=${searchArr}`, requestOptions)
      if (response['status'] === 200) {
        const res = await response.json();
        await setResources(res)
      } else {
        alert(`error: ${response['status']} Failed to fetch`);
      }
    } catch (error) {
      console.log(error)
      alert("error: ", error)
    }
  }

  //console.log(tags)
  console.log(searchArr)

  // Creates query & redirects to search results
  function handleSearch(event) {
    event.preventDefault();
    console.log('click', event)
    const query = searchQuery(searchValue)
    console.log(query)
    history.push(`/search/${query}`);
  }



  return(
    <div className={classes.root}>
      <div>
        <div style={{margin:'0 0 40px 40px'}}>
          <div className={classes.searchContainer}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
              <SearchIcon className={classes.searchIcon}/>
              <div className={classes.searchBarArea}>
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
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<div className={classes.label}>Search by subject or resource type</div>} 
                    />
                  )}
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
                  onChange={(event, value) => setSearchValue(value)}
                />
              </div>
              <IconButton 
                className={searchValue.length ? classes.searchBtn : classes.disabledSearchBtn} 
                onClick={handleSearch}
              >
              <Icon path={mdiRocket}
                size={2}
                rotate={90}
                color="white"/>
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{margin:'0 40px'}}>
          Search results for {searchArr.join(', ')}
        </h2>
        {resources.length ? null : <p style={{margin:'0 40px'}}>No resources found</p>}
          <>
            {resources.map((val, idx) => {
              return (
                <SearchCard 
                key={idx}
                title= {val.ID}
                link={val.Location}
                text={val.Description}
                author={val.Author}
                rating={val.CommunityRatings.Overall}
              />
              )
            })}
          </>
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