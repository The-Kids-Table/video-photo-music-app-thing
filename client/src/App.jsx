import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router';

import Nav from './components/Nav.jsx';
import Search from './layouts/Search.jsx';
import Project from './layouts/Project.jsx';
import Profile from './layouts/Profile.jsx';
import Settings from './layouts/Settings.jsx';
import Login from './layouts/Login.jsx';
import Signup from './layouts/Signup.jsx';
import Logout from './layouts/Logout.jsx';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const { drawerOpen } = this.props;
    return (
      <div className="App">
        <Nav />
        <Route exact path='/search' component={Search}/>
        <Route exact path='/project' component={Project}/>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/settings' component={Settings}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/logout' component={Logout}/>
      </div>
    );
  }
}

export default App;
