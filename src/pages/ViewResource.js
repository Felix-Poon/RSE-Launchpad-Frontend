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
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

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
    border: 1,
  },
  resourceDisplay: {
      textAlign: 'left',
      paddingLeft: 10
  },
  ratingTitle: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
  },
  
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

/* const marks = [
  {
    value: 0,
  },
  {
    value: 5,
  },
  {
    value: 10,
  }
]; */

const filter = createFilterOptions();

export function ViewResource(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [rating, setRating] = useState({
                                        "understanding": "0", 
                                        "difficulty": "0", 
                                        "reliability": "0" })
  const [underRating, setUnderRating] = useState('0');
  //const [diffRating, set]


  const [resource, setResource] = React.useState([]);
  const firstRender = React.useRef(true);

  // Get title from URL
  console.log(location.pathname)
  const path = location.pathname.split('/').pop()
  console.log(path)

  React.useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false;
    } else {
      console.log(resource)
    }
  },[resource])

  React.useEffect(() => {
    renderResource();
  },[])

  // define the callAPI function that takes a first name and last name as parameters
  async function renderResource() {;
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
    /* // make API call with parameters and use promises to get response
    const response = await fetch(`https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource?SearchKey=byTitle&Input=${path}`, requestOptions)
    console.log(response.json()); */
    try {
      const response = await fetch(`https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource?SearchKey=byTitle&Input=${path}`, requestOptions)
      console.log(response)
      console.log(response.status)
      //console.log(response.json())
      if (response['status'] === 200) {
        const res = await response.json();
        console.log(res[0])

        console.log(res[0].CommunityRatings.EaseOfUnderstanding)
        console.log(res[0].CommunityRatings.DepthOfMaterial)
        console.log(res[0].CommunityRatings.Reliability)


        await setResource(res[0])
        
        //await setUnderRating(res[0].CommunityRatings.EaseOfUnderstanding)

        await setRating({...rating, "understanding": `${res[0].CommunityRatings.EaseOfUnderstanding}`})
        //await console.log(rating)
        await setRating({...rating, "difficulty": `${res[0].CommunityRatings.DepthOfMaterial}`})
        await setRating({...rating, "reliability": `${res[0].CommunityRatings.Reliability}`})
        console.log(rating)
      } else {
        alert(`error: ${response['status']} Failed to fetch`);
      }
    } catch (error) {
      console.log(error)
      alert("error: ", error)
    }
  }

  function handleRate() {
    history.push(`/rate_resource/:resource`)
  }

  //console.log(parseInt(resource.CommunityRatings.EaseOfUnderstanding))
  console.log(rating)

  return (
    <Container maxWidth='sm'>
      <Box bgcolor='white' color="black" className='box-generic'>
        <div className={classes.paper}>
          <h1 style={{margin:0}}>{resource.ID}</h1>
          <form className={classes.form} noValidate onSubmit={console.log('handleSubmit')}>
            <h4 className={classes.resourceDisplay}>{resource.Location}</h4>
            <h4 className={classes.resourceDisplay}>{resource.TypeResource}</h4>
            <h4 className={classes.resourceDisplay}>{resource.Description}</h4>
            
            <h2 className={classes.ratingTitle}>Rating:</h2>
            <Typography gutterBottom>Ease of Understanding</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={10}
              disabled
              value={rating ? rating.understanding : 10}
            />
            <Typography gutterBottom>Level of difficulty</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={10}
              disabled
              value={rating ? rating.difficulty : 10}
            />
            <Typography gutterBottom>Reliability</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={3}
              min = {0}
              max={10}
              disabled

              value={rating ? rating.reliability : 10}
            />
          </form>
        </div>
      </Box>

      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
          style={{
            margin: '25px 0 0 0', 
            fontSize: '1.25rem', 
            backgroundColor: '#242135',
            border: 1,
            borderColor: 'white'
          }}
          onClick={handleRate}
        >
          Did you use this resource? Give your own rating!
        </Button>
      </div>
    </Container>
  );
}