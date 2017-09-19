import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import { MuiThemeProvider } from 'material-ui/styles';
import themes from '../../themes';
import { setUserTheme } from '../../actions/sessionActions.js';

const styles = {
  menu: {
    maxWidth: '200px',
    margin: 'auto'
  },
  button: {
    margin: 10
  }
};

const themeOptions = themes.getList();

class ThemeChanger extends Component {
  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0,
      menuOpen: false
    };
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleClickListItem (event) {
    this.setState({menuOpen: true, anchorEl: event.currentTarget});
  }

  handleMenuItemClick (event, themeIndex) {
    this.setState({selectedIndex: themeIndex, menuOpen: false});
  }

  handleRequestClose () {
    this.setState({ menuOpen: false });
  }

  render () {
    return (
      <MuiThemeProvider theme={themes.get(this.state.selectedIndex)}>
        <Paper style={this.props.style}>
          <Typography type="headline" component="h3">
            Set Theme
          </Typography>
          <List style={styles.menu}>
            <ListItem
              button
              aria-haspopup='true'
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary='Theme'
                secondary={themeOptions[this.state.selectedIndex].name}
              />
            </ListItem>
          </List>
          <Menu
            open={this.state.menuOpen}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.handleRequestClose}
          >
            {themeOptions.map((option, index) => (
              <MenuItem
                key={index}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option.name}
              </MenuItem>
            ))}
          </Menu>
          <Button
            style={styles.button}
            raised
            onClick={() => {
              this.props.setTheme(this.state.selectedIndex);
              this.props.changeTheme(this.state.selectedIndex);
            }}
            color='primary'>
            Save
          </Button>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  changeTheme(theme) {
    dispatch(setUserTheme(theme));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeChanger);