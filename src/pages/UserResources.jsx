import React from 'react';
import { SearchCard } from '../components/SearchCard';
import { UserContext  } from '../components/UserContext';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import { makeStyles } from '@material-ui/core/styles';

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

export function UserResources() {
  const classes = useStyles();
  //const classes = useStyles();
  const[resources, setResources] = React.useState([]);
  const context = React.useContext(UserContext);
  const[secondLoad, setSecondLoad] = React.useState(false);
  let [usernameToken, setUsernameToken] = context;
  if (usernameToken === '' && localStorage.getItem('userName')) {
    usernameToken = localStorage.getItem('userName')
  }
  const [deleteFlag, setDeleteFlag] = React.useState(false);
  const firstRender = React.useRef(true);
  const [heading, setHeading] = React.useState('No resources found')
 
  React.useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false;
    } else {
      console.log(resources)
      console.log(resources.length)
      //console.log("res: ", resources[0].ID);
    }
  },[resources])


  async function deleteResource (ID) {
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify ({
      ResourceID: ID
    });
    // call api to get resources based on author
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    try {
      const response = await fetch(`https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource`, requestOptions)
      if (response['status'] === 200) {
        const res = await response.json();
        setDeleteFlag((prev) => !prev);
        console.log(res)
      } else {
        alert(`error: ${response['status']} Failed to delete`);
      }
    } catch (error) {
      console.log(error)
      alert("error: ", error)
    }
  }

  React.useEffect(() => {
    getResources();
    //console.log(usernameToken)
  },[deleteFlag])

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
      const response = await fetch(`https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource?SearchKey=author&Input=${usernameToken}`, requestOptions)
      if (response['status'] === 200) {
        const res = await response.json();
        console.log("res from user: ", res)
        await setResources(res)
      } else {
        alert(`error: ${response.errorMessage} Failed to fetch`);
      }
    } catch (error) {
      console.log(error)
      alert("error: ", error)
    }
  }

  
  return(
    <div >
      <div>
        <div style={{margin:'30px 40px'}}>
          {resources.length ? <h2>Your Resources</h2> : <h2>No resources found</h2>}
        </div>
        {firstRender.current === false && (
          <>
            {
              resources.map((val, idx) => {
              return (
                <SearchCard
                owner={true}
                deleteRes={deleteResource}
                key={idx}
                title= {val.ID}
                link={val.Location}
                text={val.Description}
                categories={val.Categories}
                author={val.Author}
                rating={val.CommunityRatings.Overall}
              />
              )
            })}
          </>
        )}
{/* 
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
        /> */}
      </div>
    </div>
  );
}