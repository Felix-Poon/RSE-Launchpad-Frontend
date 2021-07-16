import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AddResource } from './pages/AddResource';
import { ThemeProvider } from '@material-ui/core/styles';
//import Palettefrom './styles/Theme';
/* const theme = createMuiTheme({

}) */
import { Search } from './pages/Search';
//import { makeStyles } from '@material-ui/core/styles';


/* CHECK IF USER LOGGED IN */
// If logged in render dashboard
// If not search ?

/* const useStyles = makeStyles({
  bg: {
    margin: '0.5rem 2rem',
    backgroundColor: 'white'
  }
})
 */
function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/add_resource">Add Resource</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          {/* ADD MORE PAGES HERE */}
          <Route path="/add_resource">
            <AddResource />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/search/:query">
            <Search />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
