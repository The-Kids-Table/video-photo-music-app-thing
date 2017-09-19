import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';

import { alert } from '../../actions/controlActions.js';

import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Input,
  Paper
} from 'material-ui';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText
} from 'material-ui/List';

import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import {
  AccountCircle,
  Search,
  Settings,
  PermMedia,
  ExitToApp
} from 'material-ui-icons';

import NavHeader from './NavHeader.jsx';
import { toggleNavDrawer } from '../../actions/controlActions';

const style = {textDecoration: 'none'};

const proptypes = {

}

const Nav = ({ toggleNavDrawer, navDrawerOpen, currentUser }) => (
  <div>
    <AppBar position='static'>
      <Toolbar disableGutters>
        <IconButton
          color='contrast'
          aria-label='Menu'
          onClick={() => {
            toggleNavDrawer();
          }}
        >
          <MenuIcon />
        </IconButton>
        <Input
          autoFocus
          placeholder='Search for projects'
          style={{color: 'white'}}
        />
      </Toolbar>
    </AppBar>

    <Drawer
      open={navDrawerOpen}
      elevation={1}  
    >
      <IconButton onClick={toggleNavDrawer}>
        <ChevronLeftIcon />
      </IconButton>
      <div style={{width: 250}}>
        <List>
          <NavHeader
            user={currentUser}
            toggleNavDrawer={toggleNavDrawer}
          />

          <NavLink
            to='/search'
            onClick={toggleNavDrawer}
            style={style}
          >
            <ListItem>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary='Search'/>
            </ListItem>
          </NavLink>

          {currentUser &&
            <div>
              <NavLink
                to={'/project/create'}
                onClick={toggleNavDrawer}
                style={style}
              >
                <ListItem>
                  <ListItemIcon>
                    <PermMedia />
                  </ListItemIcon>
                  <ListItemText primary='Create a Project'/>
                </ListItem>
              </NavLink>

              <NavLink
                to={`/user/${currentUser.username}`}
                onClick={toggleNavDrawer}
                style={style}
              >
                <ListItem>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary='My profile'/>
                </ListItem>
              </NavLink>

              <NavLink
                to='/settings'
                onClick={toggleNavDrawer}
                style={style}
              >
                <ListItem>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary='Settings'/>
                </ListItem>
              </NavLink>

                <ListItem onClick={() => {window.location.href = '/logout'}}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary='Logout'/>
                </ListItem>
            </div>
          }

        </List> 
      </div>
    </Drawer>
  </div>
);

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    navDrawerOpen: state.control.navDrawerOpen
  };
};

const mapDispatchToProps = dispatch => ({
  toggleNavDrawer: () => dispatch(toggleNavDrawer())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);