import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route} from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './containers/Nav';
import Search from './layouts/Search.jsx';
import Project from './layouts/Project.jsx';
import User from './layouts/User.jsx';
import Settings from './layouts/Settings.jsx';
import Login from './layouts/Login.jsx';
import Signup from './layouts/Signup.jsx';
import CreateProject from './components/CreateProject.jsx';

import themes from './themes';

import { MuiThemeProvider } from 'material-ui/styles';

import logo from './logo.svg';
import './App.css';

const propTypes = {
  theme: PropTypes.number
};
const defaultTheme = 0;

const App = ({ currentUser }) => (
  <MuiThemeProvider theme={themes.get(currentUser ? currentUser.theme : defaultTheme)}>
    <div className="App">
      <Nav />
      <switch>
        <Route exact path='/' component={Search}/>
        <Route exact path='/search' component={Search}/>
        <Route
          exact
          path='/project/:username/:projectName'
          component={Project}
        />
        <Route exact path='/project/create' component={CreateProject}/>
        <Route exact path='/user/:username' component={User}/>
        <Route exact path='/settings' component={Settings}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
      </switch>
    </div>
  </MuiThemeProvider>
);

App.propTypes = propTypes;

export default withRouter(connect(state => ({
  currentUser: state.session.currentUser
}))(App));
