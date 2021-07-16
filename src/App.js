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
import { Search } from './pages/Search';
import { UserResources } from './pages/UserResources';
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
        <Switch>
          {/* ADD MORE PAGES HERE */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/search/:query">
            <Search />
          </Route>
          <Route path="/user/resources">
            <UserResources />
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
