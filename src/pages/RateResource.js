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

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  placement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    padding: '0 90px',
  },
  heading: {
    fontSize: '3rem'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
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
  resourceDisplay: {
      textAlign: 'left',
      paddingLeft: 10
  },
  ratingTitle: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
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

export function RateResource(props) {
  const classes = useStyles();
  const [resource, setResource] = React.useState([]);
  const [rating, setRating] = useState({
    "overall": "",
    "understanding": "", 
    "difficulty": "", 
    "reliability": "" 
  })
  const params = useParams();
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    renderResource();
  },[])

  React.useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false;
    } else {
      setRating({"understanding": `${resource.CommunityRatings.EaseOfUnderstanding}`,
                  "difficulty": `${resource.CommunityRatings.DepthOfMaterial}`,
                  "reliability": `${resource.CommunityRatings.Reliability}` })
    }
  },[resource])

  // define the callAPI function that takes a first name and last name as parameters
  async function handleSubmit (event) {
    event.preventDefault();

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify ({
        rating: rating,
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


   // define the callAPI function that takes a first name and last name as parameters
   async function renderResource() {
    // instantiate a headers object
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
      const response = await fetch(`https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource?SearchKey=byTitle&Input=${params.resource}`, requestOptions)
      if (response['status'] === 200) {
        const res = await response.json();
        await setResource(res[0])
      } else {
        alert(`error: ${response['status']} Failed to fetch`);
      }
    } catch (error) {
      // console.log(error)
      alert("error: ", error)
    }
  }

  return (
    <Container maxWidth='sm'>
      <Box bgcolor='white' color="black" className='box-generic'>
        <div className={classes.paper}>
          <h1>Give your own rating: </h1>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <h2 className={classes.resourceDisplay}>{resource.ID}</h2>
            <a href='#'><h4 className={classes.resourceDisplay}>{resource.Location}</h4></a>
            <h4 className={classes.resourceDisplay}>Resource Type: {resource.TypeResource}</h4>
            <h4 className={classes.resourceDisplay}>Description </h4>
            <h4 className={classes.resourceDisplay}>{resource.description}</h4>
            <h2 className={classes.ratingTitle}>Rating:</h2>
            <Typography gutterBottom>Level of difficulty</Typography>
            <Slider 
              style={{color:"#E4816B"}}
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={10}
              value={(rating.difficulty)}
              onChange = {(e, val) => setRating({...rating, "difficulty": `${val}`})}
            />
            <Typography gutterBottom>Ease of Understanding</Typography>
            <Slider
              style={{color:"#4DAD3D"}}
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={10}
              onChange = {(e, val) => setRating({...rating, "understanding": `${val}`})}
              value={(rating.understanding)}
            />
            <Typography gutterBottom>Reliability</Typography>
            <Slider
              style={{color:"#53B3CB"}}
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={10}
              onChange = {(e, val) => setRating({...rating, "reliability": `${val}`})}
              value={(rating.reliability)}
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
                Rate Resource
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
  );
}