import React, { useEffect, useState }from 'react';
import { Container, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import MenuItem from "@material-ui/core/MenuItem";
import { Typography, Slider, Tooltip } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Icon from '@mdi/react'
import { mdiRocketOutline } from '@mdi/js';


const useStyles = makeStyles((theme) => ({
  placement: {
    display: 'block',
    overflow: 'auto',

  },
  container: {
    /* textAlign: 'center', */
    width: '100%',
    padding: '0 90px',
  },
  heading: {
    fontSize: '3rem'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1),
    minWidth: 120
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    margin: '10px 0 0 0',
    fontSize: '1.25rem',
  },
  urlLinkDisplay: {
      textAlign: 'left',
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} min={0} max={10}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 0,
  },
  {
    value: 5,
  },
  {
    value: 10,
  }
];

const filter = createFilterOptions();

export function EditResource() {
  const classes = useStyles();
  const [resourceName, setResourceName] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [userResourceType, setUserResourceType] = useState("");
  const [resourceReview, setResourceReview] = useState("");
  const [rating, setRating] = useState({
                                        "overall": "",
                                        "understanding": "", 
                                        "difficulty": "", 
                                        "reliability": "" })

  // useEffect(() => {
  //   console.log(categories)
  // }, [categories])

  // define the callAPI function that takes a first name and last name as parameters
  async function handleSubmit (event) {
    event.preventDefault();
    if (resourceType === "Other" && userResourceType !== "") {
      await setResourceType(userResourceType)
    }

    const uploadCategories = []
    for (let i = 0; i < categories.length; i++) {
      uploadCategories.push(categories[i]['inputValue'])
    }

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify ({
      name: resourceName,
      resourceType: resourceType,
      location: resourceLink,
      description: description,
      review: resourceReview,
      categories: uploadCategories,
      rating: rating
    });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    const response = await fetch("https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource", requestOptions)
    console.log(response);
  }

  return (
    <div className={classes.placement}>

    <Container maxWidth='sm'>
      <Box bgcolor='white' color="black" className='box-generic'>
        <div className={classes.paper}>
          <h1>Edit your resource below: </h1>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              defaultValue="Original TITLE"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              onChange={(e) => setResourceName(e.target.value)}
              />
            <h4 className={classes.urlLinkDisplay}>URL LINK GOES HERE </h4>
            <TextField 
              id="resourceType" 
              label="Type of Resource" 
              value={resourceType}
              select
              fullWidth
              variant="outlined"
              required
              margin="normal"
              onChange = {(e) => setResourceType(e.target.value)}
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Book">Book</MenuItem>
              <MenuItem value="Video">Video</MenuItem>
              <MenuItem value="Website">Website</MenuItem>
              <MenuItem value="Podcast">Podcast</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            {resourceType === "Other" && (
              <TextField
              id="userResourceType"
              label="Tell us the resource type?"
              name="userResourceType"
              fullWidth
              variant="outlined"
              margin="normal"
              value={userResourceType}
              onChange={(e) => setUserResourceType(e.target.value)}
              />
              )}
            <TextField
              defaultValue="Original Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={5}
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
              />
            <TextField
              defaultValue="Original Review"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              fullWidth
              id="review"
              label="Review"
              name="review"
              autoFocus
              onChange={(e) => setResourceReview(e.target.value)}
              />
            <Autocomplete
              defaultValue={[resourceTags[4]]}
              margin="normal"
              fullWidth
              id="categories"
              label="Add tags"
              name="categories"
              multiple
              options={resourceTags}
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
                    title: `Add "${params.inputValue}"`
                  });
                }
                
                return filtered;
              }}
              autoFocus
              filterSelectedOptions
              renderOption={(option) => option.title}
              renderInput={(params) => (
                <TextField
                {...params}
                variant="outlined"
                label="Add tags"
                />
                )}
                onChange={(e, val) => setCategories(val)}
                />
            <h2>Rating:</h2>
            <Typography gutterBottom>Ease of Understanding</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {1}
              max={5}
              onChange = {(e, val) => setRating({...rating, "understanding": `${val}`})}
              />
            <Typography gutterBottom>Level of difficulty</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {1}
              max={5}
              onChange = {(e, val) => setRating({...rating, "difficulty": `${val}`})}
              />
            <Typography gutterBottom>Reliability</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {1}
              max={5}
              onChange = {(e, val) => setRating({...rating, "reliability": `${val}`})}
              />
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                fullWidth
                style={{margin: '25px 0 0 0', fontSize: '1.25rem'}}
              >
                Edit Resource
                <Icon path={mdiRocketOutline}
                  size={1.5}
                  color="white"
                  rotate='90'
                  style={{margin: '0 0 0 10px'}}
                />
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </Container>
    </div>
  );
}


// options we currently have for tags
const resourceTags = [
  { title: "Coding", inputValue: "Coding" },
  { title: "Mathematics", inputValue: "Mathematics"  },
  { title: "Business", inputValue: "Business"  },
  { title: "Cooking", inputValue: "Cooking"  },
  { title: "Photography", inputValue: "Photography"  }
]